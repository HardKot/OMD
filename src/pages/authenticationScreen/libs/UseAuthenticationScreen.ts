import { usePlatform } from "@/shared/hooks/UsePlatform";
import { useDimensions } from "@react-native-community/hooks";
import { useStyle } from "@/shared/hooks/UseStyle";
import { useCallback, useMemo, useRef, useState } from "react";
import { Linking } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export const useAuthenticationScreen = () => {
	const authenticationWithPhoneBottomSheet = useRef<BottomSheetModal>()

	const { isAndroid, isIos } = usePlatform();
	const { window: { width: windowWith } } = useDimensions()
	const snapPoints = useMemo(() => ['35%'], []);

	const titleText = useStyle(({ colors }) => ({
		color: colors.onPrimary,
		fontSize: 32,
		marginHorizontal: 20,
	}))

	const bottomContainerStyle = useStyle(({ roundness, colors }) => ({
		backgroundColor: colors.background,
		borderRadius: roundness,
		paddingHorizontal: 20,
		paddingTop: 24,
		flex: 1,
		justifyContent: 'space-between', paddingBottom: 25
	}))

	const onOpenViewPhoneInput = useCallback(() => {
		authenticationWithPhoneBottomSheet.current?.present()
	}, [authenticationWithPhoneBottomSheet]);

	const onCloseViewPhoneInput = useCallback(() => {
		authenticationWithPhoneBottomSheet.current?.close()
	}, [authenticationWithPhoneBottomSheet])

	const onUserAgreement = useCallback(() => {
		Linking.openURL(
									"https://storage.yandexcloud.net/dmdmeditationimage/%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8_%D0%B4%D0%BB%D1%8F.pdf"
								);
	}, []);
	const onPrivacyPolicy = useCallback(() => {
		Linking.openURL(
									"https://storage.yandexcloud.net/dmdmeditationimage/%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8C%D1%81%D0%BA%D0%BE%D0%B5_%D1%81%D0%BE%D0%B3%D0%BB%D0%B0%D1%88%D0%B5%D0%BD%D0%B8%D0%B5_%D0%B4%D0%BB%D1%8F.pdf"
								);
	}, []);

	return {
		isAndroid,
		isIos,
		windowWith,
		titleText,
		bottomContainerStyle,
		onOpenViewPhoneInput,
		onCloseViewPhoneInput,
		onUserAgreement,
		onPrivacyPolicy,
		authenticationWithPhoneBottomSheet,
		snapPoints
	}
}