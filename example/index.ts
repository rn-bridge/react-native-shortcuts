import { AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { onShortcutUsed } from '@rn-bridge/react-native-shortcuts';

onShortcutUsed((id: string) => {
  console.log('Shortcut id: ', id);
});

AppRegistry.registerComponent(appName, () => App);
