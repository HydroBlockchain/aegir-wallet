import React, {useEffect, useState} from 'react';
import {Linking, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-root-toast';

import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

import Paragraph from '../Paragraph';
import {QrScannerProps} from './interfaces';
import styles from './styles';

const requesPermission = () => {
  Toast.show('You need give permission to the camera', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor: 'red',
    opacity: 0.5,
  });
  setTimeout(async () => {
    await Linking.openSettings();
  }, 2500);
};

const QrScanner = ({
  isShow = false,
  onSuccess = () => {},
  onClose = () => {},
  onError = () => {},
}: QrScannerProps) => {
  const [visible, setVisible] = useState(false);
  const [displayTitle, setDisplaytitle] = useState(true);
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();

      console.log('cameraPermission :>> ', cameraPermission);

      cameraPermission === 'authorized' && setHasPermission(true);

      cameraPermission === 'not-determined' &&
        (await Camera.requestCameraPermission());
      console.log(
        'Agregar un modal derivando a la configuracion de la app para pedir permiso para usar la camera',
      );
      cameraPermission === 'denied' && requesPermission();
      // console.log('cameraPermission', cameraPermission);
    };
    getPermission();
  }, []);

  useEffect(() => {
    !!barcodes.length &&
      barcodes.map(barcode => {
        !!barcode.displayValue && handleSuccess({data: barcode.displayValue});
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [barcodes]);

  const handleSuccess = (e: {data: string}) => {
    onSuccess(e.data ?? '');

    handleClose();
  };

  const handleClose = () => {
    setDisplaytitle(false);

    setTimeout(() => {
      onClose();
      setVisible(false);
    }, 1);
  };

  useEffect(() => {
    const getPermission = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      console.log(
        'const cameraPermission = await Camera.getCameraPermissionStatus();',
        cameraPermission,
      );
      cameraPermission === 'denied' && requesPermission();

      (await Camera.getCameraPermissionStatus()) === 'authorized' &&
        setHasPermission(true);
    };

    setDisplaytitle(true);
    setVisible(Boolean(isShow));
    getPermission();
  }, [isShow]);

  return (
    device != null &&
    hasPermission && (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        style={styles.modal}>
        <View style={styles.modalView}>
          <Camera
            style={[StyleSheet.absoluteFill, {height: '100%'}]}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
          {displayTitle && (
            <>
              <TouchableOpacity onPress={() => {}} style={{top: -200}}>
                <Paragraph variant="h3">QRCODE SCAN</Paragraph>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleClose}
                style={styles.buttonTouchable}>
                <Paragraph variant="subtitle2">X Close</Paragraph>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    )
  );
};

export default QrScanner;
