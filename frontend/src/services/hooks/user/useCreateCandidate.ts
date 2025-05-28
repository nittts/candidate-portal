import { createCandidate as createCandidateSvc } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export function useCreateCandidate() {
  const { mutateAsync: createCandidate, status: createCandidatestatus } = useMutation({
    mutationFn: createCandidateSvc,
  });

  return { createCandidate, createCandidatestatus };
}
