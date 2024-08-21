import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  type EventSubscription
} from 'react-native';

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

const nativeModule = Platform.OS === 'ios' ? NativeModules.RNShortcuts : null;
const shortcutsEventEmitter = new NativeEventEmitter(nativeModule);

interface shortcutResponseType {
  id: string;
  title: string;
  subTitle?: string;
  longLabel?: string;
}

interface shortcutParamsType extends shortcutResponseType {
  iconName?: string;
}

async function addShortcut(
  params: shortcutParamsType
): Promise<shortcutResponseType> {
  if (!params.id || !params.title) {
    return Promise.reject('Invalid request parameters');
  }

  return RNShortcuts.addShortcut(params);
}

async function updateShortcut(
  params: shortcutParamsType
): Promise<shortcutResponseType> {
  if (!params.id || !params.title) {
    return Promise.reject('Invalid request parameters');
  }

  return RNShortcuts.updateShortcut(params);
}

async function removeShortcut(id: string): Promise<boolean> {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.removeShortcut(id);
}

async function removeAllShortcuts(): Promise<boolean> {
  return RNShortcuts.removeAllShortcuts();
}

async function getShortcutById(id: string): Promise<shortcutResponseType> {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.getShortcutById(id);
}

async function isShortcutExists(id: string): Promise<boolean> {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.isShortcutExists(id);
}

async function isShortcutSupported(): Promise<boolean> {
  return RNShortcuts.isShortcutSupported();
}

async function getInitialShortcutId(): Promise<string> {
  return RNShortcuts.getInitialShortcutId();
}

function addOnShortcutUsedListener(
  callback: (id: string) => void
): EventSubscription {
  return shortcutsEventEmitter.addListener('onShortcutUsed', callback);
}

function removeOnShortcutUsedListener() {
  shortcutsEventEmitter.removeAllListeners('onShortcutUsed');
}

export const Shortcuts = {
  addShortcut,
  updateShortcut,
  removeShortcut,
  removeAllShortcuts,
  getShortcutById,
  isShortcutExists,
  isShortcutSupported,
  getInitialShortcutId,
  addOnShortcutUsedListener,
  removeOnShortcutUsedListener
};
