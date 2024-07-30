import { useCallback, useRef, useState } from "react";
import { useI18n } from "../../../../shared/hooks/UseI18n";
import { useStyle } from "@/shared/hooks/UseStyle";
import { AppleAuthentication } from "../models/AppleAuthentication";

export const useAppleAuthentication = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const appleAuthentication = useRef(new AppleAuthentication());
	const i18n = useI18n();
	const buttonStyle = useStyle((theme) => ({  }))

	const onAppleAuthentication = useCallback(async () => {
		try {
			setIsLoading(true)
			await appleAuthentication.current.execute()
		} catch (error) {
			if (error instanceof Error && error.message !== "Sign in action cancelled") setErrorMessage("Ошибка при авторизации");
		}
		setIsLoading(false);
	}, [appleAuthentication, setIsLoading]);

	return {
		onAppleAuthentication,
		isLoading,
		errorMessage,
		i18n,
		buttonStyle,
	}
}