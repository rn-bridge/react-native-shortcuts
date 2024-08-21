import { type EventSubscription } from 'react-native';
interface shortcutResponseType {
    id: string;
    title: string;
    subTitle?: string;
    longLabel?: string;
}
interface shortcutParamsType extends shortcutResponseType {
    iconName?: string;
}
declare function addShortcut(params: shortcutParamsType): Promise<shortcutResponseType>;
declare function updateShortcut(params: shortcutParamsType): Promise<shortcutResponseType>;
declare function removeShortcut(id: string): Promise<boolean>;
declare function removeAllShortcuts(): Promise<boolean>;
declare function getShortcutById(id: string): Promise<shortcutResponseType>;
declare function isShortcutExists(id: string): Promise<boolean>;
declare function isShortcutSupported(): Promise<boolean>;
declare function getInitialShortcutId(): Promise<string>;
declare function addOnShortcutUsedListener(callback: (id: string) => void): EventSubscription;
declare function removeOnShortcutUsedListener(): void;
export declare const Shortcuts: {
    addShortcut: typeof addShortcut;
    updateShortcut: typeof updateShortcut;
    removeShortcut: typeof removeShortcut;
    removeAllShortcuts: typeof removeAllShortcuts;
    getShortcutById: typeof getShortcutById;
    isShortcutExists: typeof isShortcutExists;
    isShortcutSupported: typeof isShortcutSupported;
    getInitialShortcutId: typeof getInitialShortcutId;
    addOnShortcutUsedListener: typeof addOnShortcutUsedListener;
    removeOnShortcutUsedListener: typeof removeOnShortcutUsedListener;
};
export {};
//# sourceMappingURL=index.d.ts.map