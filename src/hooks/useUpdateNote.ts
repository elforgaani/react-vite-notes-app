import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import Note from "../interfaces/note";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";
import { useMutation } from "@tanstack/react-query";

const useUpdateNote = () => {
  const [userToken] = useRecoilState(userAtom);
  const updateNote = (id: string, data: Note) =>
    instance.put(endPoints.notes + `/${id}`, data, {
      headers: {
        token: `3b8ny__${userToken}`,
      },
    });
  return useMutation(updateNote);
};

export default useUpdateNote;
