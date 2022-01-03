import Web3 from 'web3';
import axios from 'axios';
import { IcalculateBalance, IcoingeckoAPI, IcurrencyConverter } from '../interfaces/currencyConverter';

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

async function coingeckoAPI(props: IcoingeckoAPI = {}) {
  const { FIAT = 'USD' } = props;
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
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=${FIAT}`
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

async function calculateBalance({ balance, currencyPrices, coin, FIAT }: IcalculateBalance) {
  let result: null | number = null;
  const currencyKey = {
    DAI: 'dai',
    HYDRO: 'hydro',
    USDT: 'tether',
    ETH: 'ethereum',
    BNB: 'binancecoin',
    TUSC: 'original-crypto-coin'
  }

  try {
    result = currencyPrices[currencyKey[coin]][FIAT.toLowerCase()] * balance;
  } catch(error) {
    console.log('error in calculateBalance', {
      FIAT,
      coin,
      balance,
      currencyPrices,
    });
    console.log(error);
  }

  return result;
}

async function currencyConverter({
  coin,
  network,
  balance,
  FIAT = 'USD'
}: IcurrencyConverter) {
  const currencyPrices = await coingeckoAPI({ FIAT }) || {};

  return calculateBalance({ balance, currencyPrices, coin, FIAT })
}

export default currencyConverter;