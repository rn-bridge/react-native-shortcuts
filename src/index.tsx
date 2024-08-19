import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@rn-bridge/react-native-shortcuts' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const RNShortcuts = NativeModules.RNShortcuts
  ? NativeModules.RNShortcuts
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        }
      }
    );

type shortcutType = {
  id: string;
  shortLabel: string;
  longLabel: string;
};

export async function addShortcut(params: shortcutType): Promise<boolean> {
  if (!params.id || !params.shortLabel || !params.longLabel) {
    return Promise.reject('Invalid request parameters');
  }
  return RNShortcuts.addShortcut(params);
}

export async function updateShortcut(params: shortcutType): Promise<boolean> {
  if (!params.id || !params.shortLabel || !params.longLabel) {
    return Promise.reject('Invalid request parameters');
  }
  return RNShortcuts.updateShortcut(params);
}

export async function removeShortcut(id: string): Promise<boolean> {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.removeShortcut(id);
}

export async function removeAllShortcuts(): Promise<boolean> {
  return RNShortcuts.removeAllShortcuts();
}

export async function getShortcutById(id: string): Promise<shortcutType> {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.getShortcutById(id);
}

export async function isShortcutExists(id: string): Promise<boolean> {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.isShortcutExists(id);
}

export function onShortcutUsed(callback: (id: string) => void) {
  return RNShortcuts.onShortcutUsed(callback);
}
