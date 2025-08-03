
import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

type IdCardPreviewProps = {
  studentId?: string;
  name?: string;
  mobile?: string;
  emergency?: string;
  session?: string;
  department?: string;
  bloodGroup?: string;
  photo?: string | null;
};

const CollegeLogo = () => (
    <div className="absolute top-3 left-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md p-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-700 w-10 h-10">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>
        </svg>
    </div>
);

const StudentVerticalText = () => (
    <svg width="100%" height="100%" viewBox="0 0 48 550" preserveAspectRatio="none" className="h-full">
        <text
            x="24"
            y="275"
            transform="rotate(-90, 24, 275)"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize="16"
            fontWeight="bold"
            letterSpacing="0.4em"
            className="uppercase"
        >
            STUDENT
        </text>
    </svg>
);


export const IdCardPreview = React.forwardRef<HTMLDivElement, IdCardPreviewProps>(({
  studentId = "123456789",
  name = "Your Name",
  mobile = "9876543210",
  emergency = "0123456789",
  session = "2024-2028",
  department = "Computer Science",
  bloodGroup = "O+",
  photo,
}, ref) => {
  return (
    <Card ref={ref} className="w-[350px] h-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans relative transform transition-transform duration-500 hover:scale-105">
      <div className="h-28 bg-primary flex items-center justify-end p-4 relative shrink-0">
        <CollegeLogo />
        <div className="text-center w-full pl-12">
          <h2 className="font-bold text-xl leading-tight text-white">RAMGARH ENGINEERING COLLEGE</h2>
          <p className="text-xs text-amber-300 font-semibold">(Estd. by govt. of Jharkhand & run by Techno India under PPP)</p>
        </div>
      </div>
      
      <div className="flex-grow flex relative">
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
            <span className="text-8xl font-black text-gray-200 opacity-70 transform -rotate-12 select-none">
                NUR &amp; GURU
            </span>
        </div>
        
        <div className="w-12 bg-gray-800 flex items-center justify-center relative z-10 shrink-0">
           <StudentVerticalText />
        </div>

        <div className="flex-1 pt-4 pb-4 px-4 flex flex-col items-center text-gray-800 bg-transparent relative z-10">
          <p className="text-primary font-bold mb-2 text-lg">Student ID: {studentId}</p>
          <div className="w-32 h-40 rounded-lg border-4 border-primary shadow-md overflow-hidden mb-3 shrink-0">
            <Image
              src={photo || 'https://placehold.co/128x160.png'}
              alt={name || 'Student Photo'}
              width={128}
              height={160}
              className="object-cover w-full h-full"
              data-ai-hint="person portrait"
            />
          </div>

          <div className="w-full text-sm space-y-2 text-left font-medium">
            <div className="flex items-center">
              <span className="font-bold w-28 text-gray-600 shrink-0">Name</span>
              <span className="font-bold">: {name}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-28 text-gray-600 shrink-0">Mobile No</span>
              <span className="font-bold">: {mobile}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-28 text-gray-600 shrink-0">Emergency</span>
              <span className="font-bold">: {emergency}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-28 text-gray-600 shrink-0">Department</span>
              <span className="font-bold">: {department}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-28 text-gray-600 shrink-0">Session(Year)</span>
              <span className="font-bold">: {session}</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold w-28 text-gray-600 shrink-0">Blood Group</span>
              <span className="font-bold">: {bloodGroup}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 w-full text-center">
             <div className="h-10"></div>
             <p className="text-xs text-gray-700 font-semibold border-t-2 border-gray-400 border-dashed pt-1 mt-1">Authorized Signatory</p>
          </div>
        </div>
      </div>
       <div className="bg-primary text-white p-2.5 text-center text-xs shrink-0">
          <p className="font-extrabold tracking-wide">RAMGARH ENGINEERING COLLEGE</p>
          <p className="text-[10px]">Murubanda, P.O-Bokaro, P.S-Ramgarh, Dist-Ramgarh, Jharkhand - 825101</p>
        </div>
    </Card>
  );
});

IdCardPreview.displayName = 'IdCardPreview';
