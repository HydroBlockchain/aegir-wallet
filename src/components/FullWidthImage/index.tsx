import React, { useState } from 'react';
import { Image, LayoutChangeEvent, View } from 'react-native';
import { IfullWidthImage } from '../../interfaces/ComponentInterface';

const FullWidthImage = ({ ratio, source, widthWrapper, style = {} }: IfullWidthImage) => {
  const [ state, setState ] = useState({
    width: 0,
    height: 0,
  });

  const onLayout = (event: LayoutChangeEvent) => {
    const containerWidth = event.nativeEvent.layout.width;

    if (ratio) {
      setState({
        width: containerWidth,
        height: containerWidth * ratio
      });
    } else if (typeof source === 'number') {
      const assetSource = Image.resolveAssetSource(source);

      setState({
        width: containerWidth,
        height: containerWidth * assetSource.height / assetSource.width
      });
    } else if (typeof source === 'object') {
      Image.getSize(source.uri, (width, height) => {
        setState({
          width: containerWidth,
          height: containerWidth * height / width
        });
      });
    }
  }
  
  return (
    <View style={{ width: widthWrapper || 'auto' }} onLayout={onLayout}>
      <Image
        source={source}
        resizeMode='contain'
        style={[ state, style ]}
      />
    </View>
  );
}

export default FullWidthImage;