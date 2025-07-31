import Image from 'next/image';
import { Card } from '@/components/ui/card';

type IdCardPreviewProps = {
  name?: string;
  mobile?: string;
  emergency?: string;
  session?: string;
  department?: string;
  bloodGroup?: string;
  photo?: string | null;
};

const CollegeLogo = () => (
    <div className="absolute top-4 left-4 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-4xl transform -translate-x-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path>
        </svg>
    </div>
);

export function IdCardPreview({
  name = "Your Name",
  mobile = "9876543210",
  emergency = "0123456789",
  session = "2024-2028",
  department = "Computer Science",
  bloodGroup = "O+",
  photo,
}: IdCardPreviewProps) {
  return (
    <Card className="w-[350px] h-[550px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden font-sans relative transform transition-transform duration-500 hover:scale-105">
      <div className="absolute top-0 left-0 right-0 p-4">
        <div className="flex items-center justify-center pl-10">
          <div className="text-left">
            <h2 className="font-bold text-lg leading-tight text-gray-800">RAMGARH ENGINEERING COLLEGE</h2>
            <p className="text-xs text-red-600 font-semibold">(Estd. by govt. of Biharii & run by Mechno india under PPP)</p>
          </div>
        </div>
      </div>
      <CollegeLogo />
      <div className="flex-1 flex">
        <div className="w-12 bg-primary flex items-center justify-center">
          <p className="text-white font-bold tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
            STUDENT
          </p>
        </div>

        <div className="flex-1 pt-24 pb-4 px-4 flex flex-col items-center text-gray-800 bg-white bg-opacity-80" style={{backgroundImage: 'radial-gradient(circle at center, #ffffff 0%, #f0f0f0 100%)'}}>
          <p className="text-primary font-semibold mb-2">Student ID</p>
          <div className="w-28 h-32 rounded-lg border-2 border-gray-400 overflow-hidden mb-4 shrink-0">
            <Image
              src={photo || 'https://placehold.co/112x128.png'}
              alt={name || 'Student Photo'}
              width={112}
              height={128}
              className="object-cover w-full h-full"
              data-ai-hint="person portrait"
            />
          </div>

          <div className="w-full text-sm space-y-1.5 text-left">
            <div className="flex">
              <span className="font-semibold w-28">Name:</span>
              <span>{name}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-28">Mobile No:</span>
              <span>{mobile}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-28">Emergency Contact:</span>
              <span>{emergency}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-28">Department:</span>
              <span>{department}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-28">Session(Year):</span>
              <span>{session}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-28">Blood Group:</span>
              <span>{bloodGroup}</span>
            </div>
          </div>

          <div className="mt-auto w-full text-center">
             <p className="font-signature text-2xl text-gray-700" style={{fontFamily: "'Alex Brush', cursive"}}>{name}</p>
             <p className="text-xs text-gray-600 border-t border-gray-400 pt-1">Authorized Signatory</p>
          </div>
        </div>
      </div>
       <div className="bg-primary text-white p-2 text-center text-xs">
          <p className="font-bold">RAMGARH ENGINEERING COLLEGE</p>
          <p className="text-[10px]">(Estd. by govt. of biharii & run by Mechno india under PPP)</p>
          <p className="text-[10px]">** If found please return to: Ramgarh Engineering College, Murubandi, P.O - Fekupur, P.S - GandhiNa Project, Dist- Ramgarh, Jharkhand, Pin - 875100</p>
        </div>
    </Card>
  );
}
