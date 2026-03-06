import React from 'react';
import { useSupabase } from '../lib/supabaseClient';

const Page: React.FC = () => {
  const { supabase } = useSupabase();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-50">
      <h1 className="text-5xl font-bold text-center text-gray-800">
        Effortless Booking Tailored for Your Niche Events
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Customizable booking solutions for niche events and businesses.
      </p>
      <div className="mt-10 max-w-2xl w-full">
        <h2 className="text-3xl font-semibold text-gray-800">Features</h2>
        <ul className="mt-4 space-y-2">
          <li>✔ Fully customizable booking pages that match the branding of the event or business.</li>
          <li>✔ Intuitive manual entry system for adding and managing bookings easily.</li>
          <li>✔ Rescheduling functionality that allows clients to change appointments without hassle.</li>
          <li>✔ Clear time-slot visualizations that prevent double bookings and confusion.</li>
          <li>✔ Automated reminders and confirmations sent via email or SMS for both clients and coordinators.</li>
        </ul>
      </div>
      <div className="mt-10">
        <button 
          onClick={() => {
            // Example of initializing Supabase Auth for demo purposes
            supabase.auth.signIn({ provider: 'google' });
          }} 
          className="px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded">
          Get Started
        </button>
      </div>
    </main>
  );
};

export default Page;