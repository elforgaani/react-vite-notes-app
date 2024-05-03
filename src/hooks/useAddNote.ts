import { useRecoilState } from "recoil";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";
import Note from "../interfaces/note";
import { userAtom } from "../atoms/userAtom";
import { useMutation } from "@tanstack/react-query";

const useAddNote = () => {
  const [userToken] = useRecoilState(userAtom);
  const addNote = (body: Note) =>
    instance.post(endPoints.notes, body, {
      headers: { token: `3b8ny__${userToken}` },
    });
  return useMutation({ mutationFn: addNote });
};
export default useAddNote;
