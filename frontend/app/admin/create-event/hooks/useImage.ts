'use client'
import React, { useState } from 'react'

export const useImageUpload = (form: any, axiosInstance: any, toast: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [imgFileName, setImgFileName] = useState<string>("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Only set form value if form exists
    if (form) {
      form.setValue("image", file);
    }

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const filename = `${Date.now()}.${fileExt}`;
      
      const response = await axiosInstance.post(
        `/api/image/${filename}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data) {
        setImgFileName(response.data.filename);
        setUploadedImageUrl(response.data.filename);
        toast({
          title: "Success",
          description: "Image uploaded successfully"
        });
      }
    } catch (error: any) {
      setImagePreview(null);
      setUploadedImageUrl(null);
      if (form) {
        form.setValue("image", undefined);
      }
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive"
      });
    }
  };

  const resetImage = () => {
    setImagePreview(null);
    setUploadedImageUrl(null);
    setImgFileName("");
    if (form) {
      form.setValue("image", undefined);
    }
    const input = document.getElementById('event-image-input') as HTMLInputElement;
    if (input) input.value = "";
  };

  return {
    imagePreview,
    uploadedImageUrl,
    imgFileName,
    handleImageChange,
    resetImage
  };
};