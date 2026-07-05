"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setDailyHotel, setDailyMeal } from "@/store/bookingSlice";
import { BookingLayout } from "@/components/booking/BookingLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { hotels, meals } from "@/lib/data";
import { useBookingGuard } from "@/lib/booking/guards";
import type { RootState } from "@/store";

export default function DailyPlanPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isChecking } = useBookingGuard({
    requiresCitizenship: true,
    requiresDates: true,
    requiresDestination: true,
    requiresBoardType: true,
  });
  const booking = useSelector((state: RootState) => state.booking);

  const { destinationCountry, boardType, dailySelections } = booking;

  if (isChecking) return null;

  const destinationHotels = hotels.filter((h) => h.country === destinationCountry);
  const mealsByType = {
    lunch: meals.filter((m) => m.type === "lunch"),
    dinner: meals.filter((m) => m.type === "dinner"),
  };

  const allHotelsSelected = dailySelections.every((d) => d.hotelId !== null);

  const handleHotelChange = (day: number, hotelId: number | null) => {
    dispatch(setDailyHotel({ day, hotelId }));
  };

  const handleMealChange = (
    day: number,
    mealType: "lunch" | "dinner",
    mealId: number | null
  ) => {
    dispatch(setDailyMeal({ day, mealType, mealId }));
  };

  return (
    <BookingLayout
      currentStep={5}
      title="Daily selections"
      onBack={() => router.push("/booking/board-type")}
      onNext={() => router.push("/booking/summary")}
      nextDisabled={!allHotelsSelected}
    >
      <div className="space-y-6">
        {dailySelections.map((daily) => {
          const selectedHotel = destinationHotels.find((h) => h.id === daily.hotelId);
          const selectedLunch = mealsByType.lunch.find((m) => m.id === daily.lunchMealId);
          const selectedDinner = mealsByType.dinner.find((m) => m.id === daily.dinnerMealId);

          return (
            <Card key={daily.day} className="transition-all duration-300 hover:-translate-y-0.5">
              <CardContent className="py-4 space-y-4">
                <div className="text-sm text-muted-foreground">
                  Day {daily.day} • {daily.date}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Hotel
                  </label>
                  <select
                    value={daily.hotelId || ""}
                    onChange={(e) =>
                      handleHotelChange(daily.day, e.target.value ? Number(e.target.value) : null)
                    }
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-neutral-500 transition-colors duration-200"
                  >
                    <option value="">-- Select hotel --</option>
                    {destinationHotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name} (${hotel.price}/night)
                      </option>
                    ))}
                  </select>
                </div>

                {boardType !== "NB" && (
                  <div className="space-y-3">
                    {boardType === "HB" && (
                      <p className="text-xs text-muted-foreground">
                        Choose either lunch or dinner
                      </p>
                    )}
                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Lunch
                      </label>
                      <select
                        value={daily.lunchMealId || ""}
                        onChange={(e) =>
                          handleMealChange(daily.day, "lunch", e.target.value ? Number(e.target.value) : null)
                        }
                        disabled={boardType === "HB" && daily.dinnerMealId !== null}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-neutral-500 transition-colors duration-200 disabled:opacity-50"
                      >
                        <option value="">-- None --</option>
                        {mealsByType.lunch.map((meal) => (
                          <option key={meal.id} value={meal.id}>
                            {meal.name} (+${meal.price})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-foreground">
                        Dinner
                      </label>
                      <select
                        value={daily.dinnerMealId || ""}
                        onChange={(e) =>
                          handleMealChange(daily.day, "dinner", e.target.value ? Number(e.target.value) : null)
                        }
                        disabled={boardType === "HB" && daily.lunchMealId !== null}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-neutral-500 transition-colors duration-200 disabled:opacity-50"
                      >
                        <option value="">-- None --</option>
                        {mealsByType.dinner.map((meal) => (
                          <option key={meal.id} value={meal.id}>
                            {meal.name} (+${meal.price})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                <div className="border-t border-border pt-3">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Daily total: </span>
                    <span className="font-semibold text-foreground">
                      $
                      {selectedHotel
                        ? selectedHotel.price + (selectedLunch?.price || 0) + (selectedDinner?.price || 0)
                        : 0}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </BookingLayout>
  );
}