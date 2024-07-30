import { CreateUserForm } from "../../../entities/user/models/CreateUserForm";

export class RegistrationUtils {
	factoryForm(): CreateUserForm {
		return { nickname: '', birthday: '', image: '' }
	}
}