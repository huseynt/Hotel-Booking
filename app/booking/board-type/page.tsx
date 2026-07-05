"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setBoardType } from "@/store/bookingSlice";
import { boardTypeSchema, type BoardTypeFormData } from "@/lib/validation";
import { boardTypes } from "@/lib/data";
import { BookingLayout } from "@/components/booking/BookingLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { useBookingGuard } from "@/lib/booking/guards";

export default function BoardTypePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isChecking } = useBookingGuard({
    requiresCitizenship: true,
    requiresDates: true,
    requiresDestination: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<BoardTypeFormData>({
    resolver: zodResolver(boardTypeSchema),
    mode: "onChange",
  });

  const selectedBoardType = watch("boardType");

  if (isChecking) return null;

  const onSubmit = (data: BoardTypeFormData) => {
    dispatch(setBoardType(data.boardType));
    router.push("/booking/daily-plan");
  };

  return (
    <BookingLayout
      currentStep={4}
      title="Choose your board type"
      onBack={() => router.push("/booking/destination")}
      onNext={handleSubmit(onSubmit)}
      nextDisabled={!isValid}
    >
      <form className="space-y-4">
        {boardTypes.map((board) => (
          <label key={board.code}>
            <Card
              className={`cursor-pointer transition-colors mt-2 ${
                selectedBoardType === board.code
                  ? "border-primary bg-primary/10"
                  : ""
              }`}
            >
              <CardContent className="py-4 flex items-start gap-4">
                <input
                  type="radio"
                  {...register("boardType")}
                  value={board.code}
                  className="mt-1 cursor-pointer"
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {board.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {board.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </label>
        ))}
        {errors.boardType && <p className="text-sm text-danger">{errors.boardType.message}</p>}
      </form>
    </BookingLayout>
  );
}