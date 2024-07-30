import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { StyleSheet, View, ViewStyle, TextInput as TextInputVanil } from "react-native";
import { TextInput } from "react-native-paper";
import Tools from "~core";

const countCode = 6;
const keyList = [0, 1, 2, 3, 4, 5];


interface SMSCodeInputProperties {
	onChange?: (code: string) => void;
	onEndInput?: (code: string) => void;
	style?: ViewStyle;
	autoFocus?: boolean;
	disable?: boolean;
}

interface SMSCodeInputReference {
	clear: () => void;
}

const styles = StyleSheet.create({
	codeInputBackground: {
		flexDirection: "row",
	},
	codeInputTextStyle: {
		fontSize: 24,
		height: 48,
		width: 48,
		marginHorizontal: 3,
	},
	timerText: {
		fontSize: 13,
		...Tools.gStyle.font("600"),
	},
	textPlaceHolder: {
		color: "#E7DDEC",
		fontSize: 13,
		...Tools.gStyle.font("400"),
	},
	timerBackground: {
		alignItems: "center",
	},
});


export const SMSCodeInput = forwardRef<SMSCodeInputReference, SMSCodeInputProperties>((properties, reference) => {
	const { autoFocus = false, onChange, onEndInput = () => {}, style, disable = false } = properties;
	const referenceList = keyList.map(() => useRef<TextInputVanil>(null));
	const [code, setCode] = useState<string>("");

	const inputCode = (codePart: string, key: number) => {
		const isLast = key == countCode - 1;
		if (code.length == key) {
			setCode(code + codePart);
		} else {
			setCode(code.slice(0, key) + codePart + (isLast ? "" : code.slice(key + 1)));
		}
		if (onChange) onChange(codePart);
	};

	useEffect(() => {
		if (code.length == countCode) {
			onEndInput(code);
			referenceList[countCode - 1].current?.blur();
		} else {
			referenceList[code.length].current?.focus();
		}
	}, [code]);

	const focusTextInput = () => {
		referenceList[code.length == countCode ? countCode - 1 : code.length].current?.focus();
	};

	const clearAll = () => {
		for (const textInput of referenceList) textInput.current?.clear();
		referenceList[0].current?.focus();
	};

	const clear = () => {
		if (code.length > 0) {
			referenceList[code.length - 1].current?.clear();
			setCode(code.slice(0, -1));
		}
	};

	useImperativeHandle(reference, () => ({
		clear: clearAll,
	}));

	return (
		<View style={[styles.codeInputBackground, style]}>
			{keyList.map(key => (
				<TextInput
					mode={"flat"}
					key={`SMSCodeKey_${key}`}
					ref={referenceList[key]}
					style={[
						styles.codeInputTextStyle,
						key == 0 ? { marginLeft: 0 } : key == keyList.length - 1 ? { marginRight: 0 } : null,
					]}
					maxLength={1}
					autoCorrect={false}
					keyboardType={"numeric"}
					returnKeyType={"next"}
					contextMenuHidden={false}
					caretHidden={true}
					onFocus={focusTextInput}
					onChangeText={text => inputCode(text, key)}
					autoFocus={key == 0 && autoFocus}
					onKeyPress={({ nativeEvent }) => {
						if (nativeEvent.key == "Backspace") {
							clear();
						}
					}}
					editable={!disable}
					// textAlign={'center'}
				/>
			))}
		</View>
	);
});
