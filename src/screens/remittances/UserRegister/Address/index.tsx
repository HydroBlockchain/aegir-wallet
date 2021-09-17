import React, { Fragment } from 'react'

import styles from '../styles';
import { View, Dimensions } from 'react-native';
import Button from '../../../../components/Button';
import { themeGlobal } from '../../../../libs/Theme';
import Paragraph from '../../../../components/Paragraph';
import { PropsUserRegisterScreens } from '../interfaces';
import HeaderCustom from '../../../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import TextInputCustom from '../../../../components/TextInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewContainer from '../../../../components/Layouts/ViewContainer';

const Address = (props: PropsUserRegisterScreens) => {
  const {
    navigation,
    setFormFiled,
  } = props;

  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');

  const handleNext = () => {
    navigation.push('UserRegister', { step: 'notification_settings' });
  }
  
  return (
    <Fragment>
      <HeaderCustom variant='back' />

      <View style={[
        styles.wrapperForm,
        { height: height - themeGlobal.heightHeader - insets.top - insets.bottom }
      ]} >
        <ScrollView>
          <ViewContainer>
            <Paragraph variant='subtitle1' >
              User Register / Address
            </Paragraph>

            <View style={ styles.form } >
              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Address'
                  placeholder='Write your address'
                  onChangeText={(value) => setFormFiled(value, 'address')}
                />
              </View>
              
              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Country'
                  placeholder='Write your country'
                  onChangeText={(value) => setFormFiled(value, 'country')}
                />
              </View>
              
              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='City'
                  placeholder='Write your city'
                  onChangeText={(value) => setFormFiled(value, 'city')}
                />
              </View>
              
              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Phone'
                  keyboardType='phone-pad'
                  placeholder='Write your phone'
                  onChangeText={(value) => setFormFiled(value, 'phone')}
                />
              </View>
              
            </View>
          </ViewContainer>
        </ScrollView>
              
        <ViewContainer>
          <Button text='next' onPress={handleNext} />
        </ViewContainer>
      </View>
    </Fragment>
  )
}

export default Address;