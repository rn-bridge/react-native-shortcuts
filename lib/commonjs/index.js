"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package '@rn-bridge/react-native-shortcuts' doesn't seem to be linked. Make sure: \n\n` + _reactNative.Platform.select({
  ios: "- You have run 'pod install'\n",
  default: ''
}) + '- You rebuilt the app after installing the package\n' + '- You are not using Expo Go\n';
const RNShortcuts = _reactNative.NativeModules.RNShortcuts ? _reactNative.NativeModules.RNShortcuts : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const nativeModule = _reactNative.Platform.OS === 'ios' ? _reactNative.NativeModules.RNShortcuts : null;
const shortcutsEventEmitter = new _reactNative.NativeEventEmitter(nativeModule);
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
var _default = exports.default = {
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