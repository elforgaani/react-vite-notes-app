import { useMutation } from "@tanstack/react-query";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";
import SignUpFormFields from "../interfaces/formField";

const signUpUser = (body: SignUpFormFields) =>
  instance.post(endPoints.signUp, { age: 25, phone: "01022734542", ...body });
export const useSignUpUser = () => {
  return useMutation({ mutationFn: signUpUser });
};
