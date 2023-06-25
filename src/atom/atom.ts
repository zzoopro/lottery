import { MouseEventHandler, ReactNode } from "react";
import { atom } from "recoil";

export interface IPopup {
  isShow: boolean;
  element: ReactNode | null;
  title: string;
  content: string;
  onConfirm: MouseEventHandler | undefined;
  onReject: MouseEventHandler | undefined;
  onDimmedClick: MouseEventHandler | undefined;
  numberOfButton: number;
  confirmText: string;
  rejectText: string;
}

export const INIT_POPUP: IPopup = {
  isShow: false,
  element: null,
  title: "",
  content: "",
  onConfirm: undefined,
  onReject: undefined,
  onDimmedClick: undefined,
  numberOfButton: 1,
  confirmText: "",
  rejectText: "",
};
export const popupAtom = atom<IPopup>({
  key: "popup", // unique ID (with respect to other atoms/selectors)
  default: INIT_POPUP, // default value (aka initial value)
});

export const loadingAtom = atom<boolean>({
  key: "loading",
  default: false,
});
