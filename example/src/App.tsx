import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import Shortcuts from '@rn-bridge/react-native-shortcuts';

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

const id = 'a426a46b-7389-431c-9ea8-8b370e0c65fc';
const title = 'Open App (Shortcut)';
const iconName = 'app_shortcut';

export const App = () => {
  return (
    <View style={styles.container}>
      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Add Shortcut"
        onPress={async () => {
          Shortcuts.addShortcut({
            id,
            title,
            iconName
          })
            .then((response) =>
              Alert.alert(
                'Success',
                `id: ${response.id}\ntitle: ${response.title}`
              )
            )
            .catch((err) => Alert.alert('Error', err.message));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Update Shortcut"
        onPress={async () => {
          Shortcuts.updateShortcut({
            id,
            title: 'Open App'
          })
            .then((response) =>
              Alert.alert(
                'Success',
                `id: ${response.id}\ntitle: ${response.title}`
              )
            )
            .catch((err) => Alert.alert('Error', err.message));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Remove Shortcut"
        onPress={async () => {
          Shortcuts.removeShortcut(id)
            .then(() => Alert.alert('Success', `Successfully removed ${id}`))
            .catch((err) => Alert.alert('Error', err.message));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Remove All Shortcuts"
        onPress={async () => {
          Shortcuts.removeAllShortcuts()
            .then(() => Alert.alert('Success', 'Removed all shortcuts'))
            .catch((err) => Alert.alert('Error', err.message));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Is Shortcut Exists"
        onPress={async () => {
          Shortcuts.isShortcutExists(id)
            .then((response) =>
              Alert.alert(
                '',
                response
                  ? 'Shortcut exists!!'
                  : `Shortcut not registered with id ${id}`
              )
            )
            .catch((err) => Alert.alert('Error', err.message));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Get Shortcut"
        onPress={async () => {
          Shortcuts.getShortcutById(id)
            .then((response) => {
              if (response) {
                Alert.alert(
                  'Success',
                  `id: ${response.id}\ntitle: ${response.title}`
                );
              } else {
                Alert.alert('Error', `Shortcut not registered with id ${id}`);
              }
            })
            .catch((err) => Alert.alert('Error', err.message));
        }}
      />

      <Button
        textStyle={styles.textStyle}
        style={styles.button}
        title="Is Supported"
        onPress={async () => {
          Shortcuts.isShortcutSupported().then((response) =>
            Alert.alert('Supported', JSON.stringify(response))
          );
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
