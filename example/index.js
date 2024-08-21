import { Alert, AppRegistry } from 'react-native';
import { App } from './src/App';
import { name as appName } from './app.json';
import { Shortcuts } from '@rn-bridge/react-native-shortcuts';

const callback = (id) => {
  console.log('Shortcut Id:', id);
  if (id) {
    Alert.alert('Shortcut Detected', `App opened with shortcut id: ${id}`);
  }
};

Shortcuts.addOnShortcutUsedListener(callback);
Shortcuts.getInitialShortcutId().then(callback);

AppRegistry.registerComponent(appName, () => App);
