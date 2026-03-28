type Role = "admin" | "buyer" | "agent"

const ROLE_KEY = "role"

function getRole(): Role {
  return (localStorage.getItem(ROLE_KEY) || "buyer") as Role
}

function setRole(role: Role) {
  localStorage.setItem(ROLE_KEY, role)
}

export const AuthService = {
  getRole,
  setRole,
}
