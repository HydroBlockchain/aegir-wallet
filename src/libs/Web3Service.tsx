import Web3 from 'web3';
import axios from 'axios';
import { ethers } from 'ethers';
import { Apis as ApisTUSC } from "tuscjs-ws";

import {
	Contract,
	HistoryData,
	Web3Provider,
	Notifications,
	FallbackProvider,
	ProvidersEthereum,
	BNBHistoryResponse,
	GetTokenBalanceProps,
	GetNotificationsProps,
	GetEthereumHistoryProps,
	GetNotificationsERC20Props,
	GetNotificationsBEP20Props,
	GetEthereumTokenHistoryProps,
} from '../interfaces/Web3ServiceInterface';
import { CoinType } from '../interfaces/CoinInterfaces';

/* contracts */
import HydroToken from '../contracts/HydroToken.json';
import ClientRainDrop from '../contracts/ClientRaindrop.json';

/* Contract addresses Mainnet */
const DAI_ERC20_ADDRESS = '0x6b175474e89094c44da98b954eedeac495271d0f';
const USDT_ERC20_ADDRESS = '0xdac17f958d2ee523a2206206994597c13d831ec7';
const HYDRO_BEP20_ADDRESS = '0xf3dbb49999b25c9d6641a9423c7ad84168d00071';
const HYDRO_ERC20_ADDRESS = '0x946112efab61c3636cbd52de2e1392d7a75a6f01';
const CLIENT_RAINDROP_ADDRESS = '0x387Ce3020e13B0a334Bb3EB25DdCb73c133f1D7A';

/* Contract addresses testnet */
const DAI_ERC20_ADDRESS_TESNET = '0x8fb853872dAEC90Dcc547e5d46c1194B97Cfab32';
const USDT_ERC20_ADDRESS_TESNET = '0xbd2CE0089628D2FA58C12e1155ADBB9cFa4627a3';
const HYDRO_BEP20_ADDRESS_TESNET = '0x15e80146367D8Cf1F2a9e8EA04fdAF87d2Ad3193';
const HYDRO_ERC20_ADDRESS_TESNET = '0xED4F7922FAaa14679bD755DCbd43491D6De2C0a4';

/* PROVIDERS */
const PROVIDER_TUSC = 'wss://tuscapi.gambitweb.com/';
const PROVIDER_BSC = 'https://bsc-dataseed.binance.org/';
const PROVIDER_WS_BSC = 'wss://bsc.getblock.io/mainnet/';

/* PROVIDERS TESTNET */
const PROVIDER_WS_BSC_DEV = 'wss://bsc.getblock.io/testnet/';
const PROVIDER_BSC_DEV = 'https://data-seed-prebsc-1-s1.binance.org:8545/';

/* APIs Key */
export const infuraAPI = '75cc8cba22ab40b9bfa7406ae9b69a27';
export const etherscanAPI = 'F4SXMWX2NF5W3W8PUDZBCNP6EMR3HRHQQF';
export const alchemyMainnetAPI = 'UvYSrTzN7irP8VVOsXMmTHY_2LfXdlmS';
export const alchemyTestnetAPI = 'c7N7arSdoWGJ-VMOEKblEV2asJmwnddS';

class Web3Service {
	alchemyAPI: string = '';
	web3: Web3 | null = null;
	isMainnet: boolean = !__DEV__;
	hydroTokenABI = HydroToken.abi;
	DAITokenERC20Address: string = '';
	USDTTokenERC20Address: string = '';
	hydroTokenERC20Address: string = '';
	hydroTokenBEP20Address: string = '';
	providerBSC: Web3Provider | null = null;
	providerETH: FallbackProvider | null = null;
	contracDAITokenERC20: Contract | null = null;
	contracUSDTTokenERC20: Contract | null = null;
	contracHydroTokenERC20: Contract | null = null;
	contracHydroTokenBEP20: Contract | null = null;

