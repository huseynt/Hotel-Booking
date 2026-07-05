import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { BookingState, DailySelection, BoardType } from "@/types/booking";

const initialState: BookingState = {
  citizenship: null,
  startDate: null,
  numberOfDays: null,
  destinationCountry: null,
  boardType: null,
  dailySelections: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCitizenship: (state, action: PayloadAction<string>) => {
      state.citizenship = action.payload;
    },
    setDateRange: (
      state,
      action: PayloadAction<{ startDate: string; numberOfDays: number }>
    ) => {
      state.startDate = action.payload.startDate;
      state.numberOfDays = action.payload.numberOfDays;
      regenerateDailySelections(state);
    },
    setDestination: (state, action: PayloadAction<string>) => {
      if (state.destinationCountry !== action.payload) {
        state.destinationCountry = action.payload;
        state.dailySelections = state.dailySelections.map((d) => ({
          ...d,
          hotelId: null,
          lunchMealId: null,
          dinnerMealId: null,
        }));
      }
    },
    setBoardType: (state, action: PayloadAction<BoardType>) => {
      state.boardType = action.payload;
      normalizeDailyForBoardType(state, action.payload);
    },
    setDailyHotel: (
      state,
      action: PayloadAction<{ day: number; hotelId: number | null }>
    ) => {
      const daily = state.dailySelections.find((d) => d.day === action.payload.day);
      if (daily) {
        daily.hotelId = action.payload.hotelId;
      }
    },
    setDailyMeal: (
      state,
      action: PayloadAction<{
        day: number;
        mealType: "lunch" | "dinner";
        mealId: number | null;
      }>
    ) => {
      const daily = state.dailySelections.find((d) => d.day === action.payload.day);
      if (daily) {
        if (action.payload.mealType === "lunch") {
          daily.lunchMealId = action.payload.mealId;
          if (state.boardType === "HB" && action.payload.mealId !== null) {
            daily.dinnerMealId = null;
          }
        } else {
          daily.dinnerMealId = action.payload.mealId;
          if (state.boardType === "HB" && action.payload.mealId !== null) {
            daily.lunchMealId = null;
          }
        }
      }
    },
    resetBooking: () => initialState,
  },
});

function regenerateDailySelections(state: BookingState) {
  if (!state.startDate || !state.numberOfDays) return;

  const start = new Date(state.startDate);
  const newDaily: DailySelection[] = [];

  for (let i = 0; i < state.numberOfDays; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0];

    const existing = state.dailySelections.find((d) => d.date === dateStr);
    if (existing) {
      newDaily.push(existing);
    } else {
      newDaily.push({
        day: i + 1,
        date: dateStr,
        hotelId: null,
        lunchMealId: null,
        dinnerMealId: null,
      });
    }
  }

  state.dailySelections = newDaily;
}

function normalizeDailyForBoardType(state: BookingState, boardType: BoardType) {
  state.dailySelections.forEach((daily) => {
    if (boardType === "FB") {
      daily.lunchMealId = null;
      daily.dinnerMealId = null;
    } else if (boardType === "NB") {
      daily.lunchMealId = null;
      daily.dinnerMealId = null;
    } else if (boardType === "HB") {
      if (daily.lunchMealId !== null && daily.dinnerMealId !== null) {
        daily.dinnerMealId = null;
      }
    }
  });
}

export const {
  setCitizenship,
  setDateRange,
  setDestination,
  setBoardType,
  setDailyHotel,
  setDailyMeal,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
