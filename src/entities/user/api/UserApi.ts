import { createApi } from "@reduxjs/toolkit/query/react";
import { AppBaseQuery } from "../../../shared/api/AppBaseQuery";
import { User } from "../models/User";
import { CreateUserForm } from "../models/CreateUserForm";

export const UserApi = createApi({
	baseQuery: AppBaseQuery,
	reducerPath: "userApi",
	tagTypes: ["user"],
	endpoints: build => ({
		getUserById: build.query<User | null, string>({
			query: userId => ({
				url: "users",
				params: { id: userId },
			}),
			providesTags: result => [{ type: 'user', id: result?.Id }]
		}),

		createUser: build.mutation<User, CreateUserForm>({
			query: body => ({
				url: "/users",
				method: "POST",
				body,
			}),
		}),

		updateUser: build.mutation<User, Partial<User>>({
			query: body => ({
				url: "/users",
				method: "PATCH",
				body,
			}),
			invalidatesTags: result => [{ type: 'user', id: result?.Id }]
		}),

		getUserByName: build.query<User[], string>({
			query: name => ({
				url: "nickname",
				paras: { nickname: name },
			}),
			providesTags: result => result?.map((user) => ({ id: user.Id, type: 'user' })) ?? []

		}),

		reservationName: build.mutation<User, string>({
			query: (name) => ({
				url: "nickname",
				body: name,
				method: "POST",
			}),
			invalidatesTags: result => [{ type: 'user', id: result?.Id }]
		}),

		deleteUser: build.mutation({
			query: () => ({
				url: "users",
				method: "DELETE",
			}),
			invalidatesTags: result => [{ type: 'user', id: result?.Id }]
		})
	}),
});

export const {
	useGetUserByIdQuery,
	useCreateUserMutation,
	useDeleteUserMutation,
	useUpdateUserMutation,
	useGetUserByNameQuery,
	useReservationNameMutation,
	useLazyGetUserByIdQuery,
	useLazyGetUserByNameQuery,
} = UserApi