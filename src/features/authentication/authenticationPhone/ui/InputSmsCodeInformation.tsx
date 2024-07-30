import React, { FC, useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, View, ViewStyle } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import i18n from "../../../../app/I18n";


export enum SMSCodeInputInfoShow {
	loadingIndicator,
	requestSMS,
}


interface SMSCodeInputInfoProperties {
	status: SMSCodeInputInfoShow;
	onPress?: () => void;
	style?: ViewStyle;
	seconds?: number;
}

const styles = StyleSheet.create({

	timerText: {
		fontSize: 13,
	},
	textPlaceHolder: {
		fontSize: 13,
	},
	timerBackground: {
		alignItems: "center",
	},
});

export const SMSCodeInputInformation = (properties:SMSCodeInputInfoProperties)  => {
	const { status, onPress, style, seconds = 60 } = properties;
	const [timerSeconds, setTimerSeconds] = useState<number>(seconds);
	const [timerID, setTimerID] = useState<NodeJS.Timeout | null>(null);

	const lastSeconds = useMemo<string>(() => {
		const second = timerSeconds % 60;
		return second < 10 ? `0${second}` : second.toString();
	}, [timerSeconds]);

	const lastMinutes = useMemo<string>(() => {
		const minute = Math.floor(timerSeconds / 60);
		return minute < 10 ? `0${minute}` : minute.toString();
	}, [Math.floor(timerSeconds)]);

	const stopTimer = () => {
		if (timerID != null) {
			clearTimeout(timerID);
			setTimerID(null);
		}
	};

	const timer = (second_: number) => {
		setTimerSeconds(second_);
		if (second_ > 0) {
			setTimerID(setTimeout(timer, 1000, second_ - 1));
		} else {
			stopTimer();
		}
	};

	const startTimer = () => {
		if (timerID == null) timer(seconds);
	};


	useEffect(() => {
		if (status == SMSCodeInputInfoShow.loadingIndicator) {
			stopTimer();
		} else {
			startTimer();
		}
	}, [status]);

	switch (status) {
		case SMSCodeInputInfoShow.loadingIndicator: {
			return <ActivityIndicator style={style} />;
		}
		case SMSCodeInputInfoShow.requestSMS: {
			return timerSeconds == 0 ? (
					<Pressable onPress={onPress} style={style}>
						<Text style={styles.timerText}>{i18n.t("2f46f68f-1684-45e3-8e90-391b25bcbcba")}</Text>
					</Pressable>
				) : (
					<View style={[styles.timerBackground, style]}>
						<Text style={styles.textPlaceHolder}>{i18n.t("70baccaa-b4de-4f71-8221-f5f16200887f")}</Text>
						<Text style={styles.timerText}>{`${lastMinutes}:${lastSeconds}`}</Text>
					</View>
				);
		}
	}
};

