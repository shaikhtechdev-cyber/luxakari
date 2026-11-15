import BookingsDashboard from "@/components/admin/BookingsDashboard";

// Access is checked in admin/layout.tsx; the API re-checks on every request.
export default function AdminPage() {
  return <BookingsDashboard />;
}
