import { I18nAppProvider } from "@/app/providers/I18nAppProvider";
import { ThemeAppProvider } from "@/app/providers/ThemeAppProvider";

import { appTheme, appDarkTheme } from "./AppTheme"
import { AuthAppProvider } from "@/app/providers/AuthAppProvider";
import React from "react";
import { StoreAppProvider } from "@/app/providers/StoreAppProvider";
import { LoadingAppProvider } from "@/app/providers/LoadingAppProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { rootReducer } from "@/app/BuildStore";

export const ProviderCombine = () => (
	<LoadingAppProvider initModuleName={['store', 'i18n', 'theme', 'auth']}>
		<StoreAppProvider reducer={rootReducer}>
			<I18nAppProvider defaultLanguage={'ru-Ru'}>
				<ThemeAppProvider theme={appTheme} darkTheme={appDarkTheme}>
					<SafeAreaProvider>
						<GestureHandlerRootView>
							<BottomSheetModalProvider>
								<NavigationContainer>
									<AuthAppProvider NoAuthStack={<></>} AuthStack={<></>}/>
								</NavigationContainer>
							</BottomSheetModalProvider >
						</GestureHandlerRootView>
					</SafeAreaProvider>
				</ThemeAppProvider>
			</I18nAppProvider>
		</StoreAppProvider>
	</LoadingAppProvider>
)