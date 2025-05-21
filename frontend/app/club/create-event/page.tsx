"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth/hooks";
import { useBranches } from "./hooks/useBranch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useImageUpload } from './hooks/useImage';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateEvent = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { axiosInstance } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const branches = useBranches(axiosInstance, toast);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "10:00",
    location: "",
    branch: "",
    maxAttendees: 100,
    price: 0,
    isFeatured: false
  });

  // Initialize branch when branches are loaded
  useEffect(() => {
    if (branches && branches.length > 0 && !formData.branch) {
      setFormData(prev => ({
        ...prev,
        branch: branches[0]?.branch_id.toString()
      }));
    }
  }, [branches]);

  const { 
    imagePreview, 
    uploadedImageUrl, 
    imgFileName,
    handleImageChange,
    resetImage 
  } = useImageUpload(null, axiosInstance, toast);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleBranchChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      branch: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const [year, month, day] = formData.date.split('-');
      const formattedDate = `${year}/${month}/${day}`;
      
      const requestBody = {
        branch_id: formData.branch,
        title: formData.title,
        description: formData.description,
        event_date: formattedDate,
        location: formData.location,
        max_capacity: formData.maxAttendees,
        imageUrl: uploadedImageUrl
      };

      await axiosInstance.post('/api/event/createEvent', requestBody);

      toast({
        title: "Success",
        description: "Event created successfully!",
      });
      
      router.push("/club");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error", 
        description: "Failed to create event",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Create New Event</h1>
            <p className="text-gray-600 mt-1">Fill out the form below to create a new event</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/branch-dashboard")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Event Title</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter event title"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Branch</label>
                    <Select
                      value={formData.branch}
                      onValueChange={handleBranchChange}
                      disabled={branches.length <= 1}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem 
                            key={branch.branch_id} 
                            value={branch.branch_id.toString()}
                          >
                            {branch.branch_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date</label>
                      <Input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Time</label>
                      <Input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Event location"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Capacity</label>
                      <Input
                        type="number"
                        name="maxAttendees"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        min="1"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Price ($)</label>
                      <Input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your event in detail"
                      className="min-h-[150px]"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Image Upload - Keeping the existing implementation */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium" htmlFor="event-image-input">Event Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
                            onClick={resetImage}
                            disabled={isSubmitting}
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <Upload className="h-10 w-10 text-gray-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Drag and drop an image, or click to browse
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Recommended size: 1200×630 pixels (16:9 ratio)
                            </p>
                          </div>
                          <Button type="button" variant="outline" asChild disabled={isSubmitting}>
                            <label htmlFor="event-image-input" className="cursor-pointer">
                              Browse File
                              <input
                                id="event-image-input"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                                disabled={isSubmitting}
                              />
                            </label>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      title: "",
                      description: "",
                      date: "",
                      time: "10:00",
                      location: "",
                      branch: branches[0]?.branch_id.toString() || "",
                      maxAttendees: 100,
                      price: 0,
                      isFeatured: false
                    });
                    resetImage();
                  }}
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
                <Button 
                  type="submit" 
                  className="bg-black hover:bg-gray-800 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateEvent;