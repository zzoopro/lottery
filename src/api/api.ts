import { POST, USER } from "../utils/constants";
import { ISignup } from "../utils/type";

export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const handleError = (error: Error) => {};

export const signup = async (data: ISignup) => {
  return await fetch(`${SERVER_URL}${USER}`, {
    method: POST,
    body: JSON.stringify(data),
  })
    .then((response: Response) => response.json())
    .catch((error: Error) => handleError(error));
};
