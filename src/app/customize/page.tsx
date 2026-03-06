import React from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

const CustomizePage: React.FC = () => {
  const supabase = useSupabaseClient();
  const [customizationData, setCustomizationData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomizationData = async () => {
      try {
        const { data, error } = await supabase
          .from('customizations')
          .select('*')
          .single();

        if (error) throw error;

        setCustomizationData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCustomizationData();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customize Your Booking Page</h1>
      <p className="mb-4">Effortless Booking Tailored for Your Niche Events</p>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Current Customization Details</h2>
        <pre>{JSON.stringify(customizationData, null, 2)}</pre>
      </div>
      {/* Additional customization options can be added here */}
    </div>
  );
};

export default CustomizePage;