	constructor() {
		const isMainnet = this.isMainnet;

		this.alchemyAPI = isMainnet ? alchemyMainnetAPI : alchemyTestnetAPI;

		const networkNameEthereum = isMainnet ? 'mainnet' : 'ropsten';
		this.DAITokenERC20Address = isMainnet ? DAI_ERC20_ADDRESS : DAI_ERC20_ADDRESS_TESNET;
		this.USDTTokenERC20Address = isMainnet ? USDT_ERC20_ADDRESS : USDT_ERC20_ADDRESS_TESNET;
		this.hydroTokenERC20Address = isMainnet ? HYDRO_ERC20_ADDRESS : HYDRO_ERC20_ADDRESS_TESNET;
		this.hydroTokenBEP20Address = isMainnet ? HYDRO_BEP20_ADDRESS : HYDRO_BEP20_ADDRESS_TESNET;

		const networkBinance = isMainnet ? PROVIDER_BSC : PROVIDER_BSC_DEV;
		const networkWebsocketBinance = isMainnet ? PROVIDER_WS_BSC : PROVIDER_WS_BSC_DEV;
		const networkEthereum = ethers.providers.getNetwork(networkNameEthereum);

		const providersETH: ProvidersEthereum[] = [
			new ethers.providers.EtherscanProvider(networkEthereum),
			ethers.providers.InfuraProvider.getWebSocketProvider(networkEthereum),
			new ethers.providers.EtherscanProvider(networkEthereum, etherscanAPI),
			ethers.providers.AlchemyProvider.getWebSocketProvider(networkEthereum),
			ethers.providers.InfuraProvider.getWebSocketProvider(networkEthereum, infuraAPI),
			ethers.providers.AlchemyProvider.getWebSocketProvider(networkEthereum, this.alchemyAPI),
		];

			this.providerETH = new ethers.providers.FallbackProvider(providersETH);


		this.providerBSC = new ethers.providers.Web3Provider(
			new Web3.providers.HttpProvider(networkBinance)
		);

		this.web3 = new Web3(new Web3.providers.HttpProvider(
			`https://${(isMainnet) ? 'mainnet' : 'ropsten'}.infura.io/v3/${infuraAPI}`
		))

		this.contracHydroTokenERC20 = new ethers.Contract(
			this.hydroTokenERC20Address,
			HydroToken.abi,
			this.providerETH
		);

		this.contracHydroTokenBEP20 = new ethers.Contract(
			this.hydroTokenBEP20Address,
			HydroToken.abi,
			this.providerBSC
		);

		this.contracUSDTTokenERC20 = new ethers.Contract(
			this.USDTTokenERC20Address,
			HydroToken.abi,
			this.providerETH
		);

		this.contracDAITokenERC20 = new ethers.Contract(
			this.DAITokenERC20Address,
			HydroToken.abi,
			this.providerETH
		);
	}

	static getHydroTokenABI() {
		return HydroToken.abi;
	}

	static getRaindropABI() {
		return ClientRainDrop.abi;
	}

	static getProviderTUSC() {
		return PROVIDER_TUSC;
	}

	static geRaindropAddress() {
		return CLIENT_RAINDROP_ADDRESS;
	}

	getHydroTokenBEP20Address() {
		return this.hydroTokenBEP20Address;
	}

	getHydroTokenERC20Address() {
		return this.hydroTokenERC20Address;
	}

	getDAIERC20Address() {
		return this.DAITokenERC20Address;
	}

	getUSDTERC20Address() {
		return this.USDTTokenERC20Address;
	}

	getNotifications({
		address,
		setNotifications,
		lastBlockNumberBSC,
		lastBlockNumberEthereum,
	}: GetNotificationsProps) {
		let coinsEthereum: CoinType[] = ['DAI', 'USDT', 'HYDRO', 'ETH'];
		coinsEthereum.forEach((el) => {
			this.getNotificationsEthereum({
				lastBlockNumberEthereum, address, coin: el
			}).then((data) => {
				if(data.length) {
					setNotifications(data);
				}
			})
		});

		let coinsBSC: CoinType[] = ['BNB', 'HYDRO'];
		coinsBSC.forEach((el) => {
			this.getNotificationsBSC({
				lastBlockNumberBSC, address, coin: el
			}).then((data) => {
				if(data.length) {
					setNotifications(data);
				}
			}).catch((error) => {
				console.log('error in getNotifications => getNotificationsBSC', error);
			})
		})
	}

