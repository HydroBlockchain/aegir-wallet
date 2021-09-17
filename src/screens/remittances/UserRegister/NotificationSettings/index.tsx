import React, { Fragment, useContext, useEffect, useState } from 'react'

import styles from '../styles';
import Button from '../../../../components/Button';
import { Dimensions, Text, View } from 'react-native';
import CheckBox from '../../../../components/CheckBox';
import { PropsUserRegisterScreens } from '../interfaces';
import Paragraph from '../../../../components/Paragraph';
import HeaderCustom from '../../../../components/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { ThemeContext } from '../../../../hooks/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ViewContainer from '../../../../components/Layouts/ViewContainer';


const NotificationSettings = (props: PropsUserRegisterScreens) => {
  const {
    navigation,
    setFormFiled,
  } = props;
  
  const insets = useSafeAreaInsets();
  const { theme } = useContext(ThemeContext);
  const { height } = Dimensions.get('window');
  const [ toggleCheckBox,  setToggleCheckBox] = useState(false);

  const handleNext = () => {
    navigation.push('UserRegister', { step: 'password' });
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
              User Register / Notification Settings
            </Paragraph>

            <View style={ styles.form } >
              <Paragraph variant='body2' stylesCustom={{
                ...styles.subheader,
                color: theme.colors.text,
              }} >
                <Fragment>
                  Options for receiving notifications <Text style={{color: 'red'}} >*</Text>
                </Fragment>
              </Paragraph>

              <CheckBox
                label='Mail'
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />

              <CheckBox
                label='WhatsApp'
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />

              <CheckBox
                label='Telegram'
                onValueChange={(newValue) => setToggleCheckBox(newValue)}
              />
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

export default NotificationSettings;