"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDateRange } from "@/store/bookingSlice";
import { dateRangeSchema, type DateRangeFormData } from "@/lib/validation";
import { BookingLayout } from "@/components/booking/BookingLayout";
import { useBookingGuard } from "@/lib/booking/guards";

function countNights(startDate: string, endDate: string) {
  if (!startDate || !endDate) return 0;
  const diff = new Date(endDate).getTime() - new Date(startDate).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export default function DatesPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isChecking } = useBookingGuard({ requiresCitizenship: true });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<DateRangeFormData>({
    resolver: zodResolver(dateRangeSchema),
    mode: "onChange",
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const nights = countNights(startDate, endDate);

  if (isChecking) return null;

  const onSubmit = (data: DateRangeFormData) => {
    dispatch(
      setDateRange({
        startDate: data.startDate,
        numberOfDays: countNights(data.startDate, data.endDate),
      })
    );
    router.push("/booking/destination");
  };

  return (
    <BookingLayout
      currentStep={2}
      title="When are you traveling?"
      onBack={() => router.push("/booking/citizenship")}
      onNext={handleSubmit(onSubmit)}
      nextDisabled={!isValid}
    >
      <form className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-foreground">
              From
            </label>
            <input
              id="startDate"
              type="date"
              {...register("startDate")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.startDate && (
              <p className="mt-2 text-sm text-danger">{errors.startDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-foreground">
              To
            </label>
            <input
              id="endDate"
              type="date"
              min={startDate || undefined}
              {...register("endDate")}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {errors.endDate && (
              <p className="mt-2 text-sm text-danger">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        {nights > 0 && !errors.startDate && !errors.endDate && (
          <div className="rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            Trip length: <span className="font-semibold text-foreground">{nights} {nights === 1 ? "night" : "nights"}</span>
          </div>
        )}
      </form>
    </BookingLayout>
  );
}