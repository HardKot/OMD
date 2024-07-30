import { configureFonts, DefaultTheme, useTheme } from "react-native-paper";

const fontConfig = {
	ios: {
		regular: {
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'sans-serif-medium',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'sans-serif-light',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'sans-serif-thin',
			fontWeight: 'normal',
		},
	},
	android: {
		regular: {
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'sans-serif-medium',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'sans-serif-light',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'sans-serif-thin',
			fontWeight: 'normal',
		},
	}
};


export const appTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#9765A8",
		surface: "#FFF"
	},
	// fonts: configureFonts({ config: fontConfig, isV3: false })
}

export const appDarkTheme = appTheme

export type AppTheme = typeof appTheme
