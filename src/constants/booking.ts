import { ArrowRight, Calendar, CreditCard, MapPin, ShieldCheck } from "lucide-react";

export const navigationLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#highlights", label: "Highlights" },
  { href: "#destinations", label: "Destinations" },
] as const;

export const heroStats = [
  { value: "3", label: "booking steps" },
  { value: "3", label: "board types" },
  { value: "Live", label: "price breakdown" },
] as const;

export const processSteps = [
  {
    icon: MapPin,
    title: "Choose a destination",
    description:
      "Pick your citizenship-friendly destination and move into the booking flow with the right hotel list.",
  },
  {
    icon: Calendar,
    title: "Set dates and board type",
    description:
      "Select your arrival date, trip length, and meal plan before you choose daily meal details.",
  },
  {
    icon: CreditCard,
    title: "Review the total",
    description:
      "See your hotel, board selection, and final cost summarized in one place before confirming.",
  },
] as const;

export const highlights = [
  "Flexible board types: Full Board, Half Board, and No Board.",
  "Daily meal configuration for each day of the stay.",
  "Live pricing that updates as the booking changes.",
  "Persistent booking state across page refreshes.",
] as const;

export const destinationCards = [
  {
    country: "Turkey",
    hotels: 2,
    from: 90,
    note: "Best for city breaks and coastal stays.",
  },
  {
    country: "UAE",
    hotels: 2,
    from: 200,
    note: "Premium hotels with fast booking flow.",
  },
  {
    country: "Italy",
    hotels: 1,
    from: 150,
    note: "Compact selection for a focused trip.",
  },
] as const;

export const boardPlans = [
  {
    code: "FB",
    title: "Full Board",
    description: "Breakfast, lunch, and dinner are included in the daily rate.",
    tone: "bg-primary text-primary-foreground",
  },
  {
    code: "HB",
    title: "Half Board",
    description: "Breakfast plus one additional meal, chosen per day.",
    tone: "bg-secondary text-secondary-foreground",
  },
  {
    code: "NB",
    title: "No Board",
    description: "Room only, with no meal selections and no meal surcharge.",
    tone: "border border-border bg-card text-card-foreground",
  },
] as const;