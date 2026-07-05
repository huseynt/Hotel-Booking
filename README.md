# BookWiz - Hotel Booking Wizard

A multi-step hotel booking application built with Next.js 16, React, TypeScript, Tailwind CSS, Redux Toolkit, and form validation.

## Features

- **Multi-step wizard** with 6 booking steps
- **Real-time validation** using React Hook Form + Zod
- **Persistent state** with Redux Toolkit + redux-persist
- **Light/Dark mode** support with next-themes
- **Responsive design** optimized for mobile and desktop
- **SEO-ready** with metadata and semantic HTML
- **Business rules enforcement**:
  - Full Board (FB): All meals included, no extras selection
  - Half Board (HB): Breakfast + lunch/dinner (mutually exclusive per day)
  - No Board (NB): No meals included
- **Real-time pricing** breakdown and total calculation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repo>
cd hotel_booking_system
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Architecture

### State Management

Redux Toolkit manages booking state with persistence:
- `citizenship`: User's citizenship
- `startDate`, `numberOfDays`: Booking dates
- `destinationCountry`: Selected destination
- `boardType`: Board type (FB/HB/NB)
- `dailySelections`: Per-day hotel and meal selections

State is automatically persisted to localStorage and restored on page refresh.

### Form Validation

Zod schemas validate input at each step:
- Citizenship selection (required)
- Date range (1-30 days, start date required)
- Destination selection (required)
- Board type selection (required)

### Component Structure

```
src/
  components/
    ui/             # Primitive components (Button, Card, Select)
    booking/        # Booking-specific (Header, StepProgress, Layout, Forms)
  store/
    bookingSlice    # Redux reducer and actions
    index           # Store and persist config
  lib/
    data            # Mock data (countries, hotels, etc.)
    validation      # Zod schemas
    booking/
      guards        # Route prerequisite checks
app/
  booking/          # Booking wizard routes
    citizenship/
    dates/
    destination/
    board-type/
    daily-plan/
    summary/
```

### Meal Selection Rules

- **NB (No Board)**: Meal dropdowns disabled, all selections cleared
- **HB (Half Board)**: Lunch and dinner are mutually exclusive per day; selecting one disables the other
- **FB (Full Board)**: All meals included by default; no user selection

When board type changes, the system automatically normalizes daily selections to comply with new rules.

### Theme System

Light/Dark mode using next-themes:
- CSS variables define semantic colors (background, foreground, border, etc.)
- Tailwind's `dark:` prefix for dark mode styles
- Theme toggle in header, persisted to localStorage

## Technologies

- **Next.js 16**: App Router, Server/Client components
- **React 19**: Component library
- **TypeScript**: Static typing with strict mode
- **Tailwind CSS v4**: Utility-first CSS
- **Redux Toolkit**: State management
- **redux-persist**: State persistence
- **react-hook-form**: Form handling
- **zod**: Schema validation
- **next-themes**: Theme management
- **lucide-react**: Icons

## Known Limitations

- Backend integration not implemented; uses mock data
- Payment processing not included
- No user authentication
- Daily plan state normalized on screen render (not persisted per-day during booking modification)

## Future Enhancements

- Integration with real booking API
- Payment gateway (Stripe/PayPal)
- User accounts and booking history
- Email confirmation
- More destination countries and hotels
- Admin dashboard for inventory management
- Multi-language support

## License

Private project.
