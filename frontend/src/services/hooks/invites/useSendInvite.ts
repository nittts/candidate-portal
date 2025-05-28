import { sendInvite as sendInviteSvc } from "@/services/invites";
import { useMutation } from "@tanstack/react-query";

export function useSendInvite() {
  const { mutateAsync: sendInvite, status: sendInviteStatus } = useMutation({
    mutationFn: sendInviteSvc,
  });

  return { sendInvite, sendInviteStatus };
}
