import { NEW_INVITES_LIST_KEY } from "@/constants/query-keys";
import { findNewInvitesCount } from "@/services/invites";
import { useQuery } from "@tanstack/react-query";

export function useFindNewInvitesCount(payload: { id: number }, enabled: boolean = true) {
  const {
    data: newInvites,
    status: listNewInvitesStatus,
    refetch: refetchNewInvites,
  } = useQuery({ queryKey: [NEW_INVITES_LIST_KEY, payload], queryFn: () => findNewInvitesCount(payload), enabled });

  return { newInvites, listNewInvitesStatus, refetchNewInvites };
}
