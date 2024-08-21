#import <React/RCTBridgeModule.h>

@interface RNShortcuts : NSObject <RCTBridgeModule>
+(void) handleShortcutItem:(UIApplicationShortcutItem *) shortcutItem;
@end
