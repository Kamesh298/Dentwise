import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  // Primary service
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  const primaryUrl = gender === "FEMALE" ? `${base}/girl?username=${username}` : `${base}/boy?username=${username}`;
  
  // Fallback to UI Avatars with initials
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const bgColor = gender === "FEMALE" ? "FF6B9D" : "4A90E2";
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=200&bold=true`;
  
  // Return both - browser will use primary if available, fallback if not
  return fallbackUrl; // Use fallback directly since primary service is unreliable
}

// phone formatting function for Indian mobile numbers (10 digits)
export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // Remove all non-digit characters
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;

  // If less than 6 digits, show as is
  if (phoneNumberLength < 6) return phoneNumber;

  // If less than 11 digits, format as 98765 43210
  if (phoneNumberLength <= 10) {
    return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5, 10)}`;
  }

  // If country code included (+91), format as +91 98765 43210
  return `+${phoneNumber.slice(0, 2)} ${phoneNumber.slice(2, 7)} ${phoneNumber.slice(7, 12)}`;
};