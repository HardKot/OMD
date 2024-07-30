import * as ExpoAppleAuthentication from "expo-apple-authentication";
import auth from "@react-native-firebase/auth";

export class AppleAuthentication {
	async execute() {
		const appleAuthRequestResponse = await ExpoAppleAuthentication.signInAsync({
			requestedScopes: [
				ExpoAppleAuthentication.AppleAuthenticationScope.FULL_NAME,
				ExpoAppleAuthentication.AppleAuthenticationScope.EMAIL,
			],
		});
		const appleCredential = auth.AppleAuthProvider.credential(appleAuthRequestResponse.identityToken);
		const result = await auth().signInWithCredential(appleCredential);

		return result;
	}
}