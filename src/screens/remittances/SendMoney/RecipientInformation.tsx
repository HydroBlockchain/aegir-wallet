import React from 'react'
import styles from './styles';
import { TabsProps } from './interfaces';
import { ScrollView, View } from 'react-native';
import Button from '../../../components/Button';
import Paragraph from '../../../components/Paragraph';
import TextInputCustom from '../../../components/TextInput';
import ViewContainer from '../../../components/Layouts/ViewContainer'

const RecipientInformation = ({ next }: TabsProps) => {

  return (
    <ScrollView>
      <ViewContainer>
      <View style={ styles.form } >
        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Name'
            placeholder='Write your name'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Last Name'
            placeholder='Write your last name'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='E-Mail'
            placeholder='Write your E-Mail'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Phone'
            keyboardType='phone-pad'
            placeholder='Write your phone'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Country of birth'
            placeholder='Write your country of birth'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Nacionality'
            placeholder='Write your nacionality'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <Paragraph variant='inputLabel1'>
            Identification document
          </Paragraph>

          <View style={styles.wrapperDocumentInput} >
            <TextInputCustom
              placeholder='00000000'
              stylesCustom={{
                wrapper: styles.inputDocument
              }}
              onChangeText={(value) => {}}
            />
            
            <TextInputCustom
              placeholder='Document'
              stylesCustom={{
                wrapper: styles.inputDocument
              }}
              onChangeText={(value) => {}}
            />
          </View>
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Issuing country'
            placeholder='Write your issuing country'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Date of issue'
            placeholder='Write your date of issue'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Date of Expiry'
            placeholder='Write your date of expiry'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Employment situation'
            placeholder='Write your employment situation'
            onChangeText={(value) => {}}
          />
        </View>

        <View style={ styles.wrapperInput } >
          <TextInputCustom
            label='Industrial sector in which you work'
            placeholder='Write your industrial sector in which you work'
            onChangeText={(value) => {}}
          />
        </View>
      </View>

      <Button text='next' onPress={next} />
      </ViewContainer>
    </ScrollView>
  )
}

export default RecipientInformation
