import { useCallback, useEffect, useRef, useState } from "react";
import { PhoneAuthentication } from "../models/PhoneAuthentication";
import { useI18n } from "../../../../shared/hooks/UseI18n";
import { useStyle } from "@/shared/hooks/UseStyle";
import { useBottomSheetInternal } from "@gorhom/bottom-sheet";
import { SMSCodeInputInfoShow } from "../ui/InputSmsCodeInformation";

export const usePhoneAuthentication = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [phone, setPhone] = useState<string>("");
	const [code, setCode] = useState<string>("");
	const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [endedSmsCode, setEndedSmsCode] = useState<boolean>(false);
	const [smsStatus, setSmsStatus] = useState<SMSCodeInputInfoShow>(SMSCodeInputInfoShow.loadingIndicator);

	const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

	useEffect(() => {
		return () => {
			// Reset the flag on unmount
			shouldHandleKeyboardEvents.value = false;
		};
	}, [shouldHandleKeyboardEvents]);
	//#endregion

	//#region callbacks
	const handleOnFocus = useCallback(() => {
		shouldHandleKeyboardEvents.value = true;
	}, [shouldHandleKeyboardEvents]);
	const handleOnBlur = useCallback(() => {
		shouldHandleKeyboardEvents.value = false;
	}, [shouldHandleKeyboardEvents]);
	//#endregion

	const phoneAuthentication = useRef(new PhoneAuthentication());
	const codeConfirm = useRef<(code: string) => Promise<void>>();

	const i18n = useI18n();
	const buttonStyle = useStyle(theme => ({}));

	const onPhoneAuthentication = useCallback(async () => {
		try {
			setIsLoading(true);
			codeConfirm.current = await phoneAuthentication.current.execute(phone);
			setSmsStatus(SMSCodeInputInfoShow.requestSMS);
			setShowCodeInput(true);
		} catch (error) {
			if (error instanceof Error && error.message !== "Sign in action cancelled")
				setErrorMessage("Ошибка при авторизации");
		}
		setIsLoading(false);
	}, [phoneAuthentication, setIsLoading, phone]);

	const onCodeConfirmation = useCallback(async () => {
		try {
			setIsLoading(true);
			await codeConfirm.current?.call(phoneAuthentication.current, code);
		} catch (error) {
			if (error instanceof Error && error.message !== "Sign in action cancelled")
				setErrorMessage("Ошибка при авторизации");
		}
		setIsLoading(false);
	}, [phoneAuthentication, setIsLoading, code]);

		return {
		onPhoneAuthentication,
		onCodeConfirmation,
		isLoading,
		errorMessage,
		i18n,
		buttonStyle,
		showCodeInput,
		setCode,
		setPhone,
		phone,
		code,
		handleOnFocus,
		handleOnBlur,
		setEndedSmsCode,
		endedSmsCode,
		smsStatus
	};
};