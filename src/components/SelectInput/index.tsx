import React, { useContext, useEffect, useState } from 'react'
import { FlatList, TouchableHighlight, View } from 'react-native';

import styles from './style';
import Modal from 'react-native-modal';
import Paragraph from '../Paragraph/index';
import TextInputCustom from '../TextInput/index';
import { ThemeContext } from '../../hooks/useTheme';
import { ISelectInput, IOption } from '../../interfaces/Iinput';
import IconFeather from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

const SelectInput = ({
  label = '',
  options = [],
  placeholder = '',
  onChange = () => {},
  selectedDefault = null,
}: ISelectInput) => {
  const { theme } = useContext(ThemeContext);
  const [ isModalVisible, setModalVisible ] = useState(false);
  const [ selectedIndex, setSelectedIndex ] = useState<null | number>(null);

  useEffect(() => {
    if(selectedDefault) {
      const index = options.findIndex(el => el.id === selectedDefault.id);

      if(index !== -1) {
        setSelectedIndex(index);
        onChange(selectedDefault);
      }
    }
  }, [ selectedDefault ])

  const toggleModal = () => {
    setModalVisible((prevState) => !prevState);
  }

  const onPressItem = ({ item, index }: {item: IOption, index: number}) => {
    try {
      if(item.onPress && typeof item.onPress === 'function') {
        item.onPress();
      }
    } catch(e) {}
    setSelectedIndex(index);
    onChange(item);
    toggleModal();
  }

  const renderItem = ({ item, index, separators }) => {
    return(
      <TouchableHighlight
        key={item.id}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        onPress={() => onPressItem({ item, index })}
      >
        <View style={styles.listItem} >
          <Paragraph variant='caption'>{item.title}</Paragraph>
          {(selectedIndex === index) ? (
            <IconFeather color={theme.colors.success} name='check' size={20} />
          ) : null}
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

  const keyExtractor = (item: any) => item.id;

  return (
    <View>
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor="none"
        onPress={toggleModal}
      >
        <TextInputCustom
          label={label}
          editable={false}
          icon='caret-down'
          onIconClick={toggleModal}
          placeholder={placeholder}
          iconStyle={styles.iconStyle}
          value={(selectedIndex !== null) ? options[selectedIndex].title : ''}
        />
      </TouchableHighlight>

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
            data={options}
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

export default SelectInput
