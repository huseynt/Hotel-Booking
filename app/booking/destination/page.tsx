"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setDestination } from "@/store/bookingSlice";
import { destinationSchema, type DestinationFormData } from "@/lib/validation";
import { destinationCountries } from "@/lib/data";
import { BookingLayout } from "@/components/booking/BookingLayout";
import { useBookingGuard } from "@/lib/booking/guards";

export default function DestinationPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isChecking } = useBookingGuard({ requiresCitizenship: true, requiresDates: true });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DestinationFormData>({
    resolver: zodResolver(destinationSchema),
    mode: "onChange",
  });

  if (isChecking) return null;

  const onSubmit = (data: DestinationFormData) => {
    dispatch(setDestination(data.destination));
    router.push("/booking/board-type");
  };

  return (
    <BookingLayout
      currentStep={3}
      title="Where do you want to go?"
      onBack={() => router.push("/booking/dates")}
      onNext={handleSubmit(onSubmit)}
      nextDisabled={!isValid}
    >
      <form className="space-y-6">
        <div>
          <label htmlFor="destination" className="mb-2 block text-sm font-medium text-foreground">
            Select destination
          </label>
          <select
            id="destination"
            {...register("destination")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-neutral-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">-- Choose --</option>
            {destinationCountries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.destination && (
            <p className="mt-2 text-sm text-danger">
              {errors.destination.message}
            </p>
          )}
        </div>
      </form>
    </BookingLayout>
  );
}