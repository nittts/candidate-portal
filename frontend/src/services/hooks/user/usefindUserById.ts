import { CANDIDATES_LIST_KEY } from "@/constants/query-keys";
import { findUserById } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useFindUserById(payload: { id: number }, enabled: boolean = true) {
  const {
    data: userData,
    status: findUserDataStatus,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [CANDIDATES_LIST_KEY, payload],
    queryFn: () => findUserById(payload),
    enabled,
    initialData: [],
  });

  return { userData, findUserDataStatus, refetchUser };
}
