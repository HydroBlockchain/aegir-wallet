import Web3 from 'web3';
import axios from 'axios';
import { CoinType, Network } from '../interfaces/CoinInterfaces';

interface CurrencyConverterProps {
  coin: CoinType;
  balance: number;
  network: Network;
}

interface CalculateBalanceProps {
  balance: number;
  currencyPrices: {
    dai?: { usd: number };
    hydro?: { usd: number };
    tether?: { usd: number };
    ethereum?: { usd: number };
    binancecoin?: { usd: number };
    'original-crypto-coin'?: { usd: number };
  };
}

function toFixed(x: number) {
  let result: string | null = null;

  if (Math.abs(x) < 1.0) {
    let e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10,e-1);
      result = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
    }
  } else {
    let e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
        e -= 20;
        result = `${x /= Math.pow(10,e)}`;
        result += (new Array(e+1)).join('0');
    }
  }
  return result || x;
}

// Calcular cuantas veces aparece un número en un array
function calculateFrequency(num: number, vector: number[]) {
  let num_count = 0;
  for (let pos in vector) {
    if (vector[pos] == num) {
      num_count++
    }
  }
  return num_count;
}

// Dado un vector de números se nos devuelve la posición del número mayor
function getHigherIndex(vectorNum: number[]) {
  let biggerNum = vectorNum[0];
  let result: number | string = 0;
  for (let pos in vectorNum){
    if(vectorNum[pos] > biggerNum) {
      biggerNum = vectorNum[pos];
      result = pos;
    }
  }
  return result;
}

function getModa(arr: number[]) {
  let frecuencias = new Array(arr.length);
  for (let pos in arr){
       let numero = arr[pos];
       frecuencias[pos] = calculateFrequency(numero, arr);
  }
  return arr[getHigherIndex(frecuencias)];
}

async function coingeckoAPI() {
  let result: null | object = null;
  
  const coins = [
    'dai',
    'hydro',
    'tether',
    'ethereum',
    'binancecoin',
    'original-crypto-coin',
  ];
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`
    );

    if(response.status === 200) {
      const { data } = response;
      if(Object.keys(data).length) {
        result = data
      }
    }
  } catch(error) {}

  return result;
}

async function currencyConverterHydro({ balance, currencyPrices }: CalculateBalanceProps) {
// Buscar el precio en al menos dos fuentes más en caso de que alguna falle
  let result: null | number = null;
  try {
    if(currencyPrices?.hydro) {
      result = currencyPrices.hydro.usd * balance;
    }
  } catch(error) {}

  return result;
}

async function currencyConverterBNB({ balance, currencyPrices }: CalculateBalanceProps) {
  // Buscar el precio en al menos dos fuentes más en caso de que alguna falle
  let result: null | number = null;
  try {
    if(currencyPrices?.binancecoin) {
      result = currencyPrices.binancecoin.usd * balance;
    }
  } catch(error) {}

  return result;
}

async function currencyConverterETH({ balance, currencyPrices }: CalculateBalanceProps) {
  // Buscar el precio en al menos dos fuentes más en caso de que alguna falle
  let result: null | number = null;
  try {
    if(currencyPrices?.ethereum) {
      result = currencyPrices.ethereum.usd * balance;
    }
  } catch(error) {}

  return result;
}

async function currencyConverterTUSC({ balance, currencyPrices }: CalculateBalanceProps) {
  // Buscar el precio en al menos dos fuentes más en caso de que alguna falle
  let result: null | number = null;
  try {
    if(currencyPrices?.['original-crypto-coin']) {
      result = currencyPrices['original-crypto-coin'].usd * balance;
    }
  } catch(error) {}

  return result;
}

async function currencyConverterDAI({ balance, currencyPrices }: CalculateBalanceProps) {
  // Buscar el precio en al menos dos fuentes más en caso de que alguna falle
  let result: null | number = null;
  try {
    if(currencyPrices?.dai) {
      result = currencyPrices.dai.usd * balance;
    }
  } catch(error) {}

  return result;
}

async function currencyConverterUSDT({ balance, currencyPrices }: CalculateBalanceProps) {
  // Buscar el precio en al menos dos fuentes más en caso de que alguna falle
  let result: null | number = null;
  try {
    if(currencyPrices?.tether) {
      result = currencyPrices.tether.usd * balance;
    }
  } catch(error) {}

  return result;
}

async function currencyConverter({
  coin,
  network,
  balance,
}: CurrencyConverterProps) {
  let currencyPrices = await coingeckoAPI() || {};
  
 return (coin === 'HYDRO')
  ? currencyConverterHydro({ balance, currencyPrices })
  : (coin === 'BNB')
  ? currencyConverterBNB({ balance, currencyPrices })
  : (coin === 'TUSC')
  ? currencyConverterTUSC({ balance, currencyPrices })
  : (coin === 'ETH')
  ? currencyConverterETH({ balance, currencyPrices })
  : (coin === 'DAI')
  ? currencyConverterDAI({ balance, currencyPrices })
  : (coin === 'USDT')
  ? currencyConverterUSDT({ balance, currencyPrices })
  : null
}

export default currencyConverter;