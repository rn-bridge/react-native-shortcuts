import React
import UIKit

@objc(RNShortcuts)
class RNShortcuts: RCTEventEmitter {
    
    static var shortcutItem: UIApplicationShortcutItem?
    
    override func supportedEvents() -> [String]! {
        return ["ShortcutInteraction"]
    }
    
    @objc class func performActionForShortcutItem(_ shortcutItem: UIApplicationShortcutItem, completionHandler: @escaping (Bool) -> Void) {
        RNShortcuts.shortcutItem = shortcutItem
        completionHandler(true)
    }
    
    @objc(onShortcutUsed:)
    func onShortcutUsed(callback: @escaping RCTResponseSenderBlock ){
        DispatchQueue.main.async {
            let shortcutType = RNShortcuts.shortcutItem?.type ?? nil
            if shortcutType != nil {
                callback([shortcutType!])
                RNShortcuts.shortcutItem = nil
            }
        }
        
    }
    
    @objc(addShortcut:withResolve:withReject:)
    func addShortcut(params: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        
        guard let id = params["id"] as? String,
              let shortLabel = params["shortLabel"] as? String,
              let longLabel = params["longLabel"] as? String else {
            reject("Invalid", "Invalid parameters", NSError(domain: "addShortcut", code: 200))
            return
        }
        
        let shortcutItem = UIApplicationShortcutItem(
            type: id,
            localizedTitle: shortLabel,
            localizedSubtitle: longLabel,
            icon: nil,
            userInfo: nil
        )
        
        DispatchQueue.main.async {
            UIApplication.shared.shortcutItems?.append(shortcutItem)
            resolve(true)
        }
        
    }
    
    @objc(updateShortcut:withResolve:withReject:)
    func updateShortcut(params: NSDictionary, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        
        guard let id = params["id"] as? String,
              let shortLabel = params["shortLabel"] as? String,
              let longLabel = params["longLabel"] as? String else {
            reject("Invalid", "Invalid parameters", NSError(domain: "addShortcut", code: 200))
            return
        }
        
        let shortcutItem = UIApplicationShortcutItem(
            type: id,
            localizedTitle: shortLabel,
            localizedSubtitle: longLabel,
            icon: nil,
            userInfo: nil
        )
        
        DispatchQueue.main.async {
            let shortcutItems = UIApplication.shared.shortcutItems ?? []
            let index: Int? = shortcutItems.firstIndex { UIApplicationShortcutItem in
                UIApplicationShortcutItem.type == id
            }
            if(index == nil) {
                reject("Error", "No shortcut with the id: \(id)", NSError(domain: "updateShortcut", code: 200))
                return
            }
            UIApplication.shared.shortcutItems?.remove(at: index!)
            UIApplication.shared.shortcutItems?.append(shortcutItem)
            resolve(true)
        }
        
    }
    
    @objc(removeShortcut:withResolve:withReject:)
    func removeShortcut(id: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        
        DispatchQueue.main.async {
            let shortcutItems = UIApplication.shared.shortcutItems ?? []
            UIApplication.shared.shortcutItems = shortcutItems.filter { shortcut in shortcut.type != id }
            resolve(true)
        }
        
    }
    
    @objc(removeAllShortcuts:withReject:)
    func removeAllShortcuts(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        
        DispatchQueue.main.async {
            UIApplication.shared.shortcutItems = []
            resolve(true)
        }
        
    }
    
    @objc(getShortcutById:withResolve:withReject:)
    func getShortcutById(id: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        
        DispatchQueue.main.async {
            let shortcutItems = UIApplication.shared.shortcutItems ?? []
            let shortcut: UIApplicationShortcutItem? = shortcutItems.first { UIApplicationShortcutItem in
                UIApplicationShortcutItem.type == id
            }
            
            if shortcut == nil {
                resolve(nil)
                return
            }
            
            resolve(["id": shortcut?.type, "shortLabel": shortcut?.localizedTitle, "longLabel": shortcut?.localizedSubtitle])
            
        }
    }
    
    @objc(isShortcutExists:withResolve:withReject:)
    func isShortcutExists(id: String, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        
        DispatchQueue.main.async {
            let shortcutItems = UIApplication.shared.shortcutItems ?? []
            let shortcut: UIApplicationShortcutItem? = shortcutItems.first { UIApplicationShortcutItem in
                UIApplicationShortcutItem.type == id
            }
            
            resolve(shortcut != nil)
            
        }
    }
}
