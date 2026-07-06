import bookingReducer, {
  setCitizenship,
  setDateRange,
  setDestination,
  setBoardType,
  setDailyHotel,
  setDailyMeal,
  resetBooking,
} from "./bookingSlice";
import type { BookingState } from "@/types/booking";

const initialState: BookingState = {
  citizenship: null,
  startDate: null,
  numberOfDays: null,
  destinationCountry: null,
  boardType: null,
  dailySelections: [],
};

describe("bookingSlice reducer", () => {
  it("returns the initial state", () => {
    expect(bookingReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("sets citizenship", () => {
    const state = bookingReducer(initialState, setCitizenship("TR"));
    expect(state.citizenship).toBe("TR");
  });

  it("generates one daily selection per day when the date range is set", () => {
    const state = bookingReducer(
      initialState,
      setDateRange({ startDate: "2026-08-01", numberOfDays: 3 })
    );
    expect(state.dailySelections).toHaveLength(3);
    expect(state.dailySelections.map((d) => d.day)).toEqual([1, 2, 3]);
    expect(state.dailySelections[0].date).toBe("2026-08-01");
    expect(state.dailySelections[2].date).toBe("2026-08-03");
  });

  it("preserves existing daily selections when the range doesn't change their dates", () => {
    let state = bookingReducer(
      initialState,
      setDateRange({ startDate: "2026-08-01", numberOfDays: 2 })
    );
    state = bookingReducer(state, setDailyHotel({ day: 1, hotelId: 5 }));

    // extend the range by one more day
    state = bookingReducer(state, setDateRange({ startDate: "2026-08-01", numberOfDays: 3 }));

    expect(state.dailySelections).toHaveLength(3);
    expect(state.dailySelections[0].hotelId).toBe(5); // day 1 selection kept
    expect(state.dailySelections[2].hotelId).toBeNull(); // new day is empty
  });

  it("clears daily hotel/meal selections when the destination changes", () => {
    let state = bookingReducer(
      initialState,
      setDateRange({ startDate: "2026-08-01", numberOfDays: 1 })
    );
    state = bookingReducer(state, setDestination("TR"));
    state = bookingReducer(state, setDailyHotel({ day: 1, hotelId: 5 }));

    state = bookingReducer(state, setDestination("IT"));

    expect(state.destinationCountry).toBe("IT");
    expect(state.dailySelections[0].hotelId).toBeNull();
  });

  describe("board type business rules", () => {
    function buildStateWithDays(numberOfDays = 1) {
      return bookingReducer(
        initialState,
        setDateRange({ startDate: "2026-08-01", numberOfDays })
      );
    }

    it("Full Board (FB): both lunch AND dinner can be selected together", () => {
      let state = buildStateWithDays();
      state = bookingReducer(state, setBoardType("FB"));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "lunch", mealId: 3 }));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "dinner", mealId: 5 }));

      expect(state.dailySelections[0].lunchMealId).toBe(3);
      expect(state.dailySelections[0].dinnerMealId).toBe(5);
    });

    it("Half Board (HB): selecting lunch clears any existing dinner selection", () => {
      let state = buildStateWithDays();
      state = bookingReducer(state, setBoardType("HB"));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "dinner", mealId: 5 }));
      expect(state.dailySelections[0].dinnerMealId).toBe(5);

      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "lunch", mealId: 3 }));

      expect(state.dailySelections[0].lunchMealId).toBe(3);
      expect(state.dailySelections[0].dinnerMealId).toBeNull(); // mutually exclusive
    });

    it("Half Board (HB): selecting dinner clears any existing lunch selection", () => {
      let state = buildStateWithDays();
      state = bookingReducer(state, setBoardType("HB"));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "lunch", mealId: 3 }));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "dinner", mealId: 5 }));

      expect(state.dailySelections[0].dinnerMealId).toBe(5);
      expect(state.dailySelections[0].lunchMealId).toBeNull();
    });

    it("No Board (NB): clears any previously selected meals", () => {
      let state = buildStateWithDays();
      state = bookingReducer(state, setBoardType("FB"));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "lunch", mealId: 3 }));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "dinner", mealId: 5 }));

      state = bookingReducer(state, setBoardType("NB"));

      expect(state.dailySelections[0].lunchMealId).toBeNull();
      expect(state.dailySelections[0].dinnerMealId).toBeNull();
    });

    it("switching from FB to HB drops one of the two meals if both were selected", () => {
      let state = buildStateWithDays();
      state = bookingReducer(state, setBoardType("FB"));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "lunch", mealId: 3 }));
      state = bookingReducer(state, setDailyMeal({ day: 1, mealType: "dinner", mealId: 5 }));

      state = bookingReducer(state, setBoardType("HB"));

      const { lunchMealId, dinnerMealId } = state.dailySelections[0];
      const selectedCount = [lunchMealId, dinnerMealId].filter((id) => id !== null).length;
      expect(selectedCount).toBeLessThanOrEqual(1);
    });
  });

  it("resets to the initial state", () => {
    let state = bookingReducer(initialState, setCitizenship("TR"));
    state = bookingReducer(state, setBoardType("FB"));
    state = bookingReducer(state, resetBooking());
    expect(state).toEqual(initialState);
  });
});
