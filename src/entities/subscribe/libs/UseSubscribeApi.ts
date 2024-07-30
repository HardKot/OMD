import {
	useLazyGetPaymentUrlQuery,
	useLazyGetSubscribeUserInformationQuery,
	useLazyRedirectPaymentURLQuery
} from "../api/SubscribeApi";

export const useSubscribeApi = () => {
	const [getPaymentUrl] = useLazyGetPaymentUrlQuery();
	const [getSubscribeUserInformation] = useLazyGetSubscribeUserInformationQuery();
	const [getRedirectPaymentURL] = useLazyRedirectPaymentURLQuery();

	return {
		getPaymentUrl,
		getSubscribeUserInformation,
		getRedirectPaymentURL,
	}
}