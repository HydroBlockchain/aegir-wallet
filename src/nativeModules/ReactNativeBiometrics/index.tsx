import { NativeModules } from 'react-native';
import { IsSensorAvailableResult, SimplePromptOptions, SimplePromptResult } from '../../interfaces/ReactNativeBiometrics';

const { ReactNativeBiometrics: bridge } = NativeModules;


class ReactNativeBiometrics {
  /**
   * Enum for touch id sensor type
  */
  #TouchID = 'TouchID';
  /**
   * Enum for face id sensor type
  */
  #FaceID = 'FaceID';
  /**
   * Enum for generic biometrics (this is the only value available on android)
  */
  #Biometrics = 'Biometrics';

  /**
   * Returns promise that resolves to an object with object.biometryType = Biometrics | TouchID | FaceID
   * @returns {Promise<Object>} Promise that resolves to an objectwith details about biometrics available
  */
  isSensorAvailable(): Promise<IsSensorAvailableResult> {
    return bridge.isSensorAvailable();
  }

  /**
    * Prompts user with biometrics dialog using the passed in prompt message and
    * returns promise that resolves to an object with object.success = true if the user passes,
    * object.success = false if the user cancels, and rejects if anything fails
    * @param {Object} simplePromptOptions
    * @param {string} simplePromptOptions.promptMessage
    * @param {string} simplePromptOptions.cancelButtonText (Android only)
    * @returns {Promise<Object>}  Promise that resolves an object with details about the biometrics result
  */
  simplePrompt(simplePromptOptions?: SimplePromptOptions): Promise<SimplePromptResult> {
    const options = simplePromptOptions || {};

    if(!options.cancelButtonText) {
      options.cancelButtonText = 'Cancel';
    }

    if(!options.promptDescription) {
      options.promptDescription = '';
    }

    if(!options.promptMessage) {
      options.promptMessage = 'Authenticate';
    }

    return bridge.simplePrompt(options);
  }

  getTouchID() {
    return this.#TouchID;
  }

  getFaceID() {
    return this.#FaceID;
  }

  getBiometrics() {
    return this.#Biometrics;
  }

};


export default new ReactNativeBiometrics();