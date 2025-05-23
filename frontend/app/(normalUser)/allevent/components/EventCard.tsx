import Link from 'next/link';
import ImageComponent from '@/components/ImageComponent';
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@radix-ui/themes';
import { Event } from '../types';

export default function EventCard(item: Event) {
    const controls = useAnimation()

    return (
        <motion.div
            key={item.event_id}
            className="h-full rounded-lg border bg-card text-card-foreground shadow-md"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            onHoverStart={() => controls.start({ scale: 1.08 })}
            onHoverEnd={() => controls.start({ scale: 1 })}
            layout
        >
            <Link href={`/event/${item.event_id}`} className="block text-black">
                <div className='w-100 h-40 overflow-hidden'>
                    <motion.div animate={controls} className=''>
                        <ImageComponent imageFile={item.imageUrl} alt={item.title} />
                    </motion.div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <div className="text-sm text-muted-foreground mb-2">{item.location}</div>
                    <div className="text-sm mb-2">
                        {new Date(item.event_date).toLocaleDateString()} — {new Date(item.event_date).toLocaleTimeString()}
                    </div>
                    {item.is_paid && (
                        <div className="text-sm font-medium">Rs. {item.price}</div>
                    )}
                </div>
            </Link>
            <div className="px-4 pb-4">
                <Link href={`/events/${item.event_id}`}>
                    <Button color='gray' variant='solid' highContrast style={{ width: '100%' }}>View Details</Button>
                </Link>
            </div>
        </motion.div>
    )
}