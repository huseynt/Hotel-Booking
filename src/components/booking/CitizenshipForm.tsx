"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCitizenship } from "@/store/bookingSlice";
import { citizenshipSchema, type CitizenshipFormData } from "@/lib/validation";
import { countries } from "@/lib/data";
import { BookingLayout } from "@/components/booking/BookingLayout";

export function CitizenshipForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CitizenshipFormData>({
    resolver: zodResolver(citizenshipSchema),
    mode: "onChange",
  });

  const onSubmit = (data: CitizenshipFormData) => {
    dispatch(setCitizenship(data.citizenship));
    router.push("/booking/dates");
  };

  return (
    <BookingLayout
      currentStep={1}
      title="Where are you from?"
      onBack={() => router.push("/")}
      onNext={handleSubmit(onSubmit)}
      nextDisabled={!isValid}
    >
      <form className="space-y-6">
        <div>
          <label htmlFor="citizenship" className="mb-2 block text-sm font-medium text-foreground">
            Select your citizenship
          </label>
          <select
            id="citizenship"
            {...register("citizenship")}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-neutral-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">-- Choose --</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.citizenship && (
            <p className="mt-2 text-sm text-danger">
              {errors.citizenship.message}
            </p>
          )}
        </div>
      </form>
    </BookingLayout>
  );
}
