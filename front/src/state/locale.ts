"use client";
import { atom } from "recoil";

export const localeState = atom<string>({
  key: "localeState",
  default: "ja",
});
