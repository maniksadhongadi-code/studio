'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

type CardData = {
  name?: string;
  mobile?: string;
  emergency?: string;
  session?: string;
  department?: string;
  bloodGroup?: string;
  photo?: string | null;
};

type IdCardFormProps = {
  onUpdate: (data: Partial<CardData>) => void;
  initialData: CardData;
};

export function IdCardForm({ onUpdate, initialData }: IdCardFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const photoInputId = React.useId();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Your ID Card</CardTitle>
        <CardDescription>Fill in the details below to see your ID card preview.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={initialData.name} onChange={handleInputChange} placeholder="e.g. John Doe" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" name="mobile" value={initialData.mobile} onChange={handleInputChange} placeholder="e.g. 9876543210" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="emergency">Emergency Contact</Label>
                <Input id="emergency" name="emergency" value={initialData.emergency} onChange={handleInputChange} placeholder="e.g. 0123456789" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" name="department" value={initialData.department} onChange={handleInputChange} placeholder="e.g. Computer Science" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session">Session (Year)</Label>
              <Input id="session" name="session" value={initialData.session} onChange={handleInputChange} placeholder="e.g. 2024-2028" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <Input id="bloodGroup" name="bloodGroup" value={initialData.bloodGroup} onChange={handleInputChange} placeholder="e.g. O+" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={photoInputId} className="block mb-2">Your Photo</Label>
            <Input id={photoInputId} name="photo" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <Button asChild variant="outline" className="w-full">
              <label htmlFor={photoInputId} className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Upload Photo
              </label>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
