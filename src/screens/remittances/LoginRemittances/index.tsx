import React, { useContext, useState } from 'react';

import styles from './style';
import Button from '../../../components/Button';
import { Modal, Portal } from 'react-native-paper';
import { LoginRemittancesProps } from './interfaces';
import HeaderCustom from '../../../components/Header';
import Paragraph from '../../../components/Paragraph';
import { ThemeContext } from '../../../hooks/useTheme';
import BgView from '../../../components/Layouts/BgView';
import TextInputCustom from '../../../components/TextInput';
import { View, Image, TouchableOpacity } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ViewContainer from '../../../components/Layouts/ViewContainer';


const LoginRemittances = ({ route, navigation }: LoginRemittancesProps) => {
  const { theme } = useContext(ThemeContext);
  const [ value2FA, setValue2FA ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ openKeyboard, setOpenKeyboard ] = useState(false);

  const handleLogin = () => {
    setShowModal(true);
  }

  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  }

  const handleCode2fa = () => {
    setOpenKeyboard((prevState) => !prevState);
  }

  const verify2FA = () => {
    setShowModal(false);
    navigation.navigate('SendMoney');
  }

  const onChangeText2FA = (value: string) => {
    if(value.length <= 6){
      setValue2FA(value);
    } else {
      setValue2FA((prevState) => (
        prevState.slice(0, prevState.length - 1) + value.slice(-1)
      ))
    }
  }

  return (
    <BgView>
      <HeaderCustom />

      <Portal>
        <Modal
          visible={showModal}
          onDismiss={handleModal}
          contentContainerStyle={styles.contentContainerModal}
        >
          <ViewContainer style={styles.wrapperModal} >
            <ViewContainer style={[
              styles.wrapperModalInternal,
              { backgroundColor: theme.colors.backgroundApp }
            ]} >
              <View style={styles.modalRow1} >
                <View style={styles.modalCol1} >
                  <View style={styles.wrapperIconModal} >
                    <IconAntDesign
                      size={40}
                      color='#0170FD'
                      name='exclamationcircle'
                    />
                  </View>
                </View>
                <View style={styles.modalCol2} >
                  <Paragraph variant='subtitle1'>
                    Double factor authentication
                  </Paragraph>

                  <View style={styles.modalBody} >
                    <Paragraph variant='caption'>
                      Lorem ipsum dolor sit. Lorem ipsum dolor sit
                    </Paragraph>

                    <Paragraph variant='caption' stylesCustom={{marginTop: 20}} >
                      amet consectetur adipisicing elit. Quis tenetur labore repellat modi ipsa, cum dicta quibusdam corporis
                    </Paragraph>

                    <TouchableOpacity
                      onPress={handleCode2fa}
                    >
                      <View style={styles.wrapperInput2FA} >
                        {openKeyboard && <TextInput
                          autoFocus
                          value={value2FA}
                          keyboardType='phone-pad'
                          style={styles.inputText2FA}
                          onChangeText={onChangeText2FA}
                        />}
                        {'------'.split('').map((el, key, arr) => {
                          const style: object[] = [ styles.input2FA ];

                          
                          if(key === 0) {
                            style.push(styles.inputStartSpace2FA);
                          } else if(key === arr.length - 1) {
                            style.push(styles.inputEndSpace2FA);
                          } else {
                            style.push(styles.inputSpace2FA);
                          }

                          let label = el;
                          const code = value2FA.split('');

                          if(key < code.length) {
                            label = code[key];
                          }
                          
                          return(
                            <View key={key} style={style} >
                              <Paragraph variant='inputLabel1'>
                                {label}
                              </Paragraph>
                            </View>
                          )
                        })}
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>            
              </View>

              <TouchableOpacity
                onPress={verify2FA}
                style={[
                  styles.buttonModal,
                  { backgroundColor: theme.colors.primary }
                ]}
              >
                <Paragraph variant='button'>
                  Send
                </Paragraph>
              </TouchableOpacity>
            </ViewContainer>
          </ViewContainer>
        </Modal>
      </Portal>
      
      <ScrollView>
        <ViewContainer>
          <Paragraph stylesCustom={styles.title} variant='h2'>
            Login
          </Paragraph>

          <View style={ styles.wrapperInput } >
            <TextInputCustom
              label='Username'
              onChangeText={() => {}}
              placeholder='Write your username'
            />
          </View>

          <View style={ styles.wrapperInput } >
            <TextInputCustom
              label='Passwrod'
              secureTextEntry={true}
              onChangeText={() => {}}
              placeholder='Write your passwrod'
            />
          </View>

          <Button styleCustom={styles.btnLogin} text='Login' onPress={handleLogin} />

          <Paragraph variant='inputLabel1' stylesCustom={[
            {
              marginTop: 36,
              alignSelf: 'center',
              color: theme.colors.text2
            }
          ]} >
            Do you have a Hydro App account?
          </Paragraph>

          <Paragraph variant='inputLabel1' stylesCustom={[
            {
              alignSelf: 'center',
              color: theme.colors.text
            }
          ]} >
            I forgot my password
          </Paragraph>

          <Image
            resizeMode='contain'
            style={styles.figerPrint}
            source={require('../../../assets/images/remittances/finger-print.png')}
          />
        </ViewContainer>
      </ScrollView>
    </BgView>
  )
}


export default LoginRemittances;