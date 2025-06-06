'use client'
import Link from 'next/link';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { Badge, Button } from '@radix-ui/themes';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useAnimation } from 'framer-motion';
import ImageComponent from '@/components/ImageComponent';
import { Event } from './types/EventCardTypes';
import { useMyEventsContext } from '../context';

export default function EventCard(item: Event) {
    const controls = useAnimation();
    const { setSelectedEvent, setIsDialogOpen } = useMyEventsContext();

    const handleDetailsClick = (item: Event) => {
        debugger
        setSelectedEvent(item);
        setIsDialogOpen(true);
    }  

    return (
        <motion.div
            key={item.event_id}
            className="h-full w-80"
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', transition: { duration: 0.2 } }}
            // onHoverStart={() => controls.start({ scale: 1.1 })}
            // onHoverEnd={() => controls.start({ scale: 1 })}
            whileHover={{y:-8}}
            layout
        >
            <div onClick={() => handleDetailsClick(item)} className="cursor-pointer">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full overflow-hidden">
                        <motion.div animate={controls} className="h-full w-full">
                            <ImageComponent
                                imageFile={item.imageUrl}
                                alt={item.title}
                            />
                        </motion.div>
                    </div>
                    <CardContent className="p-4 space-y-6">
                        <div className="flex items-center justify-between">
                            <h5 className="font-semibold line-clamp-1 m-0">{item.title}</h5>
                            {item.is_paid ? (
                                <Badge color="gray" highContrast variant="solid">
                                    Rs. {item.price}
                                </Badge>
                            ) : (
                                <Badge variant="outline" color="gray">Free</Badge>
                            )}
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground flex flex-col gap-2">
                            <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>
                                    {new Date(item.event_date).toLocaleDateString()} —{' '}
                                    {new Date(item.event_date).toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span className="line-clamp-1">{item.location}</span>
                            </div>
                        </div>
                        <div className="w-full flex justify-center">
                            <Button
                                color="gray"
                                variant="solid"
                                highContrast
                                style={{ width: '100%' }}
                                onClick={() => handleDetailsClick(item)}
                            >
                                View Details
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}