import { useRecoilState } from "recoil";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";
import { userAtom } from "../atoms/userAtom";
import { useMutation } from "@tanstack/react-query";

const useGetUserNotes = () => {
  const [userToken] = useRecoilState(userAtom);
  console.log(userToken);

  const getUserNotes = () =>
    instance.get(endPoints.notes, {
      headers: { token: `3b8ny__${userToken}` },
    });
  return useMutation({ mutationFn: getUserNotes });
};
export default useGetUserNotes;
