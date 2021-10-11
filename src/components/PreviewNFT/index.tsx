import React, {useContext} from 'react';

// styles
import styles from './styles';

// components
import Button from '../Button';
import Paragraph from '../Paragraph';
import {View, Image} from 'react-native';

// utils
import {PreviewNFTProps} from './interfaces';

// context
import {ThemeContext} from '../../hooks/useTheme';

const PreviewNFT = ({
  id = '',
  title = '',
  imageUrl = '',
  hiddenButton = false,
  onPressLeft = () => {},
  onPressRight = () => {}
}: PreviewNFTProps) => {
  const { theme, isLightTheme } = useContext(ThemeContext);

  return (
    <View
      style={[
        styles.body,
        {
          borderRadius: theme.roundness,
          backgroundColor: theme.colors.backgroundApp2,
        },
      ]}>
      <View style={[styles.cardBody]}>
        <View
          style={[
            styles.cardContainer,
            {
              borderRadius: theme.roundness,
              backgroundColor: theme.colors.backgroundApp,
            },
          ]}>
          {!Boolean(imageUrl) ? (
            <Paragraph
              variant="h1"
              stylesCustom={{ alignSelf: 'center', textAlign: 'center' }}
            >
              {`#${id}`}
            </Paragraph>
          ) : (
            <Image
              style={styles.cardImage}
              source={{ uri: imageUrl || '' }}
            />
          )}

          {Boolean(title) && (
            <Paragraph stylesCustom={styles.cardTitle} variant="subtitle2">
              {title ?? ''}
            </Paragraph>
          )}
        </View>
      </View>

        {(!hiddenButton) && (
          <View style={styles.buttons}>
            <View style={styles.buttonContainer}>
              <Button
                text="Send"
                onPress={onPressLeft}
                styleText={[
                  styles.buttonText,
                  { color: (isLightTheme) ? 'grey' : 'white' }
                ]}
                styleCustom={[
                  styles.button,
                  { backgroundColor: theme.colors.backgroundApp }
                ]}
              />
            </View>

            <View style={styles.buttonContainer}>
              <Button
                text="View"
                onPress={onPressRight}
                styleText={[
                  styles.buttonText,
                  { color: (isLightTheme) ? 'grey' : 'white' }
                ]}
                styleCustom={[
                  styles.button,
                  { backgroundColor: theme.colors.backgroundApp }
                ]}
              />
            </View>
          </View>
        )}
    </View>
  );
};

export default PreviewNFT;
