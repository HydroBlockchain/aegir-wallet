import React, { Fragment, useContext } from 'react'

import styles from './styles';
import { TabsProps } from './interfaces';
import { ScrollView, Text, View } from 'react-native';
import Button from '../../../components/Button';
import Paragraph from '../../../components/Paragraph';
import { ThemeContext } from '../../../hooks/useTheme';
import TextInputCustom from '../../../components/TextInput';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import ViewContainer from '../../../components/Layouts/ViewContainer';

const MoneyToSend = ({ next }: TabsProps) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <ScrollView>
      <ViewContainer >
        <View style={ styles.form } >
          <View style={ styles.wrapperInput } >
            <TextInputCustom
              label='Send to'
              placeholder='Uruguay'
              onChangeText={(value) => {}}
            />
          </View>

          <View
            style={[
              styles.wrapperConverter,
              { backgroundColor: theme.colors.backgroundApp2 }
            ]}
          >
            <View style={styles.converterContent} >
              <View style={[
                styles.converterContentCol,
                styles.converterWrapperInputs
              ]}>
                <Paragraph variant='inputLabel1' >
                  You send
                </Paragraph>

                <View style={[styles.converterContentInput]}>
                  <TextInputCustom
                    placeholder='100'
                    keyboardType='phone-pad'
                    stylesCustom={{
                      wrapper: styles.convertInput,
                      wrapperInput: { backgroundColor: theme.colors.backgroundApp}
                    }}
                  />
                  
                  <TextInputCustom
                    placeholder='USD'
                    stylesCustom={{
                      wrapper: styles.convertInput,
                      wrapperInput: { backgroundColor: theme.colors.backgroundApp}
                    }}
                  />
                </View>
              </View>

              <View style={[
                styles.converterContentCol,
                styles.converterContentIcon,
              ]}>
                <IconFontAwesome
                  size={25}
                  name='long-arrow-right'
                  color={theme.colors.text2}
                />
              </View>

              <View style={[
                styles.converterContentCol,
                styles.converterWrapperInputs 
              ]}>
                <Paragraph variant='inputLabel1' >
                  To receive
                </Paragraph>

                <View style={[styles.converterContentInput]} >
                  <TextInputCustom
                    placeholder='4300'
                    keyboardType='phone-pad'
                    stylesCustom={{
                      wrapper: styles.convertInput,
                      wrapperInput: { backgroundColor: theme.colors.backgroundApp}
                    }}
                  />
                  
                  <TextInputCustom
                    placeholder='UYU'
                    stylesCustom={{
                      wrapper: styles.convertInput,
                      wrapperInput: { backgroundColor: theme.colors.backgroundApp}
                    }}
                  />
                </View>  
              </View>
            </View>

            <View style={styles.converterResult} >
              <Paragraph variant='body1'>
                1 USD = 43 UYU
              </Paragraph>

              <Paragraph variant='caption' stylesCustom={{
                color: theme.colors.text2
              }} >
                Maximum can send 5,000 USD
              </Paragraph>
            </View>
          </View>

          <View style={ styles.wrapperInput } >
            <TextInputCustom
              placeholder='Bank transfer'
              label='How does the recipient receive it?'
              onChangeText={(value) => {}}
            />
          </View>

          <View style={ styles.wrapperInput } >
            <Paragraph variant='inputLabel1'>
              Recipient’s card number
            </Paragraph>

            <View style={styles.wrapperCardNumber} >
              <TextInputCustom
                stylesCustom={{
                  wrapper: styles.inputCardNumber
                }}
                keyboardType='phone-pad'
                placeholder='1234 5678 9101 1123'
                onChangeText={(value) => {}}
              />
              
              <TextInputCustom
                stylesCustom={{
                  wrapper: styles.inputCardNumberExpire
                }}
                placeholder='MM/AA'
                onChangeText={(value) => {}}
              />
              
              <TextInputCustom
                stylesCustom={{
                  wrapper: styles.inputCardNumberCVV
                }}
                placeholder='CVC'
                onChangeText={(value) => {}}
              />
            </View>
          </View>

          <View style={styles.wrapperInput} >
            <TextInputCustom
              placeholder='Bank transfer'
              label='How is the money sent?'
              onChangeText={(value) => {}}
            />
          </View>

          <View style={ styles.wrapperInput } >
            <Paragraph variant='inputLabel1'>
              Card to transfer
            </Paragraph>

            <View style={styles.wrapperCardNumber} >
              <TextInputCustom
                stylesCustom={{
                  wrapper: styles.inputCardNumber
                }}
                keyboardType='phone-pad'
                placeholder='0000 0000 0000 0000'
                onChangeText={(value) => {}}
              />
              
              <TextInputCustom
                stylesCustom={{
                  wrapper: styles.inputCardNumberExpire
                }}
                placeholder='MM/AA'
                onChangeText={(value) => {}}
              />
              
              <TextInputCustom
                stylesCustom={{
                  wrapper: styles.inputCardNumberCVV
                }}
                placeholder='CVC'
                onChangeText={(value) => {}}
              />
            </View>
          </View>
          
          <View style={styles.wrapperInput} >
            <Paragraph variant='inputLabel1'>
              Summary
            </Paragraph>
            
            <View style={[
              styles.summary,
              { backgroundColor: theme.colors.backgroundApp2 }
            ]} >
              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Fee: {' '}
                  <Text style={{color: theme.colors.text2}} >100 USD</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Total: {' '}
                  <Text style={{color: theme.colors.text2}} >100 USD</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Recipient receives: {' '}
                  <Text style={{color: theme.colors.text2}} >4300 UYU</Text>
                </Fragment>
              </Paragraph>
            </View>
          </View>
        </View>

        <Button text='Next' onPress={next} />
      </ViewContainer>
    </ScrollView>
  )
}

export default MoneyToSend
