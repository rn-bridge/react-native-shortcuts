import Shortcuts, { type shortcutParamsType } from '../';
import { NativeModules } from 'react-native';

jest.mock('react-native', () => ({
  NativeModules: {
    RNShortcuts: {
      addShortcut: jest.fn(),
      updateShortcut: jest.fn(),
      removeShortcut: jest.fn(),
      removeAllShortcuts: jest.fn(),
      getShortcutById: jest.fn(),
      isShortcutExists: jest.fn(),
      isShortcutSupported: jest.fn(),
      getInitialShortcutId: jest.fn()
    }
  },
  NativeEventEmitter: jest.fn().mockImplementation(() => ({
    addListener: jest.fn(),
    removeAllListeners: jest.fn()
  })),
  Platform: {
    OS: 'ios',
    select: (obj: any) => obj.ios
  }
}));

describe('RNShortcuts', () => {
  const shortcutParams = {
    id: 'shortcut-1',
    title: 'Shortcut Title',
    subTitle: 'Subtitle',
    longLabel: 'Long Label',
    iconName: 'icon'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should add a shortcut with valid parameters', async () => {
    NativeModules.RNShortcuts.addShortcut.mockResolvedValue(shortcutParams);

    const result = await Shortcuts.addShortcut(shortcutParams);
    expect(result).toEqual(shortcutParams);
    expect(NativeModules.RNShortcuts.addShortcut).toHaveBeenCalledWith(
      shortcutParams
    );
  });

  test('should throw error if adding a shortcut with invalid parameters', async () => {
    await expect(
      Shortcuts.addShortcut({} as shortcutParamsType)
    ).rejects.toEqual('Invalid request parameters');
    expect(NativeModules.RNShortcuts.addShortcut).not.toHaveBeenCalled();
  });

  test('should update a shortcut with valid parameters', async () => {
    NativeModules.RNShortcuts.updateShortcut.mockResolvedValue(shortcutParams);

    const result = await Shortcuts.updateShortcut(shortcutParams);
    expect(result).toEqual(shortcutParams);
    expect(NativeModules.RNShortcuts.updateShortcut).toHaveBeenCalledWith(
      shortcutParams
    );
  });

  test('should throw error if updating a shortcut with invalid parameters', async () => {
    await expect(
      Shortcuts.updateShortcut({} as shortcutParamsType)
    ).rejects.toEqual('Invalid request parameters');
    expect(NativeModules.RNShortcuts.updateShortcut).not.toHaveBeenCalled();
  });

  test('should remove a shortcut with a valid id', async () => {
    NativeModules.RNShortcuts.removeShortcut.mockResolvedValue(true);

    const result = await Shortcuts.removeShortcut('shortcut-1');
    expect(result).toBe(true);
    expect(NativeModules.RNShortcuts.removeShortcut).toHaveBeenCalledWith(
      'shortcut-1'
    );
  });

  test('should throw error if removing a shortcut with an invalid id', async () => {
    await expect(Shortcuts.removeShortcut('')).rejects.toEqual('Invalid id');
    expect(NativeModules.RNShortcuts.removeShortcut).not.toHaveBeenCalled();
  });

  test('should remove all shortcuts', async () => {
    NativeModules.RNShortcuts.removeAllShortcuts.mockResolvedValue(true);

    const result = await Shortcuts.removeAllShortcuts();
    expect(result).toBe(true);
    expect(NativeModules.RNShortcuts.removeAllShortcuts).toHaveBeenCalled();
  });

  test('should get a shortcut by id', async () => {
    NativeModules.RNShortcuts.getShortcutById.mockResolvedValue(shortcutParams);

    const result = await Shortcuts.getShortcutById('shortcut-1');
    expect(result).toEqual(shortcutParams);
    expect(NativeModules.RNShortcuts.getShortcutById).toHaveBeenCalledWith(
      'shortcut-1'
    );
  });

  test('should throw error if getting a shortcut by invalid id', async () => {
    await expect(Shortcuts.getShortcutById('')).rejects.toEqual('Invalid id');
    expect(NativeModules.RNShortcuts.getShortcutById).not.toHaveBeenCalled();
  });

  test('should check if a shortcut exists', async () => {
    NativeModules.RNShortcuts.isShortcutExists.mockResolvedValue(true);

    const result = await Shortcuts.isShortcutExists('shortcut-1');
    expect(result).toBe(true);
    expect(NativeModules.RNShortcuts.isShortcutExists).toHaveBeenCalledWith(
      'shortcut-1'
    );
  });

  test('should throw error if checking shortcut existence with invalid id', async () => {
    await expect(Shortcuts.isShortcutExists('')).rejects.toEqual('Invalid id');
    expect(NativeModules.RNShortcuts.isShortcutExists).not.toHaveBeenCalled();
  });

  test('should check if shortcuts are supported', async () => {
    NativeModules.RNShortcuts.isShortcutSupported.mockResolvedValue(true);

    const result = await Shortcuts.isShortcutSupported();
    expect(result).toBe(true);
    expect(NativeModules.RNShortcuts.isShortcutSupported).toHaveBeenCalled();
  });

  test('should get initial shortcut id', async () => {
    NativeModules.RNShortcuts.getInitialShortcutId.mockResolvedValue(
      'shortcut-1'
    );

    const result = await Shortcuts.getInitialShortcutId();
    expect(result).toBe('shortcut-1');
    expect(NativeModules.RNShortcuts.getInitialShortcutId).toHaveBeenCalled();
  });
});
