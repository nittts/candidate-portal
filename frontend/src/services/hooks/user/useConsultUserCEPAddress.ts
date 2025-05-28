import { consultCEPAddress } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export function useConsultUserCEPAddress() {
  const { mutateAsync: consultCep, status: consultCepStatus } = useMutation({
    mutationFn: consultCEPAddress,
  });

  return { consultCep, consultCepStatus };
}
