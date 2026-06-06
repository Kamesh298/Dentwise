"use client";

import { vapi } from "@/lib/vapi";
import { Button } from "../ui/button";

type Props = {
  onEnded?: () => void;
  disabled?: boolean;
};

export default function EndCallButton({ onEnded, disabled }: Props) {
  const handleEnd = async () => {
    try {
      // stop the VAPI call
      await vapi.stop();
      onEnded && onEnded();
    } catch (err) {
      console.error("Failed to end call", err);
    }
  };

  return (
    <Button
      className="w-44 text-xl rounded-3xl bg-destructive hover:bg-destructive/90 text-white"
      onClick={handleEnd}
      disabled={disabled}
    >
      End Call
    </Button>
  );
}
