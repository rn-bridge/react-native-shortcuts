import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import {
  addShortcut,
  getShortcutById,
  isShortcutExists,
  onShortcutUsed,
  removeAllShortcuts,
  removeShortcut
} from '@rn-bridge/react-native-shortcuts';
import React from 'react';

const Button = ({
  title,
  style = {},
  textStyle = {},
  onPress
}: {
  title: string;
  style: any;
  textStyle: any;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export const App = () => {
  React.useEffect(() => {
    onShortcutUsed((id: string) => {
      console.log('Shortcut id: ', id);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Add Shortcut"
        onPress={async () => {
          addShortcut({
            id: 'open',
            shortLabel: 'Open',
            longLabel: 'Open App'
          })
            .then(() => Alert.alert('', 'Success'))
            .catch((err) => Alert.alert('', err));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Update Shortcut"
        onPress={async () => {
          addShortcut({
            id: 'open',
            shortLabel: 'Open App',
            longLabel: 'Open Application'
          })
            .then(() => Alert.alert('', 'Success'))
            .catch((err) => Alert.alert('', err));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Remove Shortcut"
        onPress={async () => {
          removeShortcut('open')
            .then(() => Alert.alert('', 'Success'))
            .catch((err) => Alert.alert('', err));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Remove All Shortcuts"
        onPress={async () => {
          removeAllShortcuts()
            .then(() => Alert.alert('', 'Success'))
            .catch((err) => Alert.alert('', err));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Is Shortcut Exists"
        onPress={async () => {
          isShortcutExists('open')
            .then((response) => Alert.alert('', JSON.stringify(response)))
            .catch((err) => Alert.alert('', err));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Get Shortcut"
        onPress={async () => {
          getShortcutById('open')
            .then((response) => Alert.alert('', JSON.stringify(response)))
            .catch((err) => Alert.alert('', err));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'black',
    width: 300,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  textStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500'
  }
});
