import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(stripeSecretKey, { apiVersion: '2022-11-15' });

interface AuthedRequest extends NextApiRequest {
  user?: { id: string; email: string };
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { amount, currency, userId } = req.body;

  if (!amount || !currency || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const { data, error: supabaseError } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (supabaseError || !data) {
      return res.status(404).json({ message: 'User not found' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { userId },
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return res.status(500).json({ message: err instanceof Error ? err.message : String(err) });
  }
}