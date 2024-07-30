import zod from "zod";

export const RegistrationValidateSchema = zod.object({
	nickname: zod.string(),
	birthday: zod.string(),
	image: zod.string().nullable(),
})