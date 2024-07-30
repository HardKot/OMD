/** @format */

import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { getToken } from "../../api/asyncStorage";
import Constants from "expo-constants";

export const AppBaseQuery: BaseQueryFn<
	string | (FetchArgs & { cookies?: { [key: string]: string } }),
	unknown,
	FetchBaseQueryError
> = async (_arguments, { signal }) => {
	try {
		const { extra } = Constants.expoConfig ?? {};
		const { apiUrl = "http://localhost:8080" } = extra;
		const firebaseToken = await getToken();

		let url = new URL(apiUrl);

		url = typeof _arguments === "string" ? new URL(_arguments, url) : new URL(_arguments.url, url);

		if (typeof _arguments !== "string") {
			for (const [parameterKey, parameterValue] of Object.entries(_arguments.params)) {
				url.searchParams.set(parameterKey, parameterValue);
			}
		}

		const method = (typeof _arguments === "string" ? null : _arguments.method) ?? "GET";
		const body = typeof _arguments === "string" ? null : _arguments.body;
		const request = await fetch(url, {
			method,
			body,
			headers: { Authorization: firebaseToken, "Content-Type": "application/json" },
			signal
		});

		if (request.ok()) return { data: await request.json() };
		return { error: request.statusText };
	} catch (error) {
		if (!error instanceof Error) {
			error = new Error("Unknown error");
		}
		console.error(error.message);
		return { error: e.message };
	}
};
