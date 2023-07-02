import { OS } from "../atom/atom";
import { hexArray } from "./constants";

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
  // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  //   navigator.userAgent
  // );
}

export function isExist(data: any): boolean {
  if (!data) return false;
  if (data === "") return false;
  return true;
}

export function isEmpty(data: any): boolean {
  if (!data) return true;
  if (data === "") return true;
  return false;
}
