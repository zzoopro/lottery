import { ISignup } from "../components/auth/SignupForm";
import { POST, USER } from "../utils/constants";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const handleError = (error: Error) => {};

const getHeaders = () => {
  return {
    "Content-Type": `application/json`,
  };
};

export const signup = async (data: ISignup) => {
  return await fetch(`${SERVER_URL}${USER}`, {
    method: POST,
    body: JSON.stringify(data),
    headers: getHeaders(),
  })
    .then((response: Response) => response.json())
    .catch((error: Error) => handleError(error));
};
