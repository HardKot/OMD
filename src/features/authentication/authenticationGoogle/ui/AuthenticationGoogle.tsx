/** @format */

import React from "react";
import { Button } from "react-native-paper";
import { ViewModel } from "../../../../shared/react-utils/ViewModel";
import { useGoogleAuthentication } from "../libs/UseGoogleAuthentication";
import { StyleProp, ViewStyle } from "react-native";

export const AuthenticationGoogle = ViewModel<
	{ style: StyleProp<ViewStyle> },
	ReturnType<typeof useGoogleAuthentication>
>(useGoogleAuthentication, ({ buttonStyle, onGoogleAuthentication, i18n, isLoading, errorMessage, style }) => (
	<Button
		onPress={onGoogleAuthentication}
		disabled={isLoading}
		style={[buttonStyle, style]}
		icon={"google"}
		mode={"contained"}
	>
		{i18n.t("235a94d8-5deb-460a-bf03-e0e30e93df1b")}
	</Button>
));
