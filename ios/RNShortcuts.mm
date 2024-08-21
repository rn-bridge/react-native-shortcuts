#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>
#import <UIKit/UIKit.h>

@interface RCT_EXTERN_MODULE(RNShortcuts, RCTEventEmitter)

RCT_EXTERN_METHOD(getInitialShortcutId:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isShortcutSupported:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(addShortcut:(NSDictionary *)params
                  withResolve:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(updateShortcut:(NSDictionary *)params
                  withResolve:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(removeShortcut:(NSString *)id
                  withResolve:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(removeAllShortcuts:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getShortcutById:(NSString *)id
                  withResolve:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(isShortcutExists:(NSString *)id
                  withResolve:(RCTPromiseResolveBlock)resolve
                  withReject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
    return NO;
}

@end
