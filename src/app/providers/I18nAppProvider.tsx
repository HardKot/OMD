import { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { I18nProvider } from "@/shared/hooks/UseI18n";
import { I18n } from "i18n-js";
import { ruPluralization } from "@/shared/i18n-utils/RuPluralization";
import ruRu from "@/assets/translations/ru-RU.json";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useLocales } from "expo-localization";

import React from "react";
import { useLoading } from "@/shared/hooks/UseLoading";



interface I18nAppProviderProperties extends PropsWithChildren {
	defaultLanguage: string;
}

export const I18nAppProvider = ({ defaultLanguage, children }: I18nAppProviderProperties) => {
	const locales = useLocales();
	const { getItem, setItem } = useAsyncStorage("APP_LOCAL")
	const { end } = useLoading('i18n')

	const appI18n = useMemo(() => {
		const i18n = new I18n({
			"ru-RU": ruRu,
		})

		i18n.defaultLocale = defaultLanguage;
		i18n.locale = locales[0].languageTag;

		i18n.pluralization.register("ru-Ru", (_, count) => ruPluralization(count))

		return i18n;
	}, [defaultLanguage])

	useEffect(() => {
		getItem().then(locale => {
			if (locale && locale !== 'system') appI18n.locale = locale;
		})
			.then(() => end())
	}, [getItem, end]);

	const onChangeLanguage = useCallback((language: string ) => {
		setItem(language);
		appI18n.locale = language;
	}, [setItem, appI18n]);

	return (
		<I18nProvider i18n={appI18n} changeConfig={onChangeLanguage}>
			{children}
		</I18nProvider>
	)
}