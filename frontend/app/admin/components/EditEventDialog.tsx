
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z.string().min(20, "Description must be at least 20 characters long"),
  date: z.date({
    required_error: "Event date is required",
  }),
  time: z.string().min(1, "Event time is required"),
  location: z.string().min(3, "Location is required"),
  address: z.string().min(5, "Address is required"),
  branch: z.string({
    required_error: "Please select a branch",
  }),
  maxAttendees: z.coerce.number().int().positive("Attendee count must be a positive number"),
  price: z.coerce.number().min(0, "Price cannot be negative"),
  isFeatured: z.boolean().default(false),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface EditEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description?: string;
    attendees: number;
    maxAttendees: number;
    status: string;
    address?: string;
    branch?: string;
    price?: number;
    isFeatured?: boolean;
  };
}

const EditEventDialog: React.FC<EditEventDialogProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event.title || "",
      description: event.description || "",
      location: event.location || "",
      address: event.address || "",
      maxAttendees: event.maxAttendees || 100,
      price: event.price || 0,
      isFeatured: event.isFeatured || false,
      time: event.time || "10:00",
      branch: event.branch || "",
    },
  });

  // Update form when event changes
  useEffect(() => {
    if (isOpen) {
      form.reset({
        title: event.title || "",
        description: event.description || "",
        location: event.location || "",
        address: event.address || "",
        maxAttendees: event.maxAttendees || 100,
        price: event.price || 0,
        isFeatured: event.isFeatured || false,
        time: event.time || "10:00",
        branch: event.branch || "",
        date: event.date ? new Date(event.date) : new Date(),
      });
    }
  }, [event, form, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    // In a real app, this would submit to an API
    console.log("Updated event data:", data);
    
    toast({
      title: "Event Updated",
      description: "Your event has been successfully updated!",
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Event</DialogTitle>
        </DialogHeader>
        
        <Card>
          <CardHeader className="px-6 py-4">
            <h3 className="text-lg font-medium">Event Details</h3>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {/* Event Title */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter event title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Event Date & Time */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  initialFocus
                                  className="pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Clock className="h-4 w-4 mr-2 mt-3 text-gray-500" />
                                <Input type="time" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Branch */}
                    <FormField
                      control={form.control}
                      name="branch"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Branch</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a branch" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="technology">Technology Branch</SelectItem>
                              <SelectItem value="art">Art & Culture Branch</SelectItem>
                              <SelectItem value="science">Science Branch</SelectItem>
                              <SelectItem value="business">Business Branch</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Location */}
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Main Hall, Conference Center" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="Full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-4">
                    {/* Description */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your event in detail"
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Capacity & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="maxAttendees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Capacity</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price ($)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" step="0.01" {...field} />
                            </FormControl>
                            <FormDescription>
                              Set to 0 for free events
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Featured Toggle */}
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Featured Event</FormLabel>
                            <FormDescription>
                              Featured events appear prominently on the home page
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Image Upload */}
                    <div className="space-y-3">
                      <FormLabel>Event Image</FormLabel>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        {imagePreview ? (
                          <div className="space-y-4">
                            <img
                              src={imagePreview}
                              alt="Event preview"
                              className="mx-auto h-40 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setImagePreview(null);
                                form.setValue("image", undefined);
                              }}
                            >
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <Button type="button" variant="outline" asChild>
                              <label>
                                Upload Image
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                />
                              </label>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-brand-purple hover:bg-brand-purple/90"
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EditEventDialog;
