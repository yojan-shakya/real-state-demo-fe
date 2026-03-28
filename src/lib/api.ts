import { AuthService } from "@/services/auth-service"
import Axios, { type InternalAxiosRequestConfig } from "axios"

export const API = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

API.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
  if (request.headers && AuthService.getRole() === "admin") {
    request.headers["x-admin"] = "true"
  }

  return request
})
