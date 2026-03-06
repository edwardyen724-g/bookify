import React from 'react';
import Image from 'next/image';
import { useAuth } from '../context/AuthContext';

const Page: React.FC = () => {
  const { user } = useAuth();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800">Effortless Booking Tailored for Your Niche Events</h1>
        <p className="mt-4 text-lg text-gray-600">
          Customizable booking solutions for niche events and businesses.
        </p>
      </header>
      <section className="flex flex-col items-center">
        <Image
          src="/images/booking-illustration.svg"
          alt="Booking Illustration"
          width={500}
          height={300}
          className="mb-8"
        />
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">MVP Features</h2>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>Fully customizable booking pages matching your brand.</li>
          <li>Intuitive manual entry system for bookings.</li>
          <li>Rescheduling functionality for easy appointment changes.</li>
          <li>Clear time-slot visualizations to prevent double bookings.</li>
          <li>Automated reminders and confirmations via email or SMS.</li>
        </ul>
      </section>
      <footer className="mt-12">
        {!user ? (
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login to Get Started
          </a>
        ) : (
          <p className="text-lg text-gray-600">Welcome back, {user.email}!</p>
        )}
      </footer>
    </main>
  );
};

export default Page;