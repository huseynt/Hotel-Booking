"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect, useState } from "react";

interface GuardConfig {
  requiresCitizenship?: boolean;
  requiresDates?: boolean;
  requiresDestination?: boolean;
  requiresBoardType?: boolean;
}

export function useBookingGuard(config: GuardConfig = {}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const booking = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    const checkPrerequisites = () => {
      if (config.requiresCitizenship && !booking.citizenship) {
        router.push("/booking/citizenship");
        return;
      }
      if (config.requiresDates && (!booking.startDate || !booking.numberOfDays)) {
        router.push("/booking/citizenship");
        return;
      }
      if (config.requiresDestination && !booking.destinationCountry) {
        router.push("/booking/citizenship");
        return;
      }
      if (config.requiresBoardType && !booking.boardType) {
        router.push("/booking/citizenship");
        return;
      }
      setIsChecking(false);
    };

    checkPrerequisites();
  }, [booking, config, router]);

  return { isChecking };
}
