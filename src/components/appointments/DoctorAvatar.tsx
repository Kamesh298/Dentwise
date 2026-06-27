import { getAvatarBgClass, getDisplayInitial } from "@/lib/utils";

interface DoctorAvatarProps {
  name: string;
  gender: "MALE" | "FEMALE";
  imageUrl?: string;
  size?: number;
  className?: string;
}

export default function DoctorAvatar({
  name,
  gender,
  imageUrl: _imageUrl,
  size = 48,
  className = "",
}: DoctorAvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ring-2 ring-background text-white font-semibold text-lg ${getAvatarBgClass(
        gender,
      )} ${className}`}
      style={{ width: size, height: size }}
    >
      {getDisplayInitial(name)}
    </div>
  );
}