	async getNotificationsBSC({
		lastBlockNumberBSC, address, coin
	}: GetNotificationsBEP20Props) {
		const result: Notifications = [];
		try {
			const baseUrl = `https://api${this.isMainnet ? '' : '-testnet'}.bscscan.com/api?`;
			if(coin === 'BNB') {
				const queryParams = `${baseUrl}startblock=${lastBlockNumberBSC.BNB}&endblock=latest&`
				const url = `${queryParams}module=account&action=txlist&sort=desc&address=${address}`;

				const history = await axios.get<BNBHistoryResponse>(url);

				const resultHistory = history?.data?.result;

				if(resultHistory && typeof resultHistory !== 'string') {
					resultHistory.forEach( (tx: any) => {
						if (tx.value !== '0') {
							const { to, from, hash, blockNumber, value } = tx;
							const amount = ethers.utils.formatUnits(value);

							const operation =
							(address.toLowerCase() === from.toLowerCase()) ? 'SENT' : 'RECEIVED';

							result.push({
								to,
								from,
								coin,
								hash,
								amount,
								operation,
								blockNumber,
								network: 'BSC',
							});
						}
					});
				}
			} else if (coin === 'HYDRO') {
				const queryParams = `${baseUrl}startblock=${lastBlockNumberBSC.HYDRO}&endblock=latest&`
				const url = `${queryParams}module=account&action=tokentx&sort=desc&address=${address}`;
				const history = await axios.get<BNBHistoryResponse>(url);

				const resultHistory = history?.data?.result;

				if(resultHistory && typeof resultHistory !== 'string') {
					resultHistory.forEach( (tx: any) => {
						const contractAddressTx = tx.contractAddress.toLowerCase();
						const contractAddress = this.hydroTokenBEP20Address.toLowerCase();
						if (contractAddressTx === contractAddress) {
							const { to, from, hash, blockNumber, value } = tx;
							const amount = ethers.utils.formatUnits(value);

							const operation =
							(address.toLowerCase() === from.toLowerCase()) ? 'SENT' : 'RECEIVED';

							result.push({
								to,
								from,
								coin,
								hash,
								amount,
								operation,
								blockNumber,
								network: 'BSC',
							});
						}
					});
				}
			}

		} catch(error) {}
		return result;
	}

	async getNotificationsEthereum({
		lastBlockNumberEthereum, address, coin
	}: GetNotificationsERC20Props) {
		const result: Notifications = [];

		if(coin === 'ETH' && this.providerETH) {
			try {
				const responseHistory = await this.getEthereumHistory({
					address,
					startblock: lastBlockNumberEthereum.ETH
				});

				const resultHistory = responseHistory?.data?.result;

				if(resultHistory && typeof resultHistory !== 'string') {
					resultHistory.forEach( (tx: any) => {
						if (tx.value !== '0') {
							const { to, from, hash, blockNumber, value } = tx;
							const amount = ethers.utils.formatUnits(value);

							const operation =
							(address.toLowerCase() === from.toLowerCase()) ? 'SENT' : 'RECEIVED';

							result.push({
								to,
								from,
								coin,
								hash,
								amount,
								operation,
								blockNumber,
								network: 'ETH',
							});

						}
					});
				}
			} catch(error) {}
		} else {
			const contractMethods = {
				DAI: 'contracDAITokenERC20',
				USDT: 'contracUSDTTokenERC20',
				HYDRO: 'contracHydroTokenERC20',
			};
			const contract =this[contractMethods[coin]];

			if(!contract) return result;

			const fromBlock = lastBlockNumberEthereum[coin] || -5000;

			const filterTo = contract.filters.Transfer(null, address);
			const filterFrom = contract.filters.Transfer(address, null);
			const logsTo = await contract.queryFilter(filterTo, fromBlock, "latest");
			const logsFrom = await contract.queryFilter(filterFrom, fromBlock, "latest");

			const logs = [ ...logsTo, ...logsFrom ];

			logs.forEach((tx) => {
				const data = contract.interface.parseLog(tx);
				const [ from, to, amountBN ] = data.args;
				const amount = ethers.utils.formatUnits(amountBN);

				result.push({
					to,
					from,
					coin,
					amount,
					network: 'ETH',
					hash: tx.transactionHash,
					blockNumber: tx.blockNumber,
					operation: (address === from) ? 'SENT' : 'RECEIVED',
				})
			})
		}

		return result;
	}

