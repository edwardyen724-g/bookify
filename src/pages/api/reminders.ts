import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string }; // Extend with user information after auth
}

const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_KEY || '');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
});

const rateLimitMap = new Map<string, number>();

const RATE_LIMIT = 5; // Allow up to 5 requests
const RATE_LIMIT_TIME_FRAME = 60 * 1000; // Reset limit every minute

const checkRateLimit = (key: string): boolean => {
  const currentTime = Date.now();
  const requestsCount = rateLimitMap.get(key) || 0;

  if (requestsCount < RATE_LIMIT) {
    rateLimitMap.set(key, requestsCount + 1);
    return true;
  }

  if (currentTime > (rateLimitMap.get(`${key}_time`) || 0) + RATE_LIMIT_TIME_FRAME) {
    rateLimitMap.set(key, 1);
    rateLimitMap.set(`${key}_time`, currentTime);
    return true;
  }

  return false;
};

const sendReminderEmail = async (email: string, message: string) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Appointment Reminder',
      text: message,
    });
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : String(err));
  }
};

const getReminders = async () => {
  const { data, error } = await supabase.from('reminders').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userEmail = req.user?.email;
  if (!userEmail) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!checkRateLimit(userEmail)) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }

  try {
    const reminders = await getReminders();
    const promises = reminders.map(reminder => sendReminderEmail(userEmail, reminder.message));

    await Promise.all(promises);
    return res.status(200).json({ success: true, message: 'Reminders sent successfully.' });
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}