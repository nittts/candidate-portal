import { AbilityName } from "./Ability";

export enum UserTypeEnum {
  ADMIN = "ADMIN",
  CANDIDATE = "CANDIDATE",
}

export type UserType = `${UserTypeEnum}`;

export interface User {
  id: number;
  email: string;
  userType: UserType;
  fullName?: string;
  birthdate?: string;
  phone?: string;
  address?: string;
  cep?: string;
  abilities?: Array<{ name: string }>;
  degrees?: Array<{
    name: string;
    institutionName: string;
    graduationDate: string;
  }>;
  isActive?: boolean;
}

export type ListCandidatesParams = {
  abilities: AbilityName[];
  name: string;
};

export type ActivateUserParams = {
  id: number;
  password: string;
  previousPassword: string;
};