	async getTokenBalance({ address, coin, network }: GetTokenBalanceProps) {
		try {
			const contractMethods = {
				DAI_ETH: 'contracDAITokenERC20',
				USDT_ETH: 'contracUSDTTokenERC20',
				HYDRO_ETH: 'contracHydroTokenERC20',
				HYDRO_BSC: 'contracHydroTokenBEP20',
			}

			if(coin === 'BNB') return this.getBNBBalanceOf(address);
			if(coin === 'ETH') return this.getEtherBalanceOf(address);

			const contract = this[contractMethods[`${coin}_${network}`]];

			if(contract) {
				const decimals = await contract.decimals();
				const tokenbalance = await contract.balanceOf(address);
				const amount = ethers.utils.formatUnits(tokenbalance, decimals);

				return parseFloat(amount);
			} else {
				return null;
			}
		} catch(error) {
			console.log('error in getTokenBalance', {
				data: { coin, network, error }
			});
			return null;
		}
	}

	async getDAITokenERC20BalanceOf(address: string) {
		try {
			const contract = this.contracDAITokenERC20;

			if(contract) {
				const decimals = await contract.decimals();
				const tokenbalance = await contract.balanceOf(address);

				return parseFloat(tokenbalance.toString()) / (10 ** decimals);
			} else {
				return null;
			}
		} catch(error) {
			console.log('error in getDAITokenERC20BalanceOf', error);
			return null;
		}
	}

	async getEtherBalanceOf(address: string) {
		try {
			if(this.providerETH) {
				const etherBalanceInWei = await this.providerETH.getBalance(address);
				const etherBalance = ethers.utils.formatUnits(etherBalanceInWei);
				return parseFloat(etherBalance);
			} else {
				return null;
			}

		} catch(error) {
			return null
		}
	}

	async getBNBBalanceOf(address: string) {
		try {
			if(this.providerBSC) {
				const bnbBalanceInWei = await this.providerBSC.getBalance(address);
				const bnbBalance = ethers.utils.formatUnits(bnbBalanceInWei);

				return parseFloat(bnbBalance)
			} else {
				return null;
			}

		} catch(error) {
			return null
		}
	}

	static async getTUSCTokenBalanceOf(accountName: string) {
		try {
			await ApisTUSC.instance(this.getProviderTUSC(), true).init_promise;

			const account = await ApisTUSC.instance()
				.db_api().exec('get_account_by_name', [accountName]);

			const { id, name } = account || {};

			if(!id || !name) return null;

			const accountFull = await ApisTUSC.instance().db_api().exec(
				'get_full_accounts', [ [ name, id ], false ]
			)

			let balance = accountFull?.[0]?.[1]?.['balances']?.[0]?.['balance'];

			if(balance) {
				balance = parseFloat(balance) / 100000;
			}

			// Close websocket connection
			ApisTUSC.instance().close();

			return balance || null;

		} catch(error) {
			// Close websocket connection
			ApisTUSC.instance().close();
			return null
		}
	}

	async getEthereumHistory({ address, startblock }: GetEthereumHistoryProps) {
		const baseUrl = `https://api${this.isMainnet ? '' : '-ropsten'}.etherscan.io/`;
		const fullUrl = `${baseUrl}api?module=account&action=txlist&` +
			`address=${address}&startblock=${startblock || '0'}&endblock=latest&sort=asc` +
			`&apikey=${etherscanAPI}`;

		return axios.get(fullUrl);
	}

