import React, { Fragment, useContext, useEffect, useState } from 'react'

import styles from '../styles';
import Button from '../../../../components/Button';
import Paragraph from '../../../../components/Paragraph';
import HeaderCustom from '../../../../components/Header';
import { PropsUserRegisterScreens } from '../interfaces';
import { ThemeContext } from '../../../../hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal, Portal, Switch } from 'react-native-paper';
import TextInputCustom from '../../../../components/TextInput';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewContainer from '../../../../components/Layouts/ViewContainer';
import { Dimensions, StyleSheet, View, TouchableOpacity } from 'react-native';

const Security = (props: PropsUserRegisterScreens) => {
  const {
    form,
    navigation,
    setFormFiled,
  } = props;

  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const { height } = Dimensions.get('window');
  const [ showModal, setShowModal ] = useState(false);
  const [ isSwitchOn, setIsSwitchOn ] = React.useState(false);


  const handleSubmit = () => {
    setShowModal(true);
  }

  const onToggleSwitch = () => {
    setIsSwitchOn((prevState) => !isSwitchOn);
  }


  const handleModal = () => {
    setShowModal((prevState) => !prevState);
  }

  const handleLogin = () => {
    setShowModal(false);
    navigation.navigate('StartRemittances')
  }

  return (
    <Fragment>
      <Portal>
        <Modal
          visible={showModal}
          onDismiss={handleModal}
        >
          <ViewContainer style={[ styles.wrapperModal ]} >
            <ViewContainer style={[
              styles.wrapperModalInternal,
              { backgroundColor: theme.colors.backgroundApp }
            ]} >
              <View style={stylesLocal.modalCol1} >
                <View style={stylesLocal.wrapperIconModal} >
                  <IconAntDesign
                    size={40}
                    color='green'
                    name='checkcircle'
                  />
                </View>
              </View>
              <View style={stylesLocal.modalCol2} >
                <Paragraph variant='subtitle1'>
                  Account Created
                </Paragraph>

                <View style={stylesLocal.modalBody} >
                  <Paragraph variant='caption'>
                    Your account has been created successfully.
                  </Paragraph>

                  <Paragraph variant='caption' stylesCustom={{marginTop: 20}} >
                    You should check your email for the account activation link
                  </Paragraph>

                </View>

                <TouchableOpacity
                  onPress={handleLogin}
                  style={[
                    stylesLocal.buttonModal,
                    { backgroundColor: theme.colors.primary }
                  ]}
                >
                  <Paragraph variant='button'>
                    Login
                  </Paragraph>
                </TouchableOpacity>
              </View>
            </ViewContainer>
          </ViewContainer>
        </Modal>
      </Portal>
      <HeaderCustom variant='back' />
      <View style={[
        styles.wrapperForm,
        { height: height - theme.heightHeader - insets.top - insets.bottom }
      ]} >
        <ScrollView>
          <ViewContainer>
            <Paragraph variant='subtitle1' >
              User Register / Security
            </Paragraph>

            <View style={ styles.form } >
              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Security question'
                  placeholder='Select your security question'
                  // onChangeText={(value) => {setFormFiled(value, 'password')}}
                />
              </View>

              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Answer'
                  placeholder='Write your answer'
                  onChangeText={(value) => setFormFiled(value, 'address')}
                />
              </View>
            </View>

            <View style={[
              styles.label2fa,
              styles.wrapperInput,
            ]} >
            <Paragraph variant='inputLabel1' stylesCustom={[
                {
                  flex: 1,
                  color: theme.colors.text2
                }
              ]} >
                Double factor authentication
              </Paragraph>

              <Switch
                color={'white'}
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
              />
            </View>
          </ViewContainer>
        </ScrollView>

        <View>
          <ViewContainer>
            <Button text='Save' onPress={handleSubmit} />
          </ViewContainer>
        </View>
      </View>
    </Fragment>
  )
}

const stylesLocal = StyleSheet.create({
  modalCol1: {
    marginRight: 10,
    alignItems: 'center',
  },
  modalCol2: {
    flex: 1,
    paddingTop: 8,
    justifyContent: 'space-evenly'
  },
  wrapperIconModal: {
    borderRadius: 100,
    backgroundColor: 'white',
  },
  modalBody: {
    marginTop: 30,
    flex: 1
  },
  buttonModal: {
    width: 100,
    padding: 13,
    display: "flex",
    marginBottom: 16,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'flex-end'
  }
});

export default Security;