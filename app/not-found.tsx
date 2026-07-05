import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found | Hotel Booking",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-foreground transition-colors duration-300">
      <div className="animate-fade-up text-center">
        <h1 className="mb-4 text-6xl font-bold tracking-tight text-foreground">
          404
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Page not found
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
