import React, { useContext, useState, Fragment } from 'react'

/* styles */
import styles from './styles';

/* components */
import Button from '../Button';
import { View } from 'react-native'
import ImageCard from './CustonTokenImageCard';
import Paragraph from '../Paragraph/index';

/* utils */
import { CoinCardProps } from '../../interfaces/CoinInterfaces';

/* context */
import { ThemeContext } from '../../hooks/useTheme';

const CustonTokenCard = ({
  coin,
  balance,
  network,
  address,
  showAddress,
  balanceInUSD,
  createAccount,
  deposit = () => {},
  history = () => {},
  receive = () => {},
  styleCustom = {
    card: {},
    button: {},
    buttonText: {},
  }
}: CoinCardProps) => {
  const { theme } = useContext(ThemeContext);
  const [ heightCard, setHeightCard ] = useState(0);

  const styleButtons = [
    styles.button,
    styles[`btn_${coin.toLowerCase()}_${network.toLowerCase()}`],
    styleCustom.button
  ];

  const styleTextButtons = [
    styles.buttonText,
    styles[`btn_text_${coin.toLowerCase()}_${network.toLowerCase()}`],
    styleCustom.buttonText
  ];

  return (
    <View
      style={[
        styles.card,
        {
          width: '100%',
          minHeight: heightCard,
          opacity: heightCard ? 1 : 0,
          borderRadius: theme.roundness,
          backgroundColor: theme.colors.backgroundApp2,
        },
        styleCustom.card
      ]}
      onLayout={(event) => {
        var { width } = event.nativeEvent.layout;
        setHeightCard((prevState) => {
          return (prevState) ? prevState : (9 / 16) * width
        })
      }}
    >
      <View style={styles.infoCard} >
        <ImageCard network={network} coin={coin} />
        <View style={styles.cardBalance} >
          <Paragraph
            numberOfLines={1}
            variant='subtitle1'
            adjustsFontSizeToFit={true}
            stylesCustom={[
              styles.alignBalance,
              styles.criptoBalance,
            ]}
          >
            {`${balance} ${coin}`}
          </Paragraph>

          { (!balanceInUSD) ? null : (
            <Paragraph variant='body1' stylesCustom={[
              styles.alignBalance,
              styles.criptoBalance,
            ]}>
              {`${balanceInUSD} ≈ USD`}
            </Paragraph>
          )}

          {(!showAddress) &&
            <Paragraph variant='body1' stylesCustom={[
              styles.alignBalance,
              styles.criptoBalance,
            ]} >
              {`Network: ${network}`}
            </Paragraph>
          }
        </View>
      </View>

      <View style={styles.wrapperButtons} >
        {(showAddress) ? (
          <View style={styles.wrapperAddress} >
            <View style={styles.contentAddress} >
              <Paragraph
                variant='caption'
                numberOfLines={1}
              >
                {address || ''}
              </Paragraph>
            </View>

            <View style={styles.contentNetwork} >
              <Paragraph variant='body1'>
                {`Network: ${network}`}
              </Paragraph>
            </View>
          </View>
        ) : (createAccount) ? (
          <Button
            text='Add account'
            onPress={createAccount}
            styleCustom={styleButtons}
            styleText={styleTextButtons}
          />

        ) : (
          <Fragment>
            <View>
              <Button
                text='Send'
                onPress={deposit}
                styleCustom={styleButtons}
                styleText={styleTextButtons}
              />
            </View>

            <View>
              <Button
                text='History'
                onPress={history}
                styleCustom={styleButtons}
                styleText={styleTextButtons}
              />
            </View>

            <View>
              <Button
                text='Receive'
                onPress={receive}
                styleCustom={styleButtons}
                styleText={styleTextButtons}
              />
            </View>
          </Fragment>
        )}
      </View>
    </View>
  )
}

export default CustonTokenCard;