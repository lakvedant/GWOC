import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { IPhotoCarouselSchema } from "@/models/PhotoCarousel";

interface PhotoCarousel {
  title: string;
  description: string;
  image: string; // URL of the photo image
}

interface PhotoCarouselSliderProps {
  photo: PhotoCarousel;
  onClose: () => void;
  onSave: (updatedPhoto: PhotoCarousel) => void;
}

export const EditPhotoCarousel: React.FC<PhotoCarouselSliderProps> = ({ photo, onClose, onSave }) => {
  const [editedPhoto, setEditedPhoto] = useState<PhotoCarousel>({
    title: photo.title,
    description: photo.description,
    image: photo.image,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedPhoto({ ...editedPhoto, [name]: value });
  };

  const handleSave = () => {
    onSave(editedPhoto);
    onClose();
  };

  return (
    <div className="flex flex-col h-full mt-8">
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="mb-4">
          <label className="block text-sm font-medium">Title</label>
          <Input name="title" value={editedPhoto.title} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <Textarea name="description" value={editedPhoto.description} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Image URL</label>
          <Input name="image" value={editedPhoto.image} onChange={handleChange} required />
        </div>
        <div className="px-4 py-2 border-t">
          <Button className="w-full" onClick={handleSave}>Save Changes</Button>
        </div>
      </ScrollArea>
    </div>
  );
};