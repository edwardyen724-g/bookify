import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bookify',
  description: 'Customizable booking solutions for niche events and businesses.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Effortless Booking Tailored for Your Niche Events</h1>
            <p className="text-lg">{metadata.description}</p>
          </div>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-200 text-center p-4">
          <p>&copy; {new Date().getFullYear()} Bookify. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}