export interface Invite {
  id: number;
  companyName: string;
  position: string;
  description: string;
  status: "pending" | "accepted" | "declined";
  sentDate: string;
  expiryDate: string;
  salary?: string;
  location: string;
}
