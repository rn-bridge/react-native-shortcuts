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

export function multiply(a: number, b: number): Promise<number> {
	return RNShortcuts.multiply(a, b);
}
