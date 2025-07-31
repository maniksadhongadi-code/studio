import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Trash2 } from 'lucide-react';
import Image from 'next/image';

const GALLERY_STORAGE_KEY = 'identicard-gallery-photos';
const MAX_PHOTOS = 8;

type ImageGalleryProps = {
  onPhotosChange: (photos: (string | null)[]) => void;
};

export function ImageGallery({ onPhotosChange }: ImageGalleryProps) {
  const [photos, setPhotos] = useState<(string | null)[]>(Array(MAX_PHOTOS).fill(null));
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    try {
      const storedPhotos = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (storedPhotos) {
        const parsedPhotos = JSON.parse(storedPhotos);
        const newPhotos = Array(MAX_PHOTOS).fill(null);
        parsedPhotos.forEach((p: string | null, i: number) => {
          if (i < MAX_PHOTOS) {
            newPhotos[i] = p;
          }
        });
        setPhotos(newPhotos);
        onPhotosChange(newPhotos);
      }
    } catch (error) {
      console.error("Failed to load photos from localStorage", error);
    }
  }, []);

  const updateAndStorePhotos = (newPhotos: (string | null)[]) => {
    setPhotos(newPhotos);
    onPhotosChange(newPhotos);
    try {
        localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(newPhotos));
    } catch (error) {
        console.error("Failed to save photos to localStorage", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhotos = [...photos];
        newPhotos[index] = reader.result as string;
        updateAndStorePhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos[index] = null;
    updateAndStorePhotos(newPhotos);
  };

  const handleUploadClick = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Photo Gallery</CardTitle>
        <CardDescription>Upload up to {MAX_PHOTOS} photos. One will be randomly selected when you generate an ID.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative aspect-square border-2 border-dashed rounded-lg flex items-center justify-center">
              {photo ? (
                <>
                  <Image src={photo} alt={`Photo ${index + 1}`} layout="fill" className="object-cover rounded-lg" />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 opacity-80 hover:opacity-100"
                    onClick={() => handleRemovePhoto(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="flex flex-col items-center">
                   <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={el => fileInputRefs.current[index] = el}
                    onChange={(e) => handleFileChange(e, index)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => handleUploadClick(index)}>
                    <Upload className="h-6 w-6" />
                  </Button>
                  <span className="text-xs text-muted-foreground mt-1">Upload</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
