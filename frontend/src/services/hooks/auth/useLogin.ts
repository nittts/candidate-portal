import { login as loginSvc } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { mutateAsync: login, status: loginStatus } = useMutation({
    mutationFn: loginSvc,
  });

  return { login, loginStatus };
}
