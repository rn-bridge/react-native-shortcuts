"use strict";

import { NativeModules, Platform, NativeEventEmitter } from 'react-native';
const LINKING_ERROR = `The package '@rn-bridge/react-native-shortcuts' doesn't seem to be linked. Make sure: \n\n` + Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const RNShortcuts = NativeModules.RNShortcuts ? NativeModules.RNShortcuts : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const nativeModule = Platform.OS === 'ios' ? NativeModules.RNShortcuts : null;
const shortcutsEventEmitter = new NativeEventEmitter(nativeModule);
async function addShortcut(params) {
  if (!params.id || !params.title) {
    return Promise.reject('Invalid request parameters');
  }
  return RNShortcuts.addShortcut(params);
}
async function updateShortcut(params) {
  if (!params.id || !params.title) {
    return Promise.reject('Invalid request parameters');
  }
  return RNShortcuts.updateShortcut(params);
}
async function removeShortcut(id) {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.removeShortcut(id);
}
async function removeAllShortcuts() {
  return RNShortcuts.removeAllShortcuts();
}
async function getShortcutById(id) {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.getShortcutById(id);
}
async function isShortcutExists(id) {
  if (!id) {
    return Promise.reject('Invalid id');
  }
  return RNShortcuts.isShortcutExists(id);
}
async function isShortcutSupported() {
  return RNShortcuts.isShortcutSupported();
}
async function getInitialShortcutId() {
  return RNShortcuts.getInitialShortcutId();
}
function addOnShortcutUsedListener(callback) {
  return shortcutsEventEmitter.addListener('onShortcutUsed', callback);
}
function removeOnShortcutUsedListener() {
  shortcutsEventEmitter.removeAllListeners('onShortcutUsed');
}
export default {
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
//# sourceMappingURL=index.js.map