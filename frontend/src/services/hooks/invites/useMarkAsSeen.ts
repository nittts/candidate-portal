import { markInviteAsSeen as markInviteAsSeenSvc } from "@/services/invites";
import { useMutation } from "@tanstack/react-query";

export function useMarkAsSeen() {
  const { mutateAsync: markInviteAsSeen, status: markInviteAsSeenStatus } = useMutation({
    mutationFn: markInviteAsSeenSvc,
  });

  return { markInviteAsSeen, markInviteAsSeenStatus };
}
