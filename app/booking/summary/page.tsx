"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { resetBooking } from "@/store/bookingSlice";
import { BookingLayout } from "@/components/booking/BookingLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { countries, destinationCountries, boardTypes, hotels, meals } from "@/lib/data";
import { useBookingGuard } from "@/lib/booking/guards";
import type { RootState } from "@/store";

export default function SummaryPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isChecking } = useBookingGuard({
    requiresCitizenship: true,
    requiresDates: true,
    requiresDestination: true,
    requiresBoardType: true,
  });
  const booking = useSelector((state: RootState) => state.booking);

  const {
    citizenship,
    startDate,
    numberOfDays,
    destinationCountry,
    boardType,
    dailySelections,
  } = booking;

  const citizenshipName = countries.find((c) => c.id === citizenship)?.name;
  const destinationName = destinationCountries.find((c) => c.id === destinationCountry)?.name;
  const boardTypeName = boardTypes.find((b) => b.code === boardType)?.name;

  const { perDayBreakdown, grandTotal } = useMemo(() => {
    const breakdown = dailySelections.map((daily) => {
      const hotel = hotels.find((h) => h.id === daily.hotelId);
      const lunch = meals.find((m) => m.id === daily.lunchMealId);
      const dinner = meals.find((m) => m.id === daily.dinnerMealId);

      const dayTotal = (hotel?.price || 0) + (lunch?.price || 0) + (dinner?.price || 0);

      return { daily, hotel, lunch, dinner, dayTotal };
    });

    const total = breakdown.reduce((sum, item) => sum + item.dayTotal, 0);

    return { perDayBreakdown: breakdown, grandTotal: total };
  }, [dailySelections]);

  if (isChecking) return null;

  const handleNewBooking = () => {
    dispatch(resetBooking());
    router.push("/");
  };

  return (
    <BookingLayout
      currentStep={6}
      title="Review your booking"
      onBack={() => router.push("/booking/daily-plan")}
      onNext={handleNewBooking}
      nextLabel="Start New Booking"
    >
      <div className="space-y-6">
        {/* Configuration Summary */}
        <Card className="border-border bg-card">
          <CardHeader>
            <h2 className="text-lg font-semibold text-foreground">
              Your Selection
            </h2>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Citizenship: </span>
              <span className="font-medium text-foreground">{citizenshipName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Destination: </span>
              <span className="font-medium text-foreground">{destinationName}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Dates: </span>
              <span className="font-medium text-foreground">
                {startDate} • {numberOfDays} nights
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Board Type: </span>
              <span className="font-medium text-foreground">{boardTypeName}</span>
            </div>
          </CardContent>
        </Card>

        {/* Daily Breakdown */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">
            Daily Breakdown
          </h3>
          <div className="space-y-2">
            {perDayBreakdown.map(({ daily, hotel, lunch, dinner, dayTotal }) => (
              <Card key={daily.day}>
                <CardContent className="py-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-foreground">
                        Day {daily.day}: {hotel?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{daily.date}</div>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Hotel: ${hotel?.price || 0}</div>
                    {lunch && <div>Lunch: ${lunch.price}</div>}
                    {dinner && <div>Dinner: ${dinner.price}</div>}
                  </div>
                  <div className="mt-2 border-t border-border pt-2 font-semibold text-foreground">
                    Day Total: ${dayTotal}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Grand Total */}
        <Card className="border-border bg-primary text-primary-foreground">
          <CardContent className="py-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-primary-foreground">Grand Total:</span>
              <span className="text-3xl font-bold text-secondary">${grandTotal}</span>
            </div>
          </CardContent>
        </Card>

        {/* Edit Links */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => router.push("/booking/citizenship")}
            className="text-primary hover:underline"
          >
            Edit Citizenship
          </button>
          <button
            onClick={() => router.push("/booking/dates")}
            className="text-primary hover:underline"
          >
            Edit Dates
          </button>
          <button
            onClick={() => router.push("/booking/destination")}
            className="text-primary hover:underline"
          >
            Edit Destination
          </button>
          <button
            onClick={() => router.push("/booking/board-type")}
            className="text-primary hover:underline"
          >
            Edit Board Type
          </button>
        </div>
      </div>
    </BookingLayout>
  );
}