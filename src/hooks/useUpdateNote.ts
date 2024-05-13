import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";
import { useMutation } from "@tanstack/react-query";

const useUpdateNote = () => {
  const [userToken] = useRecoilState(userAtom);
  const updateNote = ({ id, title, content }: { id: string, title: string, content: string }) =>
    instance.put(endPoints.notes + `/${id}`, { title: title, content: content }, {
      headers: {
        token: `3b8ny__${userToken}`,
      },
    });
  return useMutation({ mutationFn: updateNote })
};

export default useUpdateNote;
