import { useCallback, useRef, useState } from "react";
import { GoogleAuthentication } from "../models/GoogleAuthentication";
import { useI18n } from "../../../../shared/hooks/UseI18n";
import { useStyle } from "@/shared/hooks/UseStyle";

export const useGoogleAuthentication = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [errorMessage, setErrorMessage] = useState<string>("");
	const googleAuthentication = useRef(new GoogleAuthentication());
	const i18n = useI18n();
	const buttonStyle = useStyle((theme) => ({  }))

	const onGoogleAuthentication = useCallback(async () => {
		try {
			setIsLoading(true)
			await googleAuthentication.current.execute()
		} catch (error) {
			if (error instanceof Error && error.message !== "Sign in action cancelled") setErrorMessage("Ошибка при авторизации");
		}
		setIsLoading(false);
	}, [googleAuthentication, setIsLoading]);

	return {
		onGoogleAuthentication,
		isLoading,
		errorMessage,
		i18n,
		buttonStyle,
	}
}