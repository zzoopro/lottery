export type UserType = "master" | "guest";
export type Struct<T> = {
  [key: string]: T;
};
export type Direction = "row" | "column";
export type InputType = "text" | "password" | "email" | "number";
export type CapsuleOpenType = "random" | "choice";
