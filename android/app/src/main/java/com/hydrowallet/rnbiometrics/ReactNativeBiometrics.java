package com.hydrowallet.rnbiometrics;

import android.os.Build;
import androidx.biometric.BiometricPrompt;
import androidx.biometric.BiometricManager;
import androidx.fragment.app.FragmentActivity;
import androidx.biometric.BiometricPrompt.PromptInfo;
import androidx.biometric.BiometricPrompt.AuthenticationCallback;

import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

import com.aegirwallet.BuildConfig;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

/* utils */
import timber.log.Timber;

public class ReactNativeBiometrics extends ReactContextBaseJavaModule {

	public ReactNativeBiometrics(ReactApplicationContext reactContext) {
		super(reactContext);
	}

	@Override
	public String getName() {
		return "ReactNativeBiometrics";
	}

	// Custom function that we are going to export to JS
	@ReactMethod
	public void getDeviceName(Callback cb) {
		try {
			cb.invoke(null, android.os.Build.MODEL);
		} catch (Exception e) {
			cb.invoke(e.toString(), null);
		}
	}

	@ReactMethod
	public void isSensorAvailable(Promise promise) {
		try {
			if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
				ReactApplicationContext reactApplicationContext = getReactApplicationContext();
				BiometricManager biometricManager = BiometricManager.from(reactApplicationContext);
				int canAuthenticate = biometricManager.canAuthenticate();

				if(canAuthenticate == BiometricManager.BIOMETRIC_SUCCESS) {
					WritableMap resultMap = new WritableNativeMap();
					resultMap.putBoolean("available", true);
					resultMap.putString("biometryType", "Biometrics");
					promise.resolve(resultMap);
				} else {
					WritableMap resultMap = new WritableNativeMap();
					resultMap.putBoolean("available", false);

					switch (canAuthenticate) {
						case BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE:
							resultMap.putString("error", "BIOMETRIC_ERROR_NO_HARDWARE");
							break;
						case BiometricManager.BIOMETRIC_ERROR_HW_UNAVAILABLE:
							resultMap.putString("error", "BIOMETRIC_ERROR_HW_UNAVAILABLE");
							break;
						case BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED:
							resultMap.putString("error", "BIOMETRIC_ERROR_NONE_ENROLLED");
							break;
					}

					promise.resolve(resultMap);
				}
			} else {
				WritableMap resultMap = new WritableNativeMap();
				resultMap.putBoolean("available", false);
				resultMap.putString("error", "Unsupported android version");
				promise.resolve(resultMap);
			}
		} catch (Exception e) {
			promise.reject("Error detecting biometrics availability: " + e.getMessage(),
					"Error detecting biometrics availability: " + e.getMessage());
		}
	}

	@ReactMethod
	public void simplePrompt(final ReadableMap params, final Promise promise) {
		if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
			UiThreadUtil.runOnUiThread(
					new Runnable() {
						@Override
						public void run() {
							try {
								String promptMessage = params.getString("promptMessage");
								String cancelButtomText = params.getString("cancelButtonText");
								String promptDescription = params.getString("promptDescription");

								AuthenticationCallback authCallback = new SimplePromptCallback(promise);
								FragmentActivity fragmentActivity = (FragmentActivity) getCurrentActivity();
								Executor executor = Executors.newSingleThreadExecutor();
								BiometricPrompt biometricPrompt = new BiometricPrompt(fragmentActivity, executor, authCallback);

								PromptInfo promptInfo = new PromptInfo.Builder()
										.setAllowedAuthenticators(
											BiometricManager.Authenticators.BIOMETRIC_STRONG
										)
										.setTitle(promptMessage)
										.setDescription(promptDescription)
										.setNegativeButtonText(cancelButtomText)
										.build();
								biometricPrompt.authenticate(promptInfo);
							} catch (Exception e) {
								promise.reject("Error displaying local biometric prompt: " + e.getMessage(),
										"Error displaying local biometric prompt: " + e.getMessage());
							}
						}
					});
		} else {
			promise.reject("Cannot display biometric prompt on android versions below 6.0",
					"Cannot display biometric prompt on android versions below 6.0");
		}
	}
}
