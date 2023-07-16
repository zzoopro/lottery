import { AUTH } from "./constants";
import { OS, Struct } from "./type";

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

export interface IResponse {
  data: Struct<any> | null;
  status: number;
  message: string | null;
}

export function isLogined(): boolean {
  return isExist(localStorage.getItem(AUTH)!);
}

export function randomItem<T>(items: T[] | undefined): T {
  if (!items) return "" as T;
  const length = items.length;
  const index = Math.round(Math.random() * length);
  return items[index];
}
