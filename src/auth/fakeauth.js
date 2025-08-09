// simple localStorage-based mock auth (replace with Firebase later)
export const AUTH_KEY = "auth_token";
export const USER_KEY = "hoa_user";
export const ROLE_KEY = "hoa_role";

export function login({ email, password, role }) {
  if (!email || !password || !role) throw new Error("All fields are required");
  const token = Math.random().toString(36).slice(2);
  localStorage.setItem(AUTH_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
  localStorage.setItem(
    USER_KEY,
    JSON.stringify({ email, role, name: email.split("@")[0] })
  );
  return { token };
}

export function register({ name, email, password, role }) {
  if (!name || !email || !password || !role)
    throw new Error("All fields are required");
  // demo: pretend user is created, then log them in
  return login({ email, password, role });
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "{}");
  } catch {
    return {};
  }
}

export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

export function isAuthed() {
  return !!localStorage.getItem(AUTH_KEY);
}
