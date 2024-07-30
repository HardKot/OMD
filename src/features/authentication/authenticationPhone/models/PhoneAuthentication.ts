import auth from "@react-native-firebase/auth";

export class PhoneAuthentication {
	async execute(phoneNumber: string) {
		const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
		return async (code: string) => {
			await confirmation.confirm(code)
		};
	}

}