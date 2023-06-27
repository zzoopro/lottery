export type UserType = "master" | "guest";

export interface ISignup {
  userId: string;
  nickname: string;
  password: string;
  phoneNumber: string;
  coin: number;
}
