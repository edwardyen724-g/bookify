import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSession } from "@supabase/auth-helpers-react";

const BookingsPage: React.FC = () => {
  const session = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      if (!session) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("user_id", session.user.id)
        .order("date", { ascending: true });

      if (error) {
        throw error;
      }

      setBookings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <ul className="mt-4">
        {bookings.map((booking) => (
          <li key={booking.id} className="border p-2 mb-2">
            <h2 className="font-semibold">{booking.title}</h2>
            <p>Date: {new Date(booking.date).toLocaleString()}</p>
            <p>Details: {booking.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsPage;