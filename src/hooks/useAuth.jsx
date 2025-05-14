import { toast } from "react-toastify";

export function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

export function isAuthenticatedAdmin() {
  return localStorage.getItem("r") === "a";
}

export function getUserRole() {
  const role = localStorage.getItem("r");

  if (!role) return null;
  if (role === "a") {
    return "admin";
  } else {
    return "user";
  }
}

export function getToken() {
  return localStorage.getItem("token") || null;
}

export function autoLogout() {
  localStorage.clear();
  toast.info("Session expired. PLease login again.");
  window.location.href = "/";
}
