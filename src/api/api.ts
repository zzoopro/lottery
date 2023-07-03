import { ILogin } from "../components/auth/LoginForm";
import { ISignup } from "../components/auth/SignupForm";
import {
  AUTH_TOKEN,
  GET,
  POST,
  USER,
  USER_CHECK,
  USER_LOGIN,
} from "../utils/constants";
import { isExist } from "../utils/functions";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const handleError = (error: Error) => {};

const makeHeaders = () => {
  return {
    "Content-Type": `application/json`,
    ...(isExist(AUTH_TOKEN) && { Authorization: `Bearer ${AUTH_TOKEN}` }),
  };
};

export const signup = async (data: ISignup) => {
  return await fetch(`${SERVER_URL}/${USER}`, {
    method: POST,
    body: JSON.stringify(data),
    headers: makeHeaders(),
  })
    .then((response: Response) => response.json())
    .catch((error: Error) => handleError(error));
};

export const login = async (data: ILogin) => {
  return await fetch(`${SERVER_URL}/${USER_LOGIN}`, {
    method: POST,
    body: JSON.stringify(data),
    headers: makeHeaders(),
  })
    .then((response: Response) => response.json())
    .catch((error: Error) => handleError(error));
};

export const idCheck = async (id: string) => {
  return await fetch(`${SERVER_URL}/${USER_CHECK}?id=${id}`, {
    method: GET,
    headers: makeHeaders(),
  })
    .then((response: Response) => response.json())
    .catch((error: Error) => handleError(error));
};

export const user = async () => {
  return await fetch(`${SERVER_URL}/${USER}`, {
    method: GET,
    headers: makeHeaders(),
  })
    .then((response: Response) => response.json())
    .catch((error: Error) => handleError(error));
};
