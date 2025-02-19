import { useRecoilState } from "recoil";
import instance from "../api/apiConfix";
import { endPoints } from "../api/apiEndpoints";
import { userAtom } from "../atoms/userAtom";
import { useQuery } from "@tanstack/react-query";

const useGetUserNotes = () => {
  const [userToken] = useRecoilState(userAtom);
  const getUserNotes = () =>
    instance.get(endPoints.notes, {
      headers: { token: `3b8ny__${userToken}` },
    });
  return useQuery({ queryKey: ["notes"], queryFn: getUserNotes });
};
export default useGetUserNotes;
