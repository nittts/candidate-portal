import { INVITES_LIST_KEY } from "@/constants/query-keys";
import { listAllInvitesByUserId } from "@/services/invites";
import { useQuery } from "@tanstack/react-query";

export function useListAllInvitesByUserId(payload: { id: number }, enabled: boolean = true) {
  const {
    data: invites,
    status: listInvitesStatus,
    refetch: refetchInvites,
  } = useQuery({
    queryKey: [INVITES_LIST_KEY, payload],
    queryFn: () => listAllInvitesByUserId(payload),
    enabled,
    initialData: { invites: [], count: 0 },
  });

  return { invites, listInvitesStatus, refetchInvites };
}
