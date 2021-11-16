import React, { useContext } from 'react';
import { View } from 'react-native';

import styles from './styles';
import BgView from '../../components/Layouts/BgView';
import HeaderCustom from '../../components/Header/index';
import Paragraph from '../../components/Paragraph/index';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';

const ViewHydroID = () => {
  const { appState } = useContext(AppStateManagerContext);
  return(
    <BgView>
      <HeaderCustom variant='back' title='Hydro ID' />

      <ViewContainer style= {styles.viewContainer}>
        <Paragraph variant='h3'>
          Hydro ID
        </Paragraph>
        <Paragraph variant='body1'>
          {`#${appState.EIN}`}
        </Paragraph>

        <View style={{ height: 16 }} />

        <Paragraph variant='h3'>
          Associated address
        </Paragraph>
        <Paragraph variant='caption'>
          {appState.address}
        </Paragraph>
      </ViewContainer>
    </BgView>
  )
}

export default ViewHydroID;