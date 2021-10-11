import React, { useEffect, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Paragraph from '../Paragraph';
import { QrScannerProps } from './interfaces';
import styles from './styles';

const QrScanner = ({
  isShow = false,
  onSuccess = () => {},
  onClose = () => {},
  onError = () => {},
}: QrScannerProps) => {
  const [visible, setVisible] = useState(false);

  const handleSuccess = (e: {data: string}) => {
    onSuccess(e.data ?? '');

    handleClose();
  };

  const handleClose = () => {
    onClose();
    setVisible(false);
  };

  useEffect(() => {
    setVisible(Boolean(isShow));
  }, [isShow]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      style={styles.modal}>
      <View style={styles.modalView}>
        <QRCodeScanner
          onRead={handleSuccess}
          showMarker={true}
          
        //   topContent={<Paragraph variant="h3">QRCODE SCAN</Paragraph>}
          bottomContent={
            <TouchableOpacity
              onPress={handleClose}
              style={styles.buttonTouchable}>
              <Paragraph variant="subtitle2">Close</Paragraph>
            </TouchableOpacity>
          }
        />
      </View>
    </Modal>
  );
};

export default QrScanner;
