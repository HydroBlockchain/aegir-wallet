import React, { useContext } from 'react';

import styles from './styles';
import { IAddContact } from './interfaces';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';
import HeaderCustom from '../../components/Header';
import { ThemeContext } from '../../hooks/useTheme';
import BgView from '../../components/Layouts/BgView';
import Clipboard from '@react-native-clipboard/clipboard';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import ViewContainer from '../../components/Layouts/ViewContainer';
import { AppStateManagerContext } from '../../context/AppStateManager';

const Contacts = ({ navigation }: IAddContact) => {
  const { theme } = useContext(ThemeContext);
  const { toast, appState: { contacts } } = useContext(AppStateManagerContext);

  const copyAddress = (address: string) => {
		Clipboard.setString(address);
    toast({
      type: 'success',
      text: 'Copied address!',
    })
	}
  
  return (
    <BgView>
      <HeaderCustom variant='back' title='Contacts' />

      <ViewContainer style={styles.viewContainer} >
        <View style={styles.content} >
          {(contacts.length) ? (
            <ScrollView>
              {contacts.map((item, key) => {
                return(
                  <TouchableOpacity key={key} onPress={() => copyAddress(item.address)} >
                    <View
                      style={[
                        styles.wrapperContacts,
                        { backgroundColor: theme.colors.backgroundApp2 }
                      ]}
                    >
                      <Paragraph variant='caption' >
                        {item.name}
                      </Paragraph>
                      <Paragraph variant='caption' >
                        {`${item.address.slice(0, 10)}....${item.address.slice(-10)}`}
                      </Paragraph>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <Paragraph stylesCustom={styles.noContacts} variant='subtitle1' >
              You have no contacts!
            </Paragraph>
          )}
        </View>

        <Button
          variant='grey'
          text='Add new contact'
          onPress={() => navigation.navigate('AddContact')}
        />
      </ViewContainer>
    </BgView>
  )
}

export default Contacts
