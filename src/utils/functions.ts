import { OS } from "../atom/atom";

export function RandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function osCheck(): OS {
  if (/Android/i.test(navigator.userAgent)) return "android";
  if (/iPhone|iPad/i.test(navigator.userAgent)) return "ios";
  return "web";
}

export function isExist(data: any): boolean {
  if (data === null || data === undefined) return false;
  if (data === "") return false;
  return true;
}

export function isEmpty(data: any): boolean {
  if (!data) return true;
  if (data === "") return true;
  return false;
}

export async function handleResponse(response: Response): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const json = await response.json();
    if (!response.ok) {
      return reject(json.message);
    }
    return resolve(json);
  });
}
