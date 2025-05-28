import { UserTypeEnum } from "@/@types/user";

export const userTypeToPt = Object.freeze<Record<UserTypeEnum, string>>({
  ADMIN: "Admin",
  CANDIDATE: "Candidato",
});
