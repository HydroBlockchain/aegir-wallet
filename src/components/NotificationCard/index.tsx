import React, { useContext, useState, Fragment } from 'react'

/* styles */
import styles from './styles';

/* components */
import ImageCard from './ImageCard';
import Paragraph from '../Paragraph/index';
import { TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

/* utils */
import { Notification } from '../../interfaces/Web3ServiceInterface';

/* context */
import { ThemeContext } from '../../hooks/useTheme';
import { AppStateManagerContext } from '../../context/AppStateManager/index';

interface TextProps {
  value: string,
  color?: string | null
}

const NotificationCard = ({
  to,
  hash,
  coin,
  from,
  amount,
  network,
  operation,
}: Notification) => {
  const { theme } = useContext(ThemeContext);
  const { appState: { address } } = useContext(AppStateManagerContext);

  const Text = ({ value, color = null }: TextProps) => {
    const style: any = [ styles.notificationText ];

    color && style.push({ color });

    return(
      <Paragraph
        variant='body2'
        numberOfLines={1}
        stylesCustom={style}
        adjustsFontSizeToFit={true}
      >
        { value }
      </Paragraph>
    );
  }

  const onPress = () => {
    Clipboard.setString(hash);
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.card,
          { backgroundColor: theme.colors.backgroundApp2 }
        ]}
      >
        <View style={styles.infoCard} >
          <ImageCard network={network} coin={coin} />
          <View style={styles.cardBalance} >
            <Text
              value={operation}
              color={(operation === 'RECEIVED') ? theme.colors.success : theme.colors.error}
            />
            <Text value={`amount: ${amount}`} />
            <Text value={`To: ${to}`} />
            <Text value={`From: ${from}`} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default NotificationCard;