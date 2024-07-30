import React, { createContext, PropsWithChildren, useContext, } from "react";

const UseLoading = createContext<[(name: string, statusLoading: boolean) => void, Record<string, boolean>]>([() => {},  {}]);


export const useLoading = (name: string) => {
	const [setStatus, state] = useContext(UseLoading);

	return {
		start: () => setStatus(name, true),
		end: () => setStatus(name, false),
		isLoading: state[name]
	}
}

interface LoadingProviderProperties extends PropsWithChildren {
	loadingState: Record<string, boolean>
	onChange: (name: string, status: boolean) => void
}

export const LoadingProvider = ({ children, loadingState, onChange}: LoadingProviderProperties) => (
	<UseLoading.Provider value={[onChange, loadingState]}>{children}</UseLoading.Provider>
)
