import React, { Fragment, useState } from 'react'

import moment from 'moment';
import styles from '../styles';
import Button from '../../../../components/Button';
import { themeGlobal } from '../../../../libs/Theme';
import HeaderCustom from '../../../../components/Header';
import Paragraph from '../../../../components/Paragraph';
import { PropsUserRegisterScreens } from '../interfaces';
import { ScrollView } from 'react-native-gesture-handler';
import TextInputCustom from '../../../../components/TextInput';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import ViewContainer from '../../../../components/Layouts/ViewContainer';

const PersonalInformation = (props: PropsUserRegisterScreens) => {
  const {
    form,
    navigation,
    setFormFiled,
  } = props;
  
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  const [ date, setDate ] = useState(new Date());
  const [ showDataPicker, setShowDataPicker] = useState(false);
  
  const onChangeDate = (event: Event, selectedDate: Date | undefined) => {
    setShowDataPicker(false);
    setDate((prevSate) => selectedDate || prevSate);
    selectedDate && setFormFiled(moment(selectedDate).format('MM/DD/YYYY'), 'birthday');
  };

  const handleBirthday = () => {
    setShowDataPicker((prevState) => !prevState);
  };

  const handleNext = () => {
    navigation.push('UserRegister', { step: 'address' });
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
              User Register / Personal Information
            </Paragraph>

            <View style={ styles.form } >
              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Name'
                  placeholder='Write your name'
                  onChangeText={(value) => setFormFiled(value, 'name')}
                />
              </View>

              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='Last Name'
                  placeholder='Write your last name'
                  onChangeText={(value) => setFormFiled(value, 'lastName')}
                />
              </View>

              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='User Name'
                  placeholder='Write your user name'
                  onChangeText={(value) => setFormFiled(value, 'userName')}
                />
              </View>

              <View style={ styles.wrapperInput } >
                <TextInputCustom
                  label='E-Mail'
                  keyboardType='email-address'
                  placeholder='Write your E-Mail'
                  onChangeText={(value) => setFormFiled(value, 'email')}
                />
              </View>

              <View style={ styles.wrapperInput } >
                <TouchableOpacity onPress={handleBirthday} >
                  <TextInputCustom
                    icon='calendar'
                    label='Birthday'
                    editable={false}
                    value={form.birthday}
                    placeholder='DD/MM/YYYY'
                  />

                  {(showDataPicker) &&
                    <DateTimePicker
                      value={date}
                      mode={'date'}
                      display="default"
                      testID="dateTimePicker"
                      onChange={onChangeDate}
                    />
                  }
                </TouchableOpacity>
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

export default PersonalInformation;