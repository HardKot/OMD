import { FC, PropsWithChildren } from "react";
import { useUserApi } from "../../../entities/user/libs/UseUserApi";
import { FormProvider, useForm } from "react-hook-form";
import { CreateUserForm } from "../../../entities/user/models/CreateUserForm";
import { useRegistrationUtils } from "../libs/UseRegistrationUtils";
import { useRegistrationForm } from "../models/UseRegistration";

export const RegistrationForm = ({ children }: PropsWithChildren) => {
	const { form, onSubmit } = useRegistrationForm();

	return (
		<FormProvider {...form}>
			{children}
		</FormProvider>
	)
}