 /** @format */

import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Alert, Platform, UIManager, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import RootRoutes from "./routes";
import Store, { actions, useAppDispatch } from "./store";
import "./TaskManager";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import "./notification";
import Constants from "expo-constants";

import { adapty } from "react-native-adapty";
import { PaperProvider } from "react-native-paper";
import { appTheme } from "./app/AppTheme";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

GoogleSignin.configure({
	webClientId: "878799007977-cj3549ni87jre2rmg4eq0hiolp08igh2.apps.googleusercontent.com",
});

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}
const AppCore = () => {

	return (
		<PaperProvider theme={appTheme}>
		<SafeAreaProvider>
			<StatusBar backgroundColor={"#9765a8"} style={"light"} />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<NavigationContainer>
					<BottomSheetModalProvider>
					<RootRoutes />
					</BottomSheetModalProvider>
				</NavigationContainer>
			</GestureHandlerRootView>
		</SafeAreaProvider>
		</PaperProvider>
	);
};

export default () => (
	<Provider store={Store}>
		<AppCore />
	</Provider>
);
