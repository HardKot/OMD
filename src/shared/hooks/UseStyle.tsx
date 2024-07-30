import { ColorSchemeName, TextStyle, ViewStyle } from "react-native";
import { useTheme } from 'react-native-paper';
import { AppTheme } from "@/app/AppTheme";
import React, { createContext, PropsWithChildren, useContext } from "react";

type IStyle = ViewStyle | TextStyle

const SchemaContext = createContext<{ schema: ColorSchemeName | 'system' | null, setSchema: (schema: ColorSchemeName | 'system') => Promise<void> }>({ schema: null, setSchema: async () => {} });

export const useStyle = <Style extends IStyle>(factoryStyle: (theme: AppTheme) => Style) => {
	const theme = useTheme<AppTheme>();

	return factoryStyle(theme)
}

export const useAppTheme = useTheme<AppTheme>

export const useSchema = () => {
	const schema = useContext(SchemaContext);
	if (!schema) throw new Error("i18n context notFound");
	return schema
}

interface ISchemaProviderProperties extends PropsWithChildren {
	schema: ColorSchemeName | 'system'
	setSchema: (schema: ColorSchemeName | 'system') => Promise<void>
}

export const SchemaProvider = ({ children, schema, setSchema }: ISchemaProviderProperties) => {
	return (
		<SchemaContext.Provider value={{ schema, setSchema }}>
	{children}
	</SchemaContext.Provider>
)
}
