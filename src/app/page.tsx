'use client';

import { useState } from 'react';
import type { ComponentProps } from 'react';
import { IdCardForm } from '@/components/id-card-form';
import { IdCardPreview } from '@/components/id-card-preview';

type CardData = ComponentProps<typeof IdCardPreview>;

export default function Home() {
  const [cardData, setCardData] = useState<CardData>({
    name: 'Your Name',
    mobile: '9876543210',
    emergency: '0123456789',
    session: '2024-2028',
    department: 'Computer Science',
    bloodGroup: 'O+',
    photo: null,
  });

  const handleUpdate = (newData: Partial<CardData>) => {
    setCardData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">IdentiCard Generator</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Fill in your details to instantly generate your official identity card. Your preview will update in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <IdCardForm onUpdate={handleUpdate} initialData={cardData} />
          </div>
          <div className="lg:col-span-2 flex justify-center lg:sticky lg:top-8">
            <IdCardPreview {...cardData} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t">
        <p>Built with Next.js and ShadCN UI. Designed for modern identity solutions.</p>
      </footer>
    </div>
  );
}
