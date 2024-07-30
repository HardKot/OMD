import { createApi } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../../shared/api/AppBaseQuery";
import { Meditation } from "../models/Meditation";


export const MeditationApi = createApi({
	baseQuery: AppBaseQuery,
	reducerPath: "meditationApi",
	tagTypes: ["meditation"],
	endpoints: build => ({
		getPopularMeditation: build.query<Meditation, void>({
			query: () => ({
				url: "meditation",
				params: { popularToday: true },
			}),
			providesTags: result => [{ type: 'meditation', id: result?.Id }]
		}),

		getMeditationById: build.query<Meditation, string>({
			query: id => ({
				url: "/meditation",
				params: {
					meditationId: id
				},
			}),
			providesTags: result => [{ type: 'meditation', id: result?.Id }]
		}),

		getMeditationsByType: build.query<Meditation[], string>({
			query: type => ({
				url: "meditation",
				params: { type },
			}),
			providesTags: result => result?.map(meditation => ({ type: 'meditation', id: meditation?.Id })) ?? []

		}),
		getRecommendationMeditation: build.query<Meditation, void>({
			query: () => ({
				url: "meditation",
				params: {
					getIsNotListened: true,
					countOfMeditations: 1
				},
			}),
			providesTags: result => [{ type: 'meditation', id: result?.Id }]
		}),
		setMeditationIsListen: build.mutation<Meditation, string>({
			query: (meditationId) => ({
				url: "meditation",
				method: "PUT",
				params: {
					meditationId,
					meditationLanguage: 'ru'
				},
			}),
			invalidatesTags: result => [{ type: 'meditation', id: result?.Id }]
		}),
	}),
});

export const {
	useGetMeditationByIdQuery,
	useGetMeditationsByTypeQuery,
	useGetPopularMeditationQuery,
	useGetRecommendationMeditationQuery,
	useSetMeditationIsListenMutation,
	useLazyGetMeditationByIdQuery,
	useLazyGetRecommendationMeditationQuery,
	useLazyGetMeditationsByTypeQuery,
	useLazyGetPopularMeditationQuery,
} = MeditationApi