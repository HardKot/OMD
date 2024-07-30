import { createApi, EndpointBuilder } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../../shared/api/AppBaseQuery";
import Subscribe from "../../../models/subscribe";

export const SubscribeApi = createApi({
	baseQuery: AppBaseQuery,
	reducerPath: "meditationApi",
	endpoints: build => ({
		getSubscribeUserInformation: build.query<Subscribe, void>({
			query: () => 'subscribe',
		}),

		getPaymentUrl: build.query<string, "Week" | "Month" | "Month6">({
			query: (type) => ({
				url: 'payment',
				params: {
					type: 0,
					needRecurrent: type !== "Week"
				}
			}),
		}),

		redirectPaymentURL: build.query<string, "Week" | "Month" | "Month6">({
			query: (type) => ({
				url: "payment",
				params: {
					type: (type === "Week" ? 0 : type === "Month" ? 1 : 2),
					needRecurrent: type !== "Week"
				}
			})
		})
	}),
});


export const {
	useGetPaymentUrlQuery,
	useGetSubscribeUserInformationQuery,
	useLazyGetPaymentUrlQuery,
	useLazyGetSubscribeUserInformationQuery,
	useLazyRedirectPaymentURLQuery,
	useRedirectPaymentURLQuery,
} = SubscribeApi