import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabase';
import type { Booking } from '@/types/booking';

interface AuthedRequest extends NextApiRequest {
  user?: {
    id: string;
  };
}

const bookings: Record<string, Booking> = {};
const rateLimits = new Map<string, number>();

const handler = async (req: AuthedRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        return await getBookings(req, res);
      case 'POST':
        return await createBooking(req, res);
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
};

const getBookings = async (req: AuthedRequest, res: NextApiResponse) => {
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { data, error } = await supabase
    .from<Booking>('bookings')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return res.status(200).json(data);
};

const createBooking = async (req: AuthedRequest, res: NextApiResponse) => {
  const userId = req.user?.id;
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { title, date, time, details } = req.body;

  if (!title || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const bookingData = { title, date, time, details, user_id: userId };

  const { data, error } = await supabase
    .from<Booking>('bookings')
    .insert([bookingData]);

  if (error) {
    throw new Error(error.message);
  }

  return res.status(201).json(data);
};

export default handler;