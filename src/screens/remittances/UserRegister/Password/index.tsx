import React, { Fragment, useContext, useEffect, useState } from 'react'

import styles from '../styles';
import { Dimensions, Text, View } from 'react-native';
import Button from '../../../../components/Button';
import Paragraph from '../../../../components/Paragraph';
import HeaderCustom from '../../../../components/Header';
import { PropsUserRegisterScreens } from '../interfaces';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeContext } from '../../../../hooks/useTheme';
import RadioButton from '../../../../components/RadioButton';
import TextInputCustom from '../../../../components/TextInput';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewContainer from '../../../../components/Layouts/ViewContainer';


const Password = (props: PropsUserRegisterScreens) => {
  const {
    form,
    navigation,
    setFormFiled,
  } = props;

  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const { height } = Dimensions.get('window');
  const [ toggleCheckBox,  setToggleCheckBox] = useState(false);

  const handleNext = () => {
    navigation.push('UserRegister', { step: 'security' });
  }

  return (
    <Fragment>
      <HeaderCustom variant='back' />
      <View style={[
        styles.wrapperForm,
        { height: height - theme.heightHeader - insets.top - insets.bottom }
      ]} >
        <ScrollView>
          <ViewContainer>
            <Paragraph variant='subtitle1' >
              User Register / Password
            </Paragraph>

            <View style={ styles.form } >
              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Password'
                  placeholder='Write your password'
                  onChangeText={(value) => setFormFiled(value, 'password')}
                />
              </View>

              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Password confirmation'
                  placeholder='Confirm your password'
                  onChangeText={(value) => setFormFiled(value, 'address')}
                />
              </View>

              <View style={[
                styles.wrapperInput,
                styles.acceptTermsWrapper,
              ]} >
                <RadioButton />
                <Paragraph variant='inputLabel1' stylesCustom={[
                  styles.acceptTermsLabel,
                  {color: theme.colors.text2 }
                ]} >
                  <Fragment>
                    I have read agreed
                    <Text style={{color: theme.colors.text}} > Terms and conditions </Text>
                    and
                    <Text style={{color: theme.colors.text}} > privacy policy </Text>
                  </Fragment>
                </Paragraph>
              </View>
            </View>
          </ViewContainer>
        </ScrollView>

        <View>
          <ViewContainer>
            <Button text='next' onPress={handleNext} />
          </ViewContainer>
        </View>
      </View>
    </Fragment>
  )
}

export default Password;