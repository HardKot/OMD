import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { LoadingProvider } from "@/shared/hooks/UseLoading";
import * as SplashScreen from 'expo-splash-screen';
import React from "react";

interface LoadingAppProviderProperties extends PropsWithChildren {
	initModuleName: string[];
}

export const LoadingAppProvider = ({ children, initModuleName }: LoadingAppProviderProperties) => {
	const [loadingStatus, setLoadingStatus] = useState<Record<string, boolean>>({});

	const onChange = useCallback((name: string, status: boolean) => {
		setLoadingStatus(previousState => ({ ...previousState, [name]: status	 }))
	}, [setLoadingStatus])

	const hiddenSplash =  useCallback(async () => {
		for (const moduleName of initModuleName) {
			if (!loadingStatus[moduleName]) return ;
		}
		await SplashScreen.hideAsync()
	}, [loadingStatus, initModuleName])

	useEffect(() => {
		hiddenSplash().then(() => {})
	}, [loadingStatus, initModuleName]);

	return (
		<LoadingProvider loadingState={loadingStatus} onChange={onChange}>
			{children}
		</LoadingProvider>
	)
}