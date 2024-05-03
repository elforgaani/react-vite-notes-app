import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";
import { useMutation } from "@tanstack/react-query";

const useDeleteNote = () => {
  const [userToken] = useRecoilState(userAtom);
  const deleteNote = (id: string) =>
    instance.delete(endPoints.notes + `/${id}`, {
      headers: {
        token: `3b8ny__${userToken}`,
      },
    });
  return useMutation({ mutationFn: deleteNote });
};
export default useDeleteNote;
