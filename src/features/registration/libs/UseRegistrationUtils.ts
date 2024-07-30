import { useRef } from "react";
import { RegistrationUtils } from "./RegistrationUtils";

export const useRegistrationUtils = () => {
	const utils = useRef(new RegistrationUtils());
	return utils.current;
}