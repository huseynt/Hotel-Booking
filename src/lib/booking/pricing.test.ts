import { calculateDayTotal, calculateBookingTotal } from "./pricing";
import { hotels, meals } from "@/lib/data";
import type { DailySelection } from "@/types/booking";

const hotel = hotels[0]; // used just to read a real price from the data set
const lunch = meals.find((m) => m.type === "lunch")!;
const dinner = meals.find((m) => m.type === "dinner")!;

function makeDay(overrides: Partial<DailySelection> = {}): DailySelection {
  return {
    day: 1,
    date: "2026-08-01",
    hotelId: null,
    lunchMealId: null,
    dinnerMealId: null,
    ...overrides,
  };
}

describe("calculateDayTotal", () => {
  it("returns 0 for a day with no selections", () => {
    const result = calculateDayTotal(makeDay());
    expect(result.dayTotal).toBe(0);
  });

  it("adds only the hotel price when no meals are selected (No Board)", () => {
    const result = calculateDayTotal(makeDay({ hotelId: hotel.id }));
    expect(result.hotelPrice).toBe(hotel.price);
    expect(result.lunchPrice).toBe(0);
    expect(result.dinnerPrice).toBe(0);
    expect(result.dayTotal).toBe(hotel.price);
  });

  it("adds hotel + one meal (Half Board style selection)", () => {
    const result = calculateDayTotal(
      makeDay({ hotelId: hotel.id, lunchMealId: lunch.id })
    );
    expect(result.dayTotal).toBe(hotel.price + lunch.price);
  });

  it("adds hotel + both meals (Full Board selection)", () => {
    const result = calculateDayTotal(
      makeDay({ hotelId: hotel.id, lunchMealId: lunch.id, dinnerMealId: dinner.id })
    );
    expect(result.dayTotal).toBe(hotel.price + lunch.price + dinner.price);
  });

  it("ignores an invalid/unknown id and treats it as 0", () => {
    const result = calculateDayTotal(makeDay({ hotelId: 999999 }));
    expect(result.hotelPrice).toBe(0);
  });
});

describe("calculateBookingTotal", () => {
  it("returns a 0 grand total for an empty trip", () => {
    const { breakdown, grandTotal } = calculateBookingTotal([]);
    expect(breakdown).toHaveLength(0);
    expect(grandTotal).toBe(0);
  });

  it("sums the per-day totals across multiple days (Σ Hotel + Meals)", () => {
    const days: DailySelection[] = [
      makeDay({ day: 1, hotelId: hotel.id, lunchMealId: lunch.id, dinnerMealId: dinner.id }),
      makeDay({ day: 2, date: "2026-08-02", hotelId: hotel.id, lunchMealId: lunch.id }),
      makeDay({ day: 3, date: "2026-08-03", hotelId: hotel.id }),
    ];

    const { breakdown, grandTotal } = calculateBookingTotal(days);

    const expectedTotal =
      hotel.price + lunch.price + dinner.price + // day 1 (FB-style)
      hotel.price + lunch.price + // day 2 (HB-style)
      hotel.price; // day 3 (NB-style)

    expect(breakdown).toHaveLength(3);
    expect(grandTotal).toBe(expectedTotal);
  });
});
