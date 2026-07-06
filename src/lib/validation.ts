import { z } from "zod";

export const citizenshipSchema = z.object({
  citizenship: z.string().min(1, "Citizenship is required"),
});

export type CitizenshipFormData = z.infer<typeof citizenshipSchema>;

export const dateRangeSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return new Date(data.startDate) >= today;
    },
    { message: "Start date cannot be in the past", path: ["startDate"] }
  )
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after the start date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const days =
        Math.round(
          (new Date(data.endDate).getTime() - new Date(data.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + 1;
      return days <= 30;
    },
    { message: "Trip can be at most 30 days", path: ["endDate"] }
  );

export type DateRangeFormData = z.infer<typeof dateRangeSchema>;

export const destinationSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
});

export type DestinationFormData = z.infer<typeof destinationSchema>;

export const boardTypeSchema = z.object({
  boardType: z.enum(["NB", "HB", "FB"]),
});

export type BoardTypeFormData = z.infer<typeof boardTypeSchema>;