[![npm](https://img.shields.io/npm/v/@rn-bridge/react-native-shortcuts.svg)](https://npmjs.com/@rn-bridge/react-native-shortcuts) [![React Native](https://img.shields.io/badge/React_Native-21232a?style=flat&logo=react&logoColor=0a7ea4&logoSize=small.svg)]() [![Android](https://img.shields.io/badge/Android-green?style=flat&logo=android&logoColor=white)]() [![iOS](https://img.shields.io/badge/iOS-21232a?style=flat&logo=ios&logoColor=white)]()

# @rn-bridge/react-native-shortcuts

Android Shortcuts and iOS Quick Actions are features that allow users to quickly access specific app functionalities directly from the home screen or app icon, enhancing user experience by providing fast access to common tasks.

Fully compatible with TypeScript.

## Supported platforms

| Platform  |  Support |
|---|---|
| iOS  |  ✅ |
| Android  |  ✅ |
| Web  |  ❌ |
| Windows  |  ❌ |
| macOS  |  ❌ |

## Installation

```sh
npm install @rn-bridge/react-native-shortcuts
```
or

```sh
yarn add @rn-bridge/react-native-shortcuts
```

## Setup

### iOS

Add the following code to your `AppDelegate.m`
```objective-c
#import "RNShortcuts.h"
```
```objective-c
- (void)application:(UIApplication *)application performActionForShortcutItem:(UIApplicationShortcutItem *)shortcutItem completionHandler:(void (^)(BOOL))completionHandler {
  [RNShortcuts performActionForShortcutItem:shortcutItem completionHandler:completionHandler];
}
```

### Android

No setup needed

## Summary

### Methods

* [`addShortcut`](#addShortcut)
* [`updateShortcut`](#updateShortcut)
* [`removeShortcut`](#removeShortcut)
* [`removeAllShortcuts`](#removeAllShortcuts)
* [`getShortcutById`](#getShortcutById)
* [`isShortcutExists`](#isShortcutExists)
* [`isShortcutSupported`](#isShortcutSupported)
* [`getInitialShortcutId`](#getInitialShortcutId)
* [`addOnShortcutUsedListener`](#addOnShortcutUsedListener)
* [`removeOnShortcutUsedListener`](#removeOnShortcutUsedListener)

---

## Usage

Import
```javascript
import Shortcuts from '@rn-bridge/react-native-shortcuts';
```

### isShortcutSupported
```javascript
const response = await Shortcuts.isShortcutSupported() // true or false
```
| Platform  |  Supported Version |
|---|---|
| iOS  |  >=9.0 |
| Android  |  >=7.1 (API Level 25) |

### addShortcut
```javascript
const response = await Shortcuts.addShortcut({
  id: "a426a46b-7389-431c-9ea8-8b370e0c65fc",
  title: "Open App",
  iconName: "app_shortcut"
})
```
Response:
```json
{
  "id": "a426a46b-7389-431c-9ea8-8b370e0c65fc",
  "title": "Open App"
}
```
Supported options:
|  Key               |  Platform     |  Required    |  Description |
|   ---              |     ---       |    ---       |     ---     |
| `id`               |     Both      |    Yes       | A required, app-specific string that you employ to identify the shortcut. |
| `title`            |     Both      |    Yes       | The required, user-visible title for the Home Screen shortcut. |
| `longLabel`        |     Android   |    No        |  An extended phrase that describes the shortcut's purpose. If there's enough space, the launcher displays this value instead of title. When possible, limit this long description to 25 characters. |
| `subtitle`         |     iOS       |    No        | The user-visible subtitle for the Home Screen dynamic quick action. |
| `iconName`         |     Both      |    No        |  The icon for the Home Screen shortcut. Icon name should be the name of your iOS asset or Android drawable. Refer [iOS](https://developer.apple.com/documentation/xcode/managing-assets-with-asset-catalogs) [Android](https://developer.android.com/studio/write/resource-manager) resource addition. |

### updateShortcut
```javascript
const response = await Shortcuts.updateShortcut({
  id: "a426a46b-7389-431c-9ea8-8b370e0c65fc",
  title: "Open App",
  iconName: "app_shortcut"
})
```
Response:
```json
{
  "id": "a426a46b-7389-431c-9ea8-8b370e0c65fc",
  "title": "Open App"
}
```
Supported options:
|  Key               |  Platform     |  Required    |  Description |
|   ---              |     ---       |    ---       |     ---     |
| `id`               |     Both      |    Yes       | The shortcut id which you want to update. |
| `title`            |     Both      |    Yes       | The required, user-visible title for the Home Screen shortcut. |
| `longLabel`        |     Android   |    No        |  An extended phrase that describes the shortcut's purpose. If there's enough space, the launcher displays this value instead of title. When possible, limit this long description to 25 characters. |
| `subtitle`         |     iOS       |    No        | The user-visible subtitle for the Home Screen dynamic quick action. |
| `iconName`         |     Both      |    No        |  The icon for the Home Screen shortcut. Icon name should be the name of your iOS asset or Android drawable. Refer [iOS](https://developer.apple.com/documentation/xcode/managing-assets-with-asset-catalogs) [Android](https://developer.android.com/studio/write/resource-manager) resource addition. |

### removeShortcut
```javascript
const response = await Shortcuts.removeShortcut("a426a46b-7389-431c-9ea8-8b370e0c65fc") // true or false
```
Supported options:
|  Key               |  Platform     |  Required    |  Description |
|   ---              |     ---       |    ---       |     ---     |
| `id`               |     Both      |    Yes       | The shortcut id which you want to remove. |

### removeAllShortcuts
```javascript
const response = await Shortcuts.removeAllShortcuts() // true or false
```

### isShortcutExists
```javascript
const response = await Shortcuts.isShortcutExists("a426a46b-7389-431c-9ea8-8b370e0c65fc") // true or false
```
Supported options:
|  Key               |  Platform     |  Required    |  Description |
|   ---              |     ---       |    ---       |     ---     |
| `id`               |     Both      |    Yes       | The shortcut id which you want to check. |

### getShortcutById
```javascript
const response = await Shortcuts.getShortcutById("a426a46b-7389-431c-9ea8-8b370e0c65fc") // true or false
```

Response:
```json
{
  "id": "a426a46b-7389-431c-9ea8-8b370e0c65fc",
  "title": "Open App",
  "longLable": "...",
  "subtitle": "..."
}
```
Supported options:
|  Key               |  Platform     |  Required    |  Description |
|   ---              |     ---       |    ---       |     ---     |
| `id`               |     Both      |    Yes       | The shortcut id which you want to get. |

### getInitialShortcutId
If the initial app launch was triggered by a shortcut, it will give the id of that shortcut, otherwise it will give null.
```javascript
const callback = (id) => {
  console.log('Shortcut Id:', id);
};

const id = await Shortcuts.getInitialShortcutId();
```

### addOnShortcutUsedListener
If the app is in background and the app is launchced by a shortcut, it will give the id of that shortcut.
```javascript
const callback = (id) => {
  console.log('Shortcut Id:', id);
};

Shortcuts.addOnShortcutUsedListener(callback);
```

### removeOnShortcutUsedListener
```javascript
Shortcuts.removeOnShortcutUsedListener();
```

## How To Run Example App ?

To run example app, follow the below steps

1. Clone the repository
2. Do `yarn install`
3. Next navigate to example folder i.e `cd example`
4. Do `yarn install`
5. Next navigate to ios folder i.e `cd ios` and do `pod install`, then `cd ..`
6. For android run `yarn android`
7. For ios run `yarn ios`
