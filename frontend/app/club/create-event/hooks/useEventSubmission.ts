import { FormValues } from '../types';
import { format } from 'date-fns';
import { AxiosInstance } from 'axios';
import { useRouter } from 'next/navigation';

type ToastFunction = {
  (props: {
    title: string;
    description: string;
    variant?: "default" | "destructive";
    duration?: number;
  }): void;
};

export const useEventSubmission = (
  axiosInstance: AxiosInstance,
  router: ReturnType<typeof useRouter>,
  toast: ToastFunction
) => {
  const submitEvent = async (
    data: FormValues,
    uploadedImageUrl: string | null,
    imgFileName: string
  ) => {
    debugger
    // Image validation
    if (data.image && !uploadedImageUrl) {
      console.log('Image validation error:', { data: data.image, uploadedImageUrl });
      toast({
        title: 'Image Issue',
        description: 'An image was selected but no valid URL was obtained. Please try uploading again.',
        variant: 'destructive',
        duration: 5000,
      });
      return;
    }

    try {
        debugger
      // Date validation
      if (!data.date || isNaN(data.date.getTime())) {
        throw new Error('Invalid date provided');
      }
      const formattedDate = format(data.date, 'yyyy/MM/dd');

      // Prepare event payload
      const eventPayload = {
        branch_id: parseInt(data.branch),
        title: data.title,
        description: data.description,
        event_date: formattedDate,
        event_time: data.time,
        location: data.location,
        address: data.address,
        max_capacity: data.maxAttendees,
        price: data.price,
        is_featured: data.isFeatured,
        imageUrl: uploadedImageUrl || (imgFileName ? `/uploads/${imgFileName}` : 'default-image-url'),
      };

      // Submit to API
      const response = await axiosInstance.post('/api/event/createEvent', eventPayload);

      // Handle success
      if (response.status === 201 || response.status === 200) {
        toast({
          title: 'Event Created',
          description: 'Your event has been successfully created!',
          variant: 'default',
          duration: 5000,
        });
        router.push('/club/');
      }
    } catch (error: any) {
      console.error('Error creating event:', error);
      let errorMessage = 'Failed to create event. Please try again.';
      if (error.response) {
        // API error (e.g., validation or server issue)
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        // Network error (e.g., no response)
        errorMessage = 'Network error. Please check your connection.';
      } else {
        // Other errors (e.g., date formatting)
        errorMessage = error.message;
      }

      toast({
        title: 'Event Creation Error',
        description: errorMessage,
        variant: 'destructive',
        duration: 5000,
      });
    }
  };

  return submitEvent;
};