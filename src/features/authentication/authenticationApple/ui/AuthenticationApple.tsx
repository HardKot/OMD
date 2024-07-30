/** @format */

import React from "react";
import { Button } from "react-native-paper";
import { ViewModel } from "../../../../shared/react-utils/ViewModel";
import { useAppleAuthentication } from "../libs/UseAppleAuthentication";
import { StyleProp, ViewStyle } from "react-native";

export const AuthenticationApple = ViewModel<{ style: StyleProp<ViewStyle> },
	ReturnType<typeof useAppleAuthentication>>(
	useAppleAuthentication,
	({ buttonStyle, onAppleAuthentication, i18n, isLoading, errorMessage, style }) => (
		<Button
			onPress={onAppleAuthentication}
			disabled={isLoading}
			style={[buttonStyle, style]}
			icon={"Apple"}
		>
			{i18n.t("a9f1fa29-cd92-473f-ae6c-dd5429cf9e9a")}
		</Button>
));
