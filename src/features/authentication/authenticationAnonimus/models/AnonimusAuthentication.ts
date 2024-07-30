import auth from "@react-native-firebase/auth";

export class AnonymouslyAuthentication {
	async execute() {

		const result = await auth().signInAnonymously();

		return result;
	}
}