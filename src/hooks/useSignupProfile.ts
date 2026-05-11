"use client";

import { useSyncExternalStore } from "react";

export const SIGNUP_PROFILE_KEY = "medipic_signup_profile";
const SIGNUP_PROFILE_EVENT = "medipic_signup_profile_changed";

export function hasSignupProfile() {
  if (typeof window === "undefined") return false;
  return Boolean(window.localStorage.getItem(SIGNUP_PROFILE_KEY));
}

export function notifySignupProfileChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(SIGNUP_PROFILE_EVENT));
}

export function useSignupProfileStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      window.addEventListener(SIGNUP_PROFILE_EVENT, callback);
      return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener(SIGNUP_PROFILE_EVENT, callback);
      };
    },
    hasSignupProfile,
    () => false,
  );
}
