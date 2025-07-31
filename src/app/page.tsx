'use client';

import { useState, useEffect, useRef, ComponentProps } from 'react';
import html2canvas from 'html2canvas';
import { IdCardForm } from '@/components/id-card-form';
import { IdCardPreview } from '@/components/id-card-preview';
import { ImageGallery } from '@/components/image-gallery';

type CardData = ComponentProps<typeof IdCardPreview>;

const firstNames = [
  'Aarav', 'Arjun', 'Aditya', 'Aaryan', 'Arnav', 'Advik', 'Ayaan', 'Atharv', 'Ansh', 'Abhinav', 
  'Anirudh', 'Amol', 'Bhavesh', 'Bhavin', 'Brijesh', 'Chetan', 'Chirag', 'Darshan', 'Deepak', 'Dev', 
  'Dhruv', 'Eklavya', 'Gaurav', 'Ganesh', 'Gautam', 'Girish', 'Harish', 'Harsh', 'Hemant', 'Hitesh',
  'Ishaan', 'Ishan', 'Jatin', 'Jay', 'Jignesh', 'Kamal', 'Karan', 'Kartik', 'Kaushik', 'Kunal',
  'Kush', 'Lakshay', 'Lalit', 'Madhav', 'Manan', 'Manish', 'Mayank', 'Mihir', 'Mohit', 'Nakul',
  'Naman', 'Nikhil', 'Nirav', 'Nishant', 'Nitin', 'Om', 'Parth', 'Piyush', 'Pranav', 'Pranay',
  'Prashant', 'Prateek', 'Rahul', 'Raj', 'Rajan', 'Rajat', 'Rakesh', 'Rishi', 'Rohan', 'Rohit',
  'Ronak', 'Sachin', 'Sahil', 'Sameer', 'Sandeep', 'Sanjay', 'Sanket', 'Saurabh', 'Shreyas', 'Shubham',
  'Siddharth', 'Soham', 'Sumit', 'Sunny', 'Tushar', 'Uday', 'Utkarsh', 'Varun', 'Vikas', 'Vinay',
  'Vipul', 'Vishal', 'Vivek', 'Yash', 'Yogesh', 'Aahana', 'Aanya', 'Aaradhya', 'Aashi', 'Aditi',
  'Advika', 'Ahana', 'Alisha', 'Amrita', 'Ananya', 'Anika', 'Anjali', 'Anusha', 'Aradhya', 'Avani',
  'Bhavya', 'Charvi', 'Diya', 'Drishti', 'Esha', 'Gauri', 'Gayatri', 'Hina', 'Ira', 'Ishita',
  'Jhanvi', 'Jiya', 'Kavya', 'Keya', 'Khushi', 'Kiara', 'Kriti', 'Larisa', 'Mahika', 'Meera',
  'Myra', 'Naina', 'Navya', 'Neha', 'Niharika', 'Nisha', 'Nitya', 'Oviya', 'Palak', 'Pari',
  'Pooja', 'Prachi', 'Pragya', 'Pranavi', 'Riya', 'Saanvi', 'Sakshi', 'Samaira', 'Sara', 'Shanaya',
  'Shreya', 'Siya', 'Sneha', 'Tanvi', 'Tanya', 'Tara', 'Tiya', 'Vanya', 'Vedika', 'Vidya',
  'Vrinda', 'Yashvi', 'Zara'
];
const lastNames = [
    'Kumar', 'Sharma', 'Singh', 'Patel', 'Gupta', 'Reddy', 'Chopra', 'Malhotra', 'Jain', 'Verma',
    'Mehta', 'Shah', 'Yadav', 'Mishra', 'Pandey', 'Tiwari', 'Dubey', 'Chauhan', 'Rathore', 'Rao',
    'Naidu', 'Iyer', 'Menon', 'Nair', 'Pillai', 'Joshi', 'Bhat', 'Kulkarni', 'Deshpande', 'Das',
    'Choudhury', 'Sarkar', 'Bose', 'Ghosh', 'Banerjee', 'Mukherjee', 'Chatterjee', 'Dutta', 'Roy',
    'Agarwal', 'Goel', 'Singhal', 'Bansal', 'Garg', 'Jindal', 'Mittal', 'Agrawal', 'Gupta', 'Khandelwal',
    'Maheshwari', 'Oswal', 'Parekh', 'Lodha', 'Chhabra', 'Arora', 'Khatri', 'Sethi', 'Malik', 'Kapoor',
    'Khanna', 'Mehra', 'Anand', 'Puri', 'Suri', 'Ahluwalia', 'Grover', 'Dhawan', 'Bhasin', 'Bhatia',
    'Bedi', 'Sodhi', 'Kohli', 'Sahni', 'Narula', 'Chawla', 'Taneja', 'Walia', 'Bindra', 'Lamba',
    'Sachdeva', 'Ahluwalia', 'Bajwa', 'Dhillon', 'Sidhu', 'Brar', 'Gill', 'Sandhu', 'Mann', 'Grewal'
];
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const getRandomItem = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

const generateRandomData = (): Omit<CardData, 'photo'> => {
  const firstName = getRandomItem(firstNames);
  const lastName = getRandomItem(lastNames);
  const studentId = (Math.floor(Math.random() * 900000000) + 100000000).toString();
  return {
    studentId,
    name: `${capitalize(firstName)} ${capitalize(lastName)}`,
    mobile: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    emergency: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    session: '2024-2028',
    department: 'CSE',
    bloodGroup: getRandomItem(bloodGroups),
  };
};

export default function Home() {
  const [cardData, setCardData] = useState<CardData>({
    studentId: '',
    name: '',
    mobile: '',
    emergency: '',
    session: '',
    department: '',
    bloodGroup: '',
    photo: null,
  });
  const [galleryPhotos, setGalleryPhotos] = useState<(string | null)[]>([]);

  const cardPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleRegenerate();
  }, [galleryPhotos]);

  const handleUpdate = (newData: Partial<CardData>) => {
    setCardData(prevData => ({ ...prevData, ...newData }));
  };
  
  const handleRegenerate = () => {
    const randomData = generateRandomData();
    const availablePhotos = galleryPhotos.filter(p => p);
    const randomPhoto = availablePhotos.length > 0 ? getRandomItem(availablePhotos) : null;
    setCardData(prev => ({...prev, ...randomData, photo: randomPhoto }));
  };

  const handleDownload = () => {
    if (cardPreviewRef.current) {
      html2canvas(cardPreviewRef.current, { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'id-card.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
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
        
        <div className="mb-8">
            <ImageGallery onPhotosChange={setGalleryPhotos} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <IdCardForm onUpdate={handleUpdate} initialData={cardData} onRegenerate={handleRegenerate} onDownload={handleDownload}/>
          </div>
          <div className="lg:col-span-2 flex justify-center lg:sticky lg:top-8">
            <IdCardPreview ref={cardPreviewRef} {...cardData} />
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t">
        <p>Built with Next.js and ShadCN UI. Designed for modern identity solutions.</p>
      </footer>
    </div>
  );
}
