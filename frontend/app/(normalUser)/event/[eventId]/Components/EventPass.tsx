'use client'
import { useEffect, useState } from 'react';
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/auth/hooks';
export default function EventPass({eventId}: { eventId: string }) {
    // const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${registration_id}`;

    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const { axiosInstance } = useAuth(); // Assuming you have an axios instance set up in your auth context
    // fetch event pass
    useEffect(() => {
        const fetchEventPass = async () => {
            try {
                const response = await axiosInstance.get(`/api/registration/getRegistrationPass/${eventId}`);
                const data = await response.data;
                const registration_pass = data?.registration_pass;
                setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${registration_pass}`);
            } catch (error) {
                console.error('Error fetching event pass:', error);
            }
        };

        fetchEventPass();
    }, [eventId]);

    // download QR code image
    const downloadImage = () => {
        fetch(qrCodeUrl)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'qr-code.png'; // You can change the filename here
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Download failed:', error);
            });
    }

    return (
        <>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <QrCode className="h-5 w-5 mr-2" />
                    Event Pass
                </h3>

                <div className="text-center space-y-2">
                    <div className="p-3 rounded-lg bg-white inline-block">
                        {qrCodeUrl ? (
                            <img
                                src={qrCodeUrl}
                                alt="Event QR Code"
                                className="w-28 h-28 mx-auto"
                            />
                        ) : (
                            <div className='w-28 h-28 rounded-lg flex items-center justify-center'>

                            </div>
                        )}
                    </div>

                    <div className="text-sm text-gray-600">
                        {/* <p className="font-medium">Ticke  t ID: {event.ticketId}</p> */}
                        <span>Present this QR code at the event entrance</span>
                    </div>

                    <Button className="w-full" variant="outline" onClick={downloadImage}>
                        Download Pass
                    </Button>
                </div>
            </div>
        </>
    )
}