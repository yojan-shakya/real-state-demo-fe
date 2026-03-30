import { createContext, useEffect, useState, type ReactNode } from "react"
import { AdminService, type Role } from "../service"

export const AuthContext = createContext<{
  role: Role
  toggleRole: () => void
}>({
  role: "buyer",
  toggleRole: () => {},
})

interface AuthProviderProps {
  children: ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [role, setRole] = useState<Role>("buyer")

  const toggleRole = () => {
    const updatedRole: Role = role === "admin" ? "buyer" : "admin"
    setRole(updatedRole)
    AdminService.setRole(updatedRole)
  }

  useEffect(() => {
    setRole(AdminService.getRole())
  }, [])

  return (
    <AuthContext.Provider
      value={{
        role,
        toggleRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
