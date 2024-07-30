import { useCallback, useRef, useState } from "react";
import { useI18n } from "../../../../shared/hooks/UseI18n";
import { useStyle } from "@/shared/hooks/UseStyle";
import { AnonymouslyAuthentication } from "../models/AnonimusAuthentication";
import { useAppTheme } from "@/app/AppTheme";

export const useAnonymouslyAuthentication = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const anonymouslyAuthentication = useRef(new AnonymouslyAuthentication());
	const i18n = useI18n();
	const buttonStyle = useStyle((theme) => ({  }))
	const appTheme = useAppTheme();


	const onAppleAuthentication = useCallback(async () => {
		try {
			setIsLoading(true)
			await anonymouslyAuthentication.current.execute()
		} catch (error) {
			if (error instanceof Error && error.message !== "Sign in action cancelled") setErrorMessage("Ошибка при авторизации");
		}
		setIsLoading(false);
	}, [anonymouslyAuthentication, setIsLoading]);

	return {
		onAppleAuthentication,
		isLoading,
		errorMessage,
		i18n,
		buttonStyle,
		appTheme
	}
}