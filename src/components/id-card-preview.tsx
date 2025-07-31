import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';

type IdCardPreviewProps = {
  name?: string;
  idNumber?: string;
  mobile?: string;
  emergency?: string;
  session?: string;
  department?: string;
  bloodGroup?: string;
  photo?: string | null;
};

export function IdCardPreview({
  name = "Your Name",
  idNumber = "ID-12345",
  mobile = "9876543210",
  emergency = "0123456789",
  session = "2024-2028",
  department = "Computer Science",
  bloodGroup = "O+",
  photo,
}: IdCardPreviewProps) {
  return (
    <Card className="w-[320px] h-[512px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden font-body transform transition-transform duration-500 hover:scale-105">
      <div className="bg-primary text-primary-foreground p-3 flex items-center gap-3">
        <GraduationCap size={40} />
        <div className="text-left">
          <h2 className="font-bold text-lg leading-tight">SCHOLAR'S INSTITUTE</h2>
          <p className="text-xs">IDENTITY CARD</p>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-12 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-400 font-bold tracking-[0.2em] uppercase" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}>
            Student
          </p>
        </div>

        <div className="flex-1 p-4 flex flex-col items-center text-foreground">
          <div className="w-28 h-28 rounded-md border-2 border-primary overflow-hidden mt-2 shrink-0">
            <Image
              src={photo || 'https://placehold.co/112x112.png'}
              alt={name || 'Student Photo'}
              width={112}
              height={112}
              className="object-cover w-full h-full"
              data-ai-hint="person portrait"
            />
          </div>

          <h1 className="text-xl font-bold mt-3 text-center">{name}</h1>
          <p className="text-sm text-muted-foreground">ID: {idNumber}</p>

          <hr className="w-full my-4" />

          <div className="w-full text-sm space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Session:</span>
              <span className="text-right">{session}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Department:</span>
              <span className="text-right">{department}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Blood Group:</span>
              <span className="text-right">{bloodGroup}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Mobile:</span>
              <span className="text-right">{mobile}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-muted-foreground">Emergency:</span>
              <span className="text-right">{emergency}</span>
            </div>
          </div>

          <div className="mt-auto w-full text-center">
             <p className="font-signature text-3xl text-gray-700 truncate">{name}</p>
             <p className="text-xs text-muted-foreground border-t border-gray-300 pt-1">Signature</p>
          </div>
        </div>
      </div>
       <div className="bg-primary text-primary-foreground p-2 text-center text-xs">
          www.scholarsinstitute.edu
        </div>
    </Card>
  );
}
