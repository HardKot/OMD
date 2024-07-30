import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AppTheme } from "../AppTheme";
import { ColorSchemeName, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React from "react";
import { SchemaProvider } from "@/shared/hooks/UseStyle";
import { useLoading } from "@/shared/hooks/UseLoading";
import { StatusBar } from "expo-status-bar";

interface ThemeProviderProperties extends PropsWithChildren {
	theme: AppTheme;
	darkTheme: AppTheme;
}

export const ThemeAppProvider = ({theme, darkTheme, children}: ThemeProviderProperties) =>  {
	const systemSchema = useColorScheme() ?? 'light';
	const { getItem, setItem } = useAsyncStorage("APP_SCHEMA")
	const [schemaSelected, setSchemaSelected] = useState<ColorSchemeName | 'system' | null>(null)
	const { end } = useLoading('theme')

	let schema = systemSchema;
	if (schemaSelected && schemaSelected !== 'system') schema = schemaSelected;


	useEffect(() => {
		getItem()
			.then(savedSchema => {
				if (savedSchema && savedSchema !== "system" && (savedSchema === 'dark' || savedSchema === 'light')) setSchemaSelected(savedSchema)
			})
			.then(() => end())
	}, [getItem, end]);

	const currentTheme = schema === "dark" ? darkTheme : theme

	const onChangeSchema = useCallback(async (value: ColorSchemeName | 'system') => {
			await setItem(`${value}`)
			setSchemaSelected(value)
	}, [setItem])

	return (
		<PaperProvider theme={currentTheme}>
			<SchemaProvider schema={schema} setSchema={onChangeSchema}>
				<StatusBar backgroundColor={currentTheme.colors.primary} style={schema} />
				{children}
			</SchemaProvider>
		</PaperProvider>
	)
}