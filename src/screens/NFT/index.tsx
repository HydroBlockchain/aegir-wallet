import React, { useContext } from 'react';

import styles from './styles';
import Button from '../../components/Button';
import { RefreshControl, ScrollView, View } from 'react-native';
import Paragraph from '../../components/Paragraph';
import HeaderCustom from '../../components/Header';
import BgView from '../../components/Layouts/BgView';
import PreviewNFT from '../../components/PreviewNFT';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';
import { ListNFTParam } from './interfaces';

const ListNFT = ({ navigation }: ListNFTParam) => {
  const {
    refresCollectiblesUri,
    appState: { collectibles }
  } = useContext(AppStateManagerContext);
  const collectibleGroup = [...(new Set(collectibles.map(el => el.tokenName)))];

  return (
    <BgView>
      <HeaderCustom variant='back' title='NFTs' />

      <ViewContainer style={styles.viewContainer} >
        <View style={styles.content} >
            {(collectibles.length) ? (
               <ScrollView refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => {
                  refresCollectiblesUri();
                }}/>
              }>
                <View style={styles.collectibleTabGroup} >
                  {collectibleGroup.map(el => {
                    if(!el) return null;
                    return(
                      <View key={el} style={styles.collectibleTabGroupItem} >
                        <Button text={el} variant='grey' />
                      </View>
                    );
                  })}

                  {(collectibleGroup.length > 1) && (
                    <View style={styles.collectibleTabGroupItem} >
                      <Button
                        text='All'
                        variant='grey'
                      />
                    </View>
                  )}
                </View>

                <View style={styles.collectibleGroup}>
                  {collectibles.map((nft) => {
                    return(
                      <View key={nft.tokenID} style={styles.collectibleGroupItem}>
                        <PreviewNFT
                          id={`${nft.tokenID}`}
                          imageUrl={nft.tokenURI}
                          title={nft.tokenName ?? ''}
                          onPressRight={() => {
                            navigation.navigate('ViewNFT', nft);
                          }}
                          onPressLeft={() => {
                            navigation.navigate('SendNFT', nft);
                          }}
                        />
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            ) : (
              <Paragraph stylesCustom={styles.noData} variant='subtitle1' >
                No NFTs to show
              </Paragraph>
            )}
        </View>

        <Button
          variant='grey'
          text='Import manually'
          onPress={() => navigation.navigate('AddNFT')}
        />
      </ViewContainer>
    </BgView>
  )
}

export default ListNFT
