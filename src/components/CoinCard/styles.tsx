import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '100%',
  },
  imageCard: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardBalance: {
    flex: 1,
    marginLeft: 5,
  },
  alignBalance: {
    textAlign: 'right'
  },
  criptoBalance: {},
  fiatBalance: {},
  red: {},
  wrapperButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20
  },
  buttonText: {
    fontSize: 12
  },
  wrapperAddress: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  contentAddress: {
    flex: 1,
    paddingRight: 5,
    justifyContent: 'center',
  },
  contentNetwork: {
    alignItems: 'flex-end',
  },
  btn_hydro_bsc: {
    backgroundColor: '#272727'
  },
  btn_text_hydro_bsc: {
    color: 'white'
  },
  btn_hydro_eth: {
    backgroundColor: '#ADADAD'
  },
  btn_text_hydro_eth: {
    color: '#272727'
  },
  btn_bnb_bsc: {
    backgroundColor: '#F0B90B'
  },
  btn_text_bnb_bsc: {
    color: '#272727'
  },
  btn_eth_eth: {
    backgroundColor: '#62688F'
  },
  btn_text_eth_eth: {
    color: 'white'
  },
  btn_btc_btc: {
    backgroundColor: '#F7931A'
  },
  btn_text_btc_btc: {
    color: '#272727'
  },
  btn_usdt_eth: {
    backgroundColor: '#50AF94'
  },
  btn_text_usdt_eth: {
    color: '#FFFFFF'
  },
  btn_dai_eth: {
    backgroundColor: '#F4B731'
  },
  btn_text_dai_eth: {
    color: '#272727'
  },
  btn_tusc_tusc: {
    backgroundColor: '#000000'
  },
  btn_text_tusc_tusc: {
    color: '#FFFFFF'
  },
});

export default styles;