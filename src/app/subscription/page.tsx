import React from 'react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSession } from 'next-auth/react';
import { Subscription } from '@/types'; // Assuming you have defined a Subscription type
import { format } from 'date-fns';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const SubscriptionPage: React.FC = () => {
    const { data: session } = useSession();
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubscriptions = async () => {
            if (!session?.user?.email) return;

            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .eq('user_email', session.user.email);

                if (error) {
                    throw error;
                }

                setSubscriptions(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : String(err));
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptions();
    }, [session]);

    if (loading) return <div>Loading subscriptions...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="subscription-page p-4">
            <h1 className="text-2xl font-bold">Your Bookify Subscriptions</h1>
            {subscriptions.length === 0 ? (
                <p>No subscriptions found. Start booking now!</p>
            ) : (
                <ul className="mt-4">
                    {subscriptions.map(subscription => (
                        <li key={subscription.id} className="border-b py-2">
                            <h2 className="font-semibold">{subscription.title}</h2>
                            <p>Valid until: {format(new Date(subscription.valid_until), 'PP')}</p>
                            <p>Status: {subscription.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SubscriptionPage;