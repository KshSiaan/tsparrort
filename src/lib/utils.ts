
/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { apiConfig } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const API_BASE = apiConfig.baseUrl ?? "/api";

interface ApiClientOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  token?: string;
  headers?: Record<string, string>;
}

export async function howl<T>(
  endpoint: string,
  { method = "GET", body, token, headers = {} }: ApiClientOptions = {}
): Promise<T> {
const res = await fetch(`${API_BASE}${endpoint}`, {
  method,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  },
  body: body ? JSON.stringify(body) : undefined,
});


  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error((errorData as any).message || "API request failed");
  }
  
  return res.json() as Promise<T>;
}

export type idk = any;
