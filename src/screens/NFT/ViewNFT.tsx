import React, { useContext } from 'react';

import styles from './styles';
import { ViewNFTParam } from './interfaces';
import Button from '../../components/Button';
import { ScrollView, View } from 'react-native';
import Paragraph from '../../components/Paragraph';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import PreviewNFT from '../../components/PreviewNFT';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';

const ViewNFT = ({ navigation, route }: ViewNFTParam) => {
  const NFT = route.params;

  return (
    <BgView>
      <HeaderCustom variant='back' title={`NFT - ${NFT.tokenName} #${NFT.tokenID}`} />

      <ViewContainer style={styles.viewContainer} >
        <View style={styles.content} >
        <ScrollView>
          <PreviewNFT
            hiddenButton={true}
            id={`${NFT.tokenID}`}
            imageUrl={NFT.tokenURI}
            title={NFT.tokenName ?? ''}
          />
        </ScrollView>
        </View>
      </ViewContainer>
    </BgView>
  )
}

export default ViewNFT
