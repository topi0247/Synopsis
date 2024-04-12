import { getLocalStorage } from "@/localStorage";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
export const baseClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authClient = axios.create({
  baseURL: `${API_URL}/api/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
});

authClient.interceptors.request.use((config) => {
  config.headers["access-token"] = getLocalStorage("access-token");
  config.headers.client = getLocalStorage("client");
  config.headers.uid = getLocalStorage("uid");
  config.headers.expiry = getLocalStorage("expiry");
  return config;
});
