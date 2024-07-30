import {
	useLazyGetMeditationByIdQuery,
	useLazyGetMeditationsByTypeQuery, useLazyGetPopularMeditationQuery,
	useLazyGetRecommendationMeditationQuery, useSetMeditationIsListenMutation
} from "../api/MeditationApi";

export const useMeditationApi = () => {
	const [getMeditationById] = useLazyGetMeditationByIdQuery();
	const [getMeditationByType] = useLazyGetMeditationsByTypeQuery();
	const [getRecommendationMeditation] = useLazyGetRecommendationMeditationQuery();
	const [getPopularMeditation] = useLazyGetPopularMeditationQuery();
	const [setMeditationListen] = useSetMeditationIsListenMutation();

	return {
		getMeditationById,
		getMeditationByType,
		getRecommendationMeditation,
		getPopularMeditation,
		setMeditationListen,
	}
};
