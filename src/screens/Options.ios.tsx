/** @format */
import i18n from "../app/I18n";

import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";
import * as MailComposer from "expo-mail-composer";

import gStyles from "~styles";
import { Screen } from "~components/containers";
import User from "assets/icons/User.svg";
import Mail from "assets/icons/Mail.svg";
import LogOut from "assets/icons/Log_Out.svg";
import ShoppingBag from "assets/icons/Interface-Shopping_Bag_01.svg";
import { actions, useAppDispatch, useAppSelector } from "~store";
import { RootScreenProps } from "~types";
import { adapty } from "react-native-adapty";
import Trash from "assets/icons/Interface-Trash_Full.svg";
import { deleteUSer } from "src/api/requests";

const Options: RootScreenProps<"Options"> = ({ navigation }) => {
	const appDispatch = useAppDispatch();

	const uid = useAppSelector(store => store.account.uid);

	return (
		<Screen backgroundColor={"#9765A8"}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.navigate("EditUser");
				}}
			>
				<User />
				<Text style={styles.buttonText}>{i18n.t("1c76bb73-8f7f-481e-8b76-475117f2b8c7")}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					Linking.openURL("http://dmdapp.tilda.ws/support")
				}}
			>
				<Mail />
				<Text style={styles.buttonText}>{i18n.t("6f272c11-bad7-4f80-9b99-cb59688942d0")}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					adapty
						.restorePurchases()
						.then(() => {
							alert("Покупки восстановленны");
						})
						.catch(error => {
							if (error instanceof Error && /(1004)/g.test(error.message)) {
								alert("Покупки не найдены");
							}
						});
				}}
			>
				<ShoppingBag />
				<Text style={styles.buttonText}>{"Восстановить покупки"}</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					navigation.navigate("ConfirmationSignOut");
				}}
			>
				<LogOut />
				<Text style={styles.buttonText}>{i18n.t("c9bcb9a8-e59c-4ee5-97f1-94dae753a716")}</Text>
			</TouchableOpacity>
			<View
				style={{
					position: "absolute",
					bottom: 20,
					right: 20,
					left: 20,
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<View style={{ justifyContent: "flex-start", width: "100%" }}>
					<TouchableOpacity
						style={styles.button}
						onPress={() => {
							Alert.alert(
								"Удалить учетную запись",
								"Если Вы продолжите, то данные будут удаленны навсегда!. Если у Вас есть действующая подписка, то её необходимо отменить в AppStore, чтобы избежать дальнейшего списания денежных средств. Вы действительно хотите удалить данный аккаунт?",
								[
									{ text: "Отмена", style: "cancel" },
									{
										text: "Да, я подтверждаю удаление",
										onPress: () => {
											deleteUSer();
											appDispatch(actions.signOutAccount());
										},
									},
								]
							);
						}}
					>
						<Trash />
						<Text style={styles.buttonText}>Удалить учетную запись</Text>
					</TouchableOpacity>
				</View>
				{/*<Pressable*/}
				{/*	onPress={() => {*/}
				{/*		navigation.navigate("ExperimentalConfig");*/}
				{/*	}}*/}
				{/*>*/}
				{/*	<DefaultText color={"#FFFFFF"}>{i18n.t("cf2785ca-7d89-4ee5-b494-82c76175f04b")}</DefaultText>*/}
				{/*</Pressable>*/}
				{/* <DefaultText color={"#FFFFFF"}>v{version}</DefaultText> */}
			</View>
		</Screen>
	);
};

export default Options;

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#9765A8",
		flex: 1,
		alignItems: "flex-start",
		paddingHorizontal: 20,
		justifyContent: "flex-start",
		paddingBottom: 30,
	},
	button: {
		flexDirection: "row",
		alignItems: "center",
		height: 28,
		marginVertical: 12,
	},
	buttonText: {
		marginLeft: 34,
		color: "#FFFFFF",
		...gStyles.font("400"),
		fontSize: 15,
	},
});
