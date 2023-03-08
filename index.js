/**
 * @format
 */
import "./shim";
import {AppRegistry} from 'react-native';
import 'react-native-get-random-values';
import App from './App';
import {name as appName} from './app.json';

console.log('##### :>> ', appName);

AppRegistry.registerComponent(appName, () => App);
