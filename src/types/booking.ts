export type BoardType = "FB" | "HB" | "NB";

export type DailySelection = {
  day: number;
  date: string;
  hotelId: number | null;
  lunchMealId: number | null;
  dinnerMealId: number | null;
};

export type BookingState = {
  citizenship: string | null;
  startDate: string | null;
  numberOfDays: number | null;
  destinationCountry: string | null;
  boardType: BoardType | null;
  dailySelections: DailySelection[];
};

export type Country = {
  id: string;
  name: string;
};

export type Hotel = {
  id: number;
  name: string;
  country: string;
  price: number;
};

export type Meal = {
  id: number;
  name: string;
  type: "breakfast" | "lunch" | "dinner";
  price: number;
};

export type BoardTypeInfo = {
  code: BoardType;
  name: string;
  description: string;
};
