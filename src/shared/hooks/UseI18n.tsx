import React from "react";
import { createContext, PropsWithChildren, useContext } from "react";
import { I18n } from "i18n-js";

const I18nContext = createContext<[I18n | null, (local: string | 'system') => void]>([null, () => {}]);

export const useI18n = () => {
	const [i18n] = useContext(I18nContext);
	if (!i18n) throw new Error("i18n context notFound");
	return i18n
}

export const useConfigLocal = () => {
	const [, setConfig] = useContext(I18nContext);
	return setConfig
}

interface I18nProviderProperties extends PropsWithChildren {
	i18n: I18n;
	changeConfig: (local: string | 'system') => void
}

export const I18nProvider = ({ children, i18n, changeConfig }: I18nProviderProperties) => {
	return (
		<I18nContext.Provider value={[i18n, changeConfig]}>
			{children}
		</I18nContext.Provider>
	)
}