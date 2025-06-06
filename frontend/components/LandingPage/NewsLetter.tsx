'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useAuth } from '@/context/auth/hooks';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react'

export default function NewsLetter() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { axiosInstance } = useAuth();

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter a valid email address');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.post<{ message: string }>('/api/newsletter/subscribe', { email });
            setEmail(''); // Clear the input after subscribing
            toast.success('Thank you for subscribing!');
        }
        catch (error) {
            console.error('Subscription error:', error);
            toast.error('Failed to subscribe. Please try again later.');
        }
        finally { 
            setLoading(false);
        }
    }
    return (
        <section className="py-16 bg-muted/50">
            <div className="container">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Get notified about new events, exclusive offers, and event management tips
                    </p>
                    <div>
                        <form action="" onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Button className='bg-black' type="submit" disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" /> : 'Subscribe'}
                            </Button>
                        </form>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">No spam, unsubscribe at any time</p>
                </div>
            </div>
        </section>
    )
}