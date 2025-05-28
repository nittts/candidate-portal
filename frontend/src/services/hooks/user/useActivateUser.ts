import { activateUser as activateUserSvc } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export function useActivateUser() {
  const { mutateAsync: activateUser, status: activateUserStatus } = useMutation({
    mutationFn: activateUserSvc,
  });

  return { activateUser, activateUserStatus };
}
