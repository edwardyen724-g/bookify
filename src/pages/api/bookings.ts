import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';
import { RateLimiterMemory } from 'rate-limiter-flexible';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 1, // per second
});

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await rateLimiter.consume(req.ip);

      const { date, timeSlot, clientName, eventType } = req.body;

      const { data, error } = await supabase
        .from('bookings')
        .insert([
          { date, time_slot: timeSlot, client_name: clientName, event_type: eventType }
        ]);

      if (error) throw new Error(error.message);

      return res.status(201).json(data);
    } catch (err) {
      return res.status(429).json({ error: err instanceof Error ? err.message : String(err) });
    }
  } else if (req.method === 'GET') {
    try {
      const { user } = req;
      if (!user) return res.status(401).json({ error: 'Unauthorized' });

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw new Error(error.message);

      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}