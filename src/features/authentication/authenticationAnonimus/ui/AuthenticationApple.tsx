/** @format */

import React from "react";
import { Button } from "react-native-paper";
import { ViewModel } from "../../../../shared/react-utils/ViewModel";
import { useAnonymouslyAuthentication } from "../libs/UseAnonymouslyAuthentication";
import { StyleProp, ViewStyle } from "react-native";

export const AuthenticationAnonymously = ViewModel<{ style: StyleProp<ViewStyle> },
	ReturnType<typeof useAnonymouslyAuthentication>>(
	useAnonymouslyAuthentication,
	({ buttonStyle, onAppleAuthentication, i18n, isLoading, errorMessage, style, appTheme }) => (
		<Button
			onPress={onAppleAuthentication}
			disabled={isLoading}
			style={[buttonStyle, style]}
			textColor={appTheme.colors.onPrimary}
		>
			{i18n.t("anonymouslyAuthentication")}
		</Button>
));
