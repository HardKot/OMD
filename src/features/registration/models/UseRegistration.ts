import { useUserApi } from "../../../entities/user/libs/UseUserApi";
import { useRegistrationUtils } from "../libs/UseRegistrationUtils";
import { useForm } from "react-hook-form";
import { CreateUserForm } from "../../../entities/user/models/CreateUserForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegistrationValidateSchema } from "./RegistrationValidateSchema";

export const useRegistrationForm = () => {
	const { createUser } = useUserApi();
	const utils = useRegistrationUtils();
	const form = useForm<CreateUserForm>({
		defaultValues: utils.factoryForm(),
		resolver: zodResolver(RegistrationValidateSchema)
	})

	const onSubmit = form.handleSubmit(async (data) => createUser(data).unwrap())

	return {
		form, onSubmit
	}
}