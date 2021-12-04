#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <Expo/Expo.h>

// @interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>
@interface AppDelegate : EXAppDelegateWrapper <RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
