import React, { useState } from 'react';
import { useSupabase } from '../lib/supabase';
import { useRouter } from 'next/navigation';

const CustomizePage: React.FC = () => {
    const { supabase } = useSupabase();
    const router = useRouter();
    const [branding, setBranding] = useState('');
    const [manualEntry, setManualEntry] = useState('');
    const [rescheduling, setRescheduling] = useState(false);
    const [timeSlotVisibility, setTimeSlotVisibility] = useState(false);
    const [reminders, setReminders] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleCustomize = async () => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('customizations')
                .insert([
                    {
                        branding,
                        manual_entry: manualEntry,
                        rescheduling,
                        time_slot_visibility: timeSlotVisibility,
                        reminders,
                    },
                ]);

            if (error) throw error;

            router.push('/success');
        } catch (err) {
            setError(err instanceof Error ? err.message : String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-5">
            <h1 className="text-2xl font-bold mb-4">Effortless Booking Tailored for Your Niche Events</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCustomize(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700">Branding:</label>
                    <input
                        type="text"
                        value={branding}
                        onChange={(e) => setBranding(e.target.value)}
                        className="mt-1 block w-full border rounded p-2"
                        placeholder="Enter your branding information"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Manual Entry:</label>
                    <textarea
                        value={manualEntry}
                        onChange={(e) => setManualEntry(e.target.value)}
                        className="mt-1 block w-full border rounded p-2"
                        placeholder="Describe the manual entry process"
                    />
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rescheduling}
                            onChange={() => setRescheduling(!rescheduling)} 
                        />
                        <span className="ml-2">Enable Rescheduling</span>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={timeSlotVisibility}
                            onChange={() => setTimeSlotVisibility(!timeSlotVisibility)} 
                        />
                        <span className="ml-2">Clear Time-Slot Visualization</span>
                    </label>
                </div>
                <div className="mb-4">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={reminders}
                            onChange={() => setReminders(!reminders)} 
                        />
                        <span className="ml-2">Automated Reminders</span>
                    </label>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white rounded p-2"
                >
                    {loading ? 'Saving...' : 'Save Customizations'}
                </button>
            </form>
        </div>
    );
};

export default CustomizePage;