	async getEthereumTokenHistory({
		token,
		address,
		startblock,
	}: GetEthereumTokenHistoryProps) {
		const result: HistoryData = [];
		try {
			const contractMethods = {
				DAI: 'contracDAITokenERC20',
				USDT: 'contracUSDTTokenERC20',
				HYDRO: 'contracHydroTokenERC20',
			};
			const contract =this[contractMethods[token]];

			if(!contract) return result;

			const fromBlock = startblock || '0x';

			const decimals = await contract.decimals();
			const filterTo = contract.filters.Transfer(null, address);
			const filterFrom = contract.filters.Transfer(address, null);
			const logsTo = await contract.queryFilter(filterTo, fromBlock, "latest");
			const logsFrom = await contract.queryFilter(filterFrom, fromBlock, "latest");

			const logs = [ ...logsTo, ...logsFrom ];


			logs.forEach((tx) => {
				const data = contract.interface.parseLog(tx);
				const [ from, to, amountBN ] = data.args;
				const amount = ethers.utils.formatUnits(amountBN, decimals);

				result.push({
					to,
					from,
					amount,
					blockNumber: tx.blockNumber,
					operation: (address === from) ? 'SENT' : 'RECEIVED',
				})
			})
			return result.sort((a, b) => (a.blockNumber > b.blockNumber) ? -1 : 1	);
		} catch(error) {
			console.log('error in getEthereumTokenHistory', error);
			return result;
		}
	}

	async getBSCTokenHistory({
		token,
		address,
	}: GetEthereumTokenHistoryProps) {
		const result: HistoryData = [];
		try {
			const contractMethods = {
				HYDRO: 'contracHydroTokenBEP20',
			};
			const contractAddress = this.hydroTokenBEP20Address.toLowerCase();

			if(token === 'HYDRO') {
				const baseUrl = `https://api${this.isMainnet ? '' : '-testnet'}.bscscan.com/api?`
				const url = `${baseUrl}module=account&action=tokentx&sort=desc&address=${address}`;
				const history = await axios.get<BNBHistoryResponse>(url);

				if(Boolean(history.data.status)) {
					history.data.result.forEach((tx) => {
						const contractAddressTx = tx.contractAddress.toLowerCase();

						if(contractAddressTx === contractAddress) {
							const { to, from, blockNumber, value } = tx;
							const amount = ethers.utils.formatUnits(value);
							result.push({
								to,
								from,
								amount,
								blockNumber: parseInt(blockNumber),
								operation: (address.toLowerCase() === from.toLowerCase()) ? 'SENT' : 'RECEIVED'
							})
						}
					})
				}
			}

			return result;
		} catch(error) {
			console.log('error in getEthereumTokenHistory', error);
			return result;
		}
	}


	async getBNBHistory(address: string) {
		const result: HistoryData = [];
		try {
			const baseUrl = `https://api${this.isMainnet ? '' : '-testnet'}.bscscan.com/api?`;
			const url = `${baseUrl}module=account&action=txlist&sort=desc&address=${address}`;

			const history = await axios.get<BNBHistoryResponse>(url);

			if(Boolean(history.data.status)) {
				history.data.result.forEach((tx) => {
					if (tx.value !== '0') {
						const { to, from, blockNumber, value } = tx;
						const amount = ethers.utils.formatUnits(value);

						result.push({
							to,
							from,
							amount,
							blockNumber: parseInt(blockNumber),
							operation: (address.toLowerCase() === from.toLowerCase()) ? 'SENT' : 'RECEIVED',
						})
					}
				})
			}

			return result;

		} catch(error) {
			return result;
		}
	}

	static getContractRaindrop() {
		const provider = new ethers.providers.InfuraProvider("rinkeby");

		const contract = new ethers.Contract(
			this.geRaindropAddress(),
			this.getRaindropABI(),
			provider
		);

		return contract;
	}

	static async isHydroIdAvailable(hydroId: string) {
    let isAvailable = false;
    try {
      const contractRaindrop = this.getContractRaindrop();
      isAvailable = await contractRaindrop.hydroIDAvailable(hydroId);

      return isAvailable;
    } catch (err) {
      return isAvailable;
    }
  };
}

export default Web3Service;
