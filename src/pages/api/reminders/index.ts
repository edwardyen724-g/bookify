import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { sendReminderEmail } from '@/lib/emailService'; // hypothetical email service
import { sendReminderSMS } from '@/lib/smsService'; // hypothetical SMS service

interface AuthedRequest extends NextApiRequest {
  user: { id: string; email: string }; // Assuming user object is attached by auth middleware
}

const rateLimitMap: Map<string, number> = new Map();

const RATE_LIMIT = 5; // maximum requests per minute
const RATE_LIMIT_TIMEFRAME = 60 * 1000; // in milliseconds

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { appointmentId } = req.body;

  // Rate limiting
  const userId = req.user.id;
  const currentTime = Date.now();

  if (rateLimitMap.has(userId)) {
    const { count, firstRequestTime } = rateLimitMap.get(userId)!;
    
    if (currentTime - firstRequestTime < RATE_LIMIT_TIMEFRAME) {
      if (count >= RATE_LIMIT) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
      }
      rateLimitMap.set(userId, { count: count + 1, firstRequestTime });
    } else {
      rateLimitMap.set(userId, { count: 1, firstRequestTime: currentTime });
    }
  } else {
    rateLimitMap.set(userId, { count: 1, firstRequestTime: currentTime });
  }

  try {
    const { data: appointment, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    if (error || !appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Send reminder email
    await sendReminderEmail(appointment);

    // Send reminder SMS
    await sendReminderSMS(appointment);

    return res.status(200).json({ message: 'Reminder sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}