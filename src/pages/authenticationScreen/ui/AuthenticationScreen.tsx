/** @format */

import React, { lazy, Suspense } from "react";
import { ViewModel } from "../../../shared/react-utils/ViewModel";
import { useAuthenticationScreen } from "../libs/UseAuthenticationScreen";
import { ActivityIndicator, ImageBackground, Linking, Pressable, View } from "react-native";
import Bird from "~assets/icons/BirdWhite.svg";
import gStyle from "~styles";
import i18n from "../../../app/I18n";
import Swiper from "react-native-swiper";
import { Button, Paragraph, Text } from "react-native-paper";
import { AuthenticationPhone } from "../../../features/authentication/authenticationPhone";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import {
	AuthenticationAnonymously
} from "../../../features/authentication/authenticationAnonimus/ui/AuthenticationApple";

const IosAuthentication = lazy(() => import("@/features/authentication/authenticationApple"));
const GoogleAuthentication = lazy(() => import("@/features/authentication/authenticationGoogle"));

export const AuthenticationScreen = ViewModel(
	useAuthenticationScreen,
	({
		windowWith,
		titleText,
		onUserAgreement,
		onPrivacyPolicy,
		onOpenViewPhoneInput,
		isIos,
		isAndroid,
		 authenticationWithPhoneBottomSheet,
		snapPoints
	}) => (
		<ImageBackground
			style={{ flex: 1, justifyContent: "space-between" }}
			source={require("../../../../assets/old/mo-PtTbluAisCg-unsplash.png")}
		>
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<Bird />
			</View>
			<View style={{ flex: 1, justifyContent: "center" }} collapsable>
				<Text variant="headlineLarge" style={[titleText]}>
					{i18n.t("ff867b49-717d-4611-a2b2-22349439f76f")}
					{"\n"}
					<Text variant="headlineMedium" style={[titleText]}>
						Open meditation
					</Text>
				</Text>
				<Swiper
					width={windowWith}
					containerStyle={{ maxHeight: 120 }}
					dotColor={"rgba(255, 255, 255, 0.5)"}
					activeDotColor={"rgba(255, 255, 255, 1)"}
					paginationStyle={{
						justifyContent: "flex-start",
						marginHorizontal: 20,
					}}
					contentContainerStyle={{ paddingHorizontal: 20 }}
					style={{ marginTop: 10 }}
				>
					{[
						{ text: i18n.t("2c4c4afe-0269-4eea-980b-8d73963b8d35") },
						{ text: i18n.t("7895ddaf-d2b6-4941-b6b3-576d31407534") },
						{ text: i18n.t("c26411fd-d759-4215-af1f-8bfc62f164d2") },
						{ text: i18n.t("5d03c5b2-39c8-4889-983f-9d2d268e6226") },
					].map((item, index) => (
						<View key={index} style={{ maxHeight: 120, paddingHorizontal: 20 }}>
							<Text style={{ ...gStyle.styles.description, color: "#FFFFFF" }}>{item.text}</Text>
						</View>
					))}
				</Swiper>
			</View>
			<View style={{ flex: 1, paddingHorizontal: 20 }}>
				<View style={{ flexGrow: 1 }}>
					<Suspense
						fallback={
							<View>
								<ActivityIndicator />
							</View>
						}
					>
						{isIos && <IosAuthentication style={{ marginTop: 12 }} />}
						{isAndroid && <GoogleAuthentication style={{ marginTop: 12 }} />}
					</Suspense>

						<Button
							mode={"contained"}
							style={{ marginTop: 12 }}
							icon={"message-processing"}
							onPress={onOpenViewPhoneInput}
						>
							Войти с помощью телефона
						</Button>
						<AuthenticationAnonymously
							style={{ marginTop: 12 }}
						/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
						flexWrap: "wrap",
						marginTop: 10,
					}}
				>
					<Text>{i18n.t("4e5aa2a6-29db-44bc-8cf3-96e1ce338442")} </Text>
					<Pressable
						onPress={onUserAgreement}
						style={{ flex: 0, width: "auto", justifyContent: "center", alignItems: "center" }}
					>
						<Text style={{ textDecorationLine: "underline" }}>{i18n.t("userAgreement")}</Text>
					</Pressable>
					<Text> {i18n.t("and")} </Text>
					<Pressable
						onPress={onPrivacyPolicy}
						style={{ flex: 0, width: "auto", justifyContent: "center", alignItems: "center" }}
					>
						<Text style={{ textDecorationLine: "underline" }}>{i18n.t("privacyPolicy")}</Text>
					</Pressable>
					<Text> dmd meditation</Text>
				</View>
			</View>
			<BottomSheetModal
				ref={reference => { if (reference) authenticationWithPhoneBottomSheet.current = reference }}
				index={0}
				snapPoints={snapPoints}
			>
				<BottomSheetView style={{ paddingHorizontal: 20 }}>
					<Text variant={"headlineSmall"}>Вход с помощью смс кода</Text>
					<AuthenticationPhone style={{ marginTop: 12 }}/>
				</BottomSheetView>
			</BottomSheetModal>
		</ImageBackground>
	)
);
