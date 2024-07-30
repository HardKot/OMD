import React, { ReactNode, useCallback, useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useLoading } from "@/shared/hooks/UseLoading";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

interface AuthProviderProperties {
	NoAuthStack: ReactNode
	AuthStack: ReactNode
}

GoogleSignin.configure({
	webClientId: "878799007977-cj3549ni87jre2rmg4eq0hiolp08igh2.apps.googleusercontent.com",
});

export const AuthAppProvider = ({ NoAuthStack, AuthStack }: AuthProviderProperties) => {
	const [initializing, setInitializing] = useState(true);
	const [currentUser, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null);
	const { end } = useLoading('auth')

	const onChangeAuth = useCallback((user: FirebaseAuthTypes.User | null) => {
		setCurrentUser(user)
		setInitializing(false);
		end()
	}, [setCurrentUser, setInitializing, end])

	useEffect(() => {
		return auth().onAuthStateChanged(onChangeAuth);
	}, [onChangeAuth])

	if (initializing) return null;

	if (!currentUser) return NoAuthStack;

	return AuthStack;
}