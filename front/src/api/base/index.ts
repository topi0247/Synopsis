import { getSession } from "@/session";
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
  config.headers["access-token"] = getSession("access-token");
  config.headers.client = getSession("client");
  config.headers.uid = getSession("uid");
  config.headers.expiry = getSession("expiry");
  return config;
});
