import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { configureStore, createListenerMiddleware } from "@reduxjs/toolkit";
import { useLoading } from "@/shared/hooks/UseLoading";
import type { RootReducer } from "@/app/BuildStore";

interface StoreAppProviderProperty extends PropsWithChildren {
	reducer: RootReducer,
}

const createStoreSnapshotMiddleware = createListenerMiddleware();

export const StoreAppProvider = ({ children, reducer }: StoreAppProviderProperty) => {
	const { getItem, setItem } = useAsyncStorage("APP_STORE");
	const [savedData, setSavedData] = useState();
	const { end } = useLoading('store')

	const store = useMemo(() => configureStore({
		reducer,
		preloadedState: savedData,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware()
				.prepend(
					createStoreSnapshotMiddleware.middleware
				)
	}), [savedData, reducer])

	useEffect(() => {
		getItem()
			.then(storeSnapshot => {
				if (!storeSnapshot) return
				const dataSnapshot = JSON.parse(storeSnapshot);
				setSavedData(dataSnapshot);
			})
			.then(() => {end()})

	}, [end]);

	useEffect(() => {

		return createStoreSnapshotMiddleware.startListening({
			predicate: () => true,
			effect: async (_, api) => {
				const snapshot = JSON.stringify(api.getState());
				await setItem(snapshot)
			}
		});
	}, [setItem]);

	return (
		<Provider store={store}>{children}</Provider>
	)
}