import { useSelector } from "react-redux";
import { TypeStore } from "@/app/BuildStore";

export const useUserAppSelector = useSelector<TypeStore>