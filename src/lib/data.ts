export const countries = [
  { id: "TR", name: "Turkey" },
  { id: "GB", name: "United Kingdom" },
  { id: "DE", name: "Germany" },
  { id: "FR", name: "France" },
  { id: "IT", name: "Italy" },
  { id: "ES", name: "Spain" },
  { id: "US", name: "United States" },
  { id: "CA", name: "Canada" },
  { id: "AU", name: "Australia" },
  { id: "JP", name: "Japan" },
  { id: "CN", name: "China" },
  { id: "IN", name: "India" },
  { id: "BR", name: "Brazil" },
  { id: "MX", name: "Mexico" },
  { id: "ZA", name: "South Africa" },
];

export const destinationCountries = [
  { id: "TR", name: "Turkey" },
  { id: "GR", name: "Greece" },
  { id: "IT", name: "Italy" },
  { id: "ES", name: "Spain" },
  { id: "PT", name: "Portugal" },
  { id: "HR", name: "Croatia" },
];

export const hotels = [
  { id: 1, name: "Mediterranean Resort", country: "TR", price: 150 },
  { id: 2, name: "Aegean Waves", country: "TR", price: 120 },
  { id: 3, name: "Santorini Dreams", country: "GR", price: 200 },
  { id: 4, name: "Athens Palace", country: "GR", price: 180 },
  { id: 5, name: "Roman Elegance", country: "IT", price: 160 },
  { id: 6, name: "Amalfi Coast Villa", country: "IT", price: 220 },
  { id: 7, name: "Barcelona Beachfront", country: "ES", price: 140 },
  { id: 8, name: "Seville Heritage", country: "ES", price: 130 },
  { id: 9, name: "Lisbon Riverside", country: "PT", price: 110 },
  { id: 10, name: "Dubrovnik Paradise", country: "HR", price: 175 },
];

export const boardTypes = [
  {
    code: "NB" as const,
    name: "No Board",
    description: "Room only, no meals included",
  },
  {
    code: "HB" as const,
    name: "Half Board",
    description: "Breakfast and one meal (lunch or dinner) included",
  },
  {
    code: "FB" as const,
    name: "Full Board",
    description: "Breakfast, lunch, and dinner included",
  },
];

export const meals = [
  { id: 1, name: "Continental Breakfast", type: "breakfast" as const, price: 15 },
  { id: 2, name: "English Breakfast", type: "breakfast" as const, price: 20 },
  { id: 3, name: "Lunch Buffet", type: "lunch" as const, price: 25 },
  { id: 4, name: "Gourmet Lunch", type: "lunch" as const, price: 35 },
  { id: 5, name: "Dinner Buffet", type: "dinner" as const, price: 30 },
  { id: 6, name: "Fine Dining", type: "dinner" as const, price: 50 },
];
