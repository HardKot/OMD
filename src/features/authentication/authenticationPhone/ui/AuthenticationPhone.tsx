/** @format */

import React from "react";

// import { TextInput } from "react-native"

import { Button, TextInput } from "react-native-paper";
import { ViewModel } from "../../../../shared/react-utils/ViewModel";
import { usePhoneAuthentication } from "../libs/UsePhoneAuthentication";
import { StyleProp, View, ViewStyle } from "react-native";
import TextInputMask from "react-native-text-input-mask";
import { SMSCodeInput } from "./InputSmsCode";
import { SMSCodeInputInformation } from "./InputSmsCodeInformation";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";

export const 	 AuthenticationPhone = ViewModel<{ style: StyleProp<ViewStyle> }, ReturnType<typeof usePhoneAuthentication>>(
	usePhoneAuthentication,
	({
		onPhoneAuthentication,
		setPhone,
		handleOnFocus,
		handleOnBlur,
		setCode,
		onCodeConfirmation,
		showCodeInput,
		i18n,
		isLoading,
		endedSmsCode,
		setEndedSmsCode,
		smsStatus,
		style,
	}) => (
		<View style={style}>
			<TextInput
				label={i18n.t("c44c1286-2e08-4c18-ac68-4bae712c26a8")}
				editable={!showCodeInput}
				mode={"flat"}
				render={({ ref, ...properties }) => (
					<TextInputMask
						{...properties}
						onChangeText={(_, extracted) => {
							if (extracted) setPhone("+7" + extracted);
						}}
						mask={"([000]) [000]-[00]-[00]"}
					/>
				)}
				left={<TextInput.Affix text={"+7"} />}
				onFocus={handleOnFocus}
				onBlur={handleOnBlur}
			/>
			{showCodeInput && (
				<Animated.View style={{ alignItems: 'center', marginTop: 12 }} entering={FadeIn}>
					<SMSCodeInput
						onChange={setCode}
						onEndInput={(code) => setEndedSmsCode(code.length === 6)}
					/>
					<SMSCodeInputInformation status={smsStatus} onPress={onPhoneAuthentication} style={{ marginTop: 12 }} seconds={120}/>
				</Animated.View>

			)}
			<Animated.View
				style={{ marginTop: 12 }}
				layout={LinearTransition}
			>
				<Button
					onPress={showCodeInput ? onCodeConfirmation : onPhoneAuthentication}
					disabled={isLoading || (showCodeInput && !endedSmsCode)}
					mode={"contained"}
				>
					{i18n.t("continue")}
				</Button>
			</Animated.View>

		</View>
	)
);
