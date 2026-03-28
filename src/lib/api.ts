import Axios, { type InternalAxiosRequestConfig } from "axios"

export const api = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use(async (request: InternalAxiosRequestConfig) => {
  if (request.headers && localStorage.getItem("role") === "admin") {
    request.headers["x-admin"] = "true"
  }

  return request
})
