export type Role = "admin" | "buyer"

const LOCAL_STORAGE_ROLE_KEY = "role"

function setRole(role: Role) {
  localStorage.setItem(LOCAL_STORAGE_ROLE_KEY, role)
}

function getRole(): Role {
  return localStorage.getItem(LOCAL_STORAGE_ROLE_KEY || "buyer") as Role
}

export const AdminService = {
  getRole,
  setRole,
}
