import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from 'next-auth/react';
import BookingForm from '@/components/BookingForm';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Booking } from '@/types/booking';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BookingsPage: React.FC = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBookings = async () => {
    if (!session?.user?.email) return;

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_email', session.user.email);

      if (error) throw error;

      setBookings(data);
    } catch (err) {
      console.error(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [session]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Your Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found. Start creating your bookings!</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="border p-2 mb-2 rounded">
              <h2 className="font-bold">{booking.title}</h2>
              <p>{booking.date}</p>
              <p>{booking.time}</p>
            </li>
          ))}
        </ul>
      )}
      <BookingForm />
    </div>
  );
};

export default BookingsPage;