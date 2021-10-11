import React, { useContext, useState } from 'react'
import { FlatList, TouchableHighlight, View } from 'react-native';

import styles from './styles';
import Button from '../Button';
import Modal from 'react-native-modal';
import Paragraph from '../Paragraph/index';
import { ThemeContext } from '../../hooks/useTheme';
import { renderShortAddress } from '../../libs/address';
import { SafeAreaView } from 'react-native-safe-area-context';
import { IcontactsModal, IContactData } from '../../interfaces/IContacts';

const ContactsModal = ({ data = [], onChange = () => {} }: IcontactsModal) => {
  const { theme } = useContext(ThemeContext);
  const [ isModalVisible, setModalVisible ] = useState(false);

  const toggleModal = () => {
    setModalVisible((prevState) => !prevState);
  }

  const onPressItem = ({ item }: { item: IContactData }) => {
    onChange(item);
    toggleModal();
  }

  const renderItem = ({ item, index, separators }) => {
    const { name, address }  = item;

    return(
      <TouchableHighlight
        key={index}
        onPress={() => onPressItem({ item })}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
      >
        <View style={styles.listItem}>
          <Paragraph variant='caption'>
            {(name?.lenght >= 20) ? `${name?.substr(0, 20)}...` : name}
          </Paragraph>

          <Paragraph variant='caption'>
            {renderShortAddress(address, 10)}
          </Paragraph>
        </View>
      </TouchableHighlight>
    );
  }

  const renderSeparator = () => {
    return( <View style={styles.separator} /> );
  }

  const renderListEmptyComponent = ()  => {
    return(
      <View style={styles.emptyDataWrapper}>
        <Paragraph variant='body1'>No data to select</Paragraph>
      </View>
    );
  }

  const keyExtractor = (item: any, index: number) => (`${item.address}_${index}`);

  return (
    <View>
      <Button
        variant='grey'
        text='Contacts'
        onPress={toggleModal}
      />
      <Modal
        propagateSwipe
        swipeDirection='down'
        isVisible={isModalVisible}
        style={styles.bottomModal}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        onBackButtonPress={toggleModal}
      >
        <SafeAreaView style={[
          styles.safeAreaView,
          { backgroundColor: theme.colors.backgroundApp }
        ]} >
          <View style={styles.titleWrapper}>
            <View style={styles.dragger}/>
          </View>

          <FlatList
            data={data}
            renderItem={renderItem}
            style={styles.flatlist}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderListEmptyComponent}
          />
        </SafeAreaView>
      </Modal>
    </View>
  )
}

export default ContactsModal
