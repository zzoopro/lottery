export type UserType = "master" | "guest";
export type Struct<T> = {
  [key: string]: T;
};
export type Direction = "row" | "column";
export type InputType = "text" | "password" | "email" | "number";
export type CapsuleOpenType = "random" | "choice";

export interface IUser {
  coin: number;
  jarId: string;
  nickname: string;
  phoneNumber: string;
  userId: string;
  [key: string]: any;
}
export interface ICapsule {
  capsuleId: string;
  authorNickname: string;
  createdAt: string;
  emojiReply: string;
  type: string;
  color: string;
  public: boolean;
  read: boolean;
}

export interface IJar {
  coin: number;
  userNickname: string;
  capsules: ICapsule[];
}
