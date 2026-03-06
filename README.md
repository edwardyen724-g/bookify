# Bookify

> Customizable booking solutions for niche events and businesses.

**Status:** 🚧 In Development

## Problem
Users face challenges with complex booking interfaces and lack of options for personalization, leading to scheduling inefficiencies. Bookify simplifies and customizes the booking process for event coordinators and niche service providers.

## MVP Features
- Fully customizable booking pages that match the branding of the event or business.
- Intuitive manual entry system for adding and managing bookings easily.
- Rescheduling functionality that allows clients to change appointments without hassle.
- Clear time-slot visualizations that prevent double bookings and confusion.
- Automated reminders and confirmations sent via email or SMS for both clients and coordinators.

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Supabase Edge Functions
- **Database:** Supabase Postgres
- **Auth:** Supabase Auth
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
The stack leverages Supabase for real-time database functionality and authentication, paired with Stripe for payment processing. Next.js will handle both the front-end and back-end API routes, providing a cohesive structure and efficient deployment on Vercel.

## User Stories
- Customizable Booking Page
- Manual Entry for Bookings
- Rescheduling Functionality
- Time-Slot Visualization
- Automated Reminders
- Subscription Management

## Launch Checklist
- [ ] Finalize MVP feature set and user stories
- [ ] Develop the landing page and set up email capture
- [ ] Implement backend for bookings and reminders
- [ ] Test customization page functionalities
- [ ] Conduct user testing with initial users
- [ ] Launch the product and begin user acquisition efforts

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```