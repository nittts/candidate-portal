import { ListCandidatesParams } from "@/@types/user";
import { CANDIDATES_LIST_KEY } from "@/constants/query-keys";
import { listCandidates } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export function useListCandidates(payload: ListCandidatesParams, enabled: boolean = true) {
  const {
    data: candidates,
    status: listCandidatesStatus,
    refetch: refetchCandidates,
  } = useQuery({
    queryKey: [CANDIDATES_LIST_KEY, payload],
    queryFn: () => listCandidates(payload),
    enabled,
  });

  return { candidates, listCandidatesStatus, refetchCandidates };
}
