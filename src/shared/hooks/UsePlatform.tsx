import { Platform } from "react-native";

export const usePlatform = () => {
	return {
		isAndroid: Platform.OS === "android",
		isIos: Platform.OS === "ios",
	}
}