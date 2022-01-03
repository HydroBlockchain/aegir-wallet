import BackgroundTimer from 'react-native-background-timer';
import { AppState, AppStateStatus, NativeEventSubscription } from 'react-native';
import { IlockManagerConstructor, Inavigation } from '../interfaces/IlockManager';

export default class LockManager {
  lockTimer: any;
  lockTime: number;
  navigation: Inavigation;
  appState: AppStateStatus;
  appStateEvent: NativeEventSubscription;
  
  constructor({ navigation, lockTime }: IlockManagerConstructor) {
    this.lockTime = lockTime;
		this.appState = 'active';
		this.navigation = navigation;
		this.appStateEvent = AppState.addEventListener('change', this.handleAppStateChange);
	}

  updateLockTime(lockTime: number) {
		this.lockTime = lockTime;
	}

  handleAppStateChange = async (nextAppState: AppStateStatus) => {
    // Don't auto-lock
		if(this.lockTime === -1) {
			return;
		}
    
    if(nextAppState !== 'active') {
			// Auto-lock immediately
			if (this.lockTime === 0) {
				this.lockApp();
			} else {
				// Autolock after some time
				this.lockTimer = BackgroundTimer.setTimeout(() => {
					if (this.lockTimer) {
						this.lockApp();
					}
				}, this.lockTime);
			}
		} else if(this.appState !== 'active' && nextAppState === 'active') {
			this.clearTimeout()
		}

		this.appState = nextAppState;
  }

  clearTimeout() {
    // Prevent locking since it didnt reach the time threshold
    if(this.lockTimer) {
      BackgroundTimer.clearTimeout(this.lockTimer);
      this.lockTimer = null;
    }
  }

  lockApp = async () => {
    this.clearTimeout();
    this.gotoLockScreen();
  }

  gotoLockScreen = () => {
		this.navigation.replace('LockApp');
	};

  stopListening() {
    this.clearTimeout();
		this.appStateEvent.remove();
	}
}