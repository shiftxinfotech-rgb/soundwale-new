/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {AppWrapper} from './src/core';

AppRegistry.registerComponent(appName, () => AppWrapper);
