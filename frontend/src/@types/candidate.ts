import { UserType } from "./user";

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  userType: UserType;
  abilities: Array<{ name: string }>;
  degrees: Array<{
    name: string;
    institutionName: string;
    graduationDate: string;
  }>;
  birthdate: string;
}
