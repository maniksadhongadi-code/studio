'use client';

import { useState, useEffect, ComponentProps } from 'react';
import { IdCardForm } from '@/components/id-card-form';
import { IdCardPreview } from '@/components/id-card-preview';

type CardData = ComponentProps<typeof IdCardPreview>;

const firstNames = ['Amit', 'Sunita', 'Rajesh', 'Priya', 'Vikram', 'Anjali', 'Deepak', 'Kavita'];
const lastNames = ['Kumar', 'Sharma', 'Singh', 'Patel', 'Gupta', 'Reddy', 'Chopra', 'Malhotra'];
const departments = ['Computer Science', 'Mechanical', 'Electrical', 'Civil', 'Electronics'];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const generateRandomData = (): Omit<CardData, 'photo'> => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  return {
    name: `${capitalize(firstName)} ${capitalize(lastName)}`,
    mobile: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    emergency: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    session: `202${Math.floor(Math.random() * 4)}-202${Math.floor(Math.random() * 4) + 4}`,
    department: getRandomItem(departments),
    bloodGroup: getRandomItem(bloodGroups),
  };
};


export default function Home() {
  const [cardData, setCardData] = useState<CardData>({
    name: '',
    mobile: '',
    emergency: '',
    session: '',
    department: '',
    bloodGroup: '',
    photo: null,
  });

  useEffect(() => {
    setCardData(prev => ({...prev, ...generateRandomData()}));
  }, []);

  const handleUpdate = (newData: Partial<CardData>) => {
    setCardData(prevData => ({ ...prevData, ...newData }));
  };
  
  const handleRegenerate = () => {
    const randomData = generateRandomData();
    setCardData(prev => ({...prev, ...randomData }));
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
            <IdCardForm onUpdate={handleUpdate} initialData={cardData} onRegenerate={handleRegenerate}/>
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
