import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const bgColor = gender === "FEMALE" ? "FF6B9D" : "4A90E2";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=${bgColor}&color=fff&size=200&bold=true`;
}

export function getInitials(name: string) {
  const cleanName = name.replace(/^dr\.?\s*/i, "").trim();
  return cleanName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export function getAvatarBgClass(gender: "MALE" | "FEMALE") {
  return gender === "FEMALE" ? "bg-pink-500" : "bg-blue-500";
}

export function getDisplayInitial(name: string) {
  const cleanName = name.replace(/^dr\.?\s*/i, "").trim();
  return cleanName.charAt(0).toUpperCase();
}

export function isGeneratedAvatarUrl(imageUrl?: string) {
  return Boolean(
    imageUrl?.startsWith("https://ui-avatars.com/api/") ||
      imageUrl?.includes("ui-avatars.com/api/"),
  );
}

export function getAvatarUrl(
  name: string,
  gender: "MALE" | "FEMALE",
  imageUrl?: string,
) {
  return imageUrl || generateAvatar(name, gender);
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

//  ai generated 🎉
export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

export const getAvailableTimeSlots = () => {
  return [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
  ];
};

export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "₹150" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "₹200" },
  {
    id: "consultation",
    name: "Consultation",
    duration: "30 min",
    price: "₹100",
  },
  {
    id: "emergency",
    name: "Emergency Visit",
    duration: "30 min",
    price: "₹250",
  },
];
