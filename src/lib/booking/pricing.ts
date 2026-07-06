import { hotels, meals } from "@/lib/data";
import type { DailySelection } from "@/types/booking";

export type DayPriceBreakdown = {
  day: number;
  hotelPrice: number;
  lunchPrice: number;
  dinnerPrice: number;
  dayTotal: number;
};

/**
 * Calculates the price breakdown for a single day based on the
 * selected hotel and meals. Missing selections contribute 0.
 */
export function calculateDayTotal(daily: DailySelection): DayPriceBreakdown {
  const hotel = hotels.find((h) => h.id === daily.hotelId);
  const lunch = meals.find((m) => m.id === daily.lunchMealId);
  const dinner = meals.find((m) => m.id === daily.dinnerMealId);

  const hotelPrice = hotel?.price ?? 0;
  const lunchPrice = lunch?.price ?? 0;
  const dinnerPrice = dinner?.price ?? 0;

  return {
    day: daily.day,
    hotelPrice,
    lunchPrice,
    dinnerPrice,
    dayTotal: hotelPrice + lunchPrice + dinnerPrice,
  };
}

/**
 * Calculates the full booking price: a per-day breakdown plus the
 * grand total across all days.
 * Formula: Total = Σ(Hotel Price + Selected Meal Prices) for all days
 */
export function calculateBookingTotal(dailySelections: DailySelection[]): {
  breakdown: DayPriceBreakdown[];
  grandTotal: number;
} {
  const breakdown = dailySelections.map(calculateDayTotal);
  const grandTotal = breakdown.reduce((sum, day) => sum + day.dayTotal, 0);

  return { breakdown, grandTotal };
}
