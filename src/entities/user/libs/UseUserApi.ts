import {
	useCreateUserMutation,
	useDeleteUserMutation, useGetUserByNameQuery,
	useLazyGetUserByIdQuery, useLazyGetUserByNameQuery, useReservationNameMutation,
	useUpdateUserMutation
} from "../api/UserApi";

export const useUserApi = () => {
	const [getUserById] = useLazyGetUserByIdQuery();
	const [createUser] = useCreateUserMutation();
	const [updateUser] = useUpdateUserMutation();
	const [deleteUser] = useDeleteUserMutation();
	const [getByName] = useLazyGetUserByNameQuery();
	const [reservationName] = useReservationNameMutation();


	return {
		getUserById,
		createUser,
		updateUser,
		deleteUser,
		getByName,
		reservationName,
	}
}