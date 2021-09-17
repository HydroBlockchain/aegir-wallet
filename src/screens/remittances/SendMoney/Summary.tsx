import React, { Fragment, useContext } from 'react'

import styles from './styles';
import { TabsProps } from './interfaces';
import { Text, View } from 'react-native';
import Button from '../../../components/Button';
import Paragraph from '../../../components/Paragraph';
import { ThemeContext } from '../../../hooks/useTheme';
import { ScrollView } from 'react-native-gesture-handler';
import RadioButton from '../../../components/RadioButton';
import ViewContainer from '../../../components/Layouts/ViewContainer';

const Summary = ({ next }: TabsProps) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <ScrollView>
      <ViewContainer>
        <View style={ styles.form } >
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
                  Money to send: {' '}
                  <Text style={{color: theme.colors.text2}} >100 USD</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Money to pay: {' '}
                  <Text style={{color: theme.colors.text2}} >100 USD</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Receive mode: {' '}
                  <Text style={{color: theme.colors.text2}} >Bank transfer</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Way to pay {' '}
                  <Text style={{color: theme.colors.text2}} >Bank transfer</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Time delay of the arrival of money to the destination: {' '}
                  <Text style={{color: theme.colors.text2}} >2 dais</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Transfer amount: {' '}
                  <Text style={{color: theme.colors.text2}} >4300 UYU</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Transfer fee: {' '}
                  <Text style={{color: theme.colors.text2}} >10 USD</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  IVA: {' '}
                  <Text style={{color: theme.colors.text2}} >100 UYU</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Transfer total: {' '}
                  <Text style={{color: theme.colors.text2}} >120 USD</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Amount money receives: {' '}
                  <Text style={{color: theme.colors.text2}} >4300 UYU</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Exchange rate: {' '}
                  <Text style={{color: theme.colors.text2}} >1 USD = 43 UYU</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Sender: {' '}
                  <Text style={{color: theme.colors.text2}} >Wade Warren</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Secret code: {' '}
                  <Text style={{color: theme.colors.text2}} >123456789</Text>
                </Fragment>
              </Paragraph>

              <Paragraph variant='inputLabel1' stylesCustom={styles.summaryText} >
                <Fragment>
                  Receiver: {' '}
                  <Text style={{color: theme.colors.text2}} >Jane Cooper</Text>
                </Fragment>
              </Paragraph>
            </View>

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

        <Button text='send' onPress={next} />
      </ViewContainer>
    </ScrollView>
  )
}

export default Summary
