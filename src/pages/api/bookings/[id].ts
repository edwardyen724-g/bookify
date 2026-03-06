import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

interface AuthedRequest extends NextApiRequest {
  user?: { id: string };
}

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function handler(req: AuthedRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;

  try {
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid booking ID' });
    }

    switch (method) {
      case 'PUT':
        const { data, error: updateError } = await supabase
          .from('bookings')
          .update(req.body)
          .eq('id', id);

        if (updateError) {
          throw new Error(updateError.message);
        }

        return res.status(200).json(data);

      case 'DELETE':
        const { error: deleteError } = await supabase
          .from('bookings')
          .delete()
          .eq('id', id);

        if (deleteError) {
          throw new Error(deleteError.message);
        }

        return res.status(204).end();

      default:
        return res.setHeader('Allow', ['PUT', 'DELETE']).status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : String(err) });
  }
}