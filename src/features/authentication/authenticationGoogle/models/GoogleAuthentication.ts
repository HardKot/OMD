import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export class GoogleAuthentication {
	async execute() {
		const { idToken, serverAuthCode, user } = await GoogleSignin.signIn();
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);
		const result = await auth().signInWithCredential(googleCredential);

		return result;
	}
}