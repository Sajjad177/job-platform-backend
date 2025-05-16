export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "employee" | "job_seeker";
  company?: string;
}
