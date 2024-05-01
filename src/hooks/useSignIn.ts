import { useMutation } from "@tanstack/react-query";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";

const signIn = (body: object) => instance.post(endPoints.signIn, body);

export const useSingIn = () => {
  return useMutation({ mutationFn: signIn });
};
