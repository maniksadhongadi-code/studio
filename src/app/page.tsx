
'use client';

import { useState, useEffect, useRef, ComponentProps, createRef } from 'react';
import html2canvas from 'html2canvas';
import { IdCardForm } from '@/components/id-card-form';
import { IdCardPreview } from '@/components/id-card-preview';
import { ImageGallery } from '@/components/image-gallery';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { FixedSizeList } from 'react-window';

type CardData = ComponentProps<typeof IdCardPreview>;

const firstNames = [
  'Aarav', 'Aaryan', 'Aayush', 'Abdul', 'Abdullah', 'Abhay', 'Abhijit', 'Abhimanyu', 'Abhinav', 'Abhishek', 'Adam', 'Adarsh', 'Aditya', 'Adnan', 'Advait', 'Advik', 'Agastya', 'Ahil', 'Ahmad', 'Ahmed', 'Ajay', 'Ajit', 'Akash', 'Akbar', 'Akhil', 'Akram', 'Akshay', 'Akshat', 'Alok', 'Aman', 'Amar', 'Amit', 'Amitabh', 'Amol', 'Anand', 'Anant', 'Aniket', 'Anil', 'Anirudh', 'Ankit', 'Ankur', 'Anmol', 'Ansh', 'Anshul', 'Anthony', 'Anuj', 'Anupam', 'Anurag', 'Arav', 'Arbaaz', 'Arham', 'Arif', 'Arjun', 'Armaan', 'Arnav', 'Arshad', 'Arun', 'Arvind', 'Aryan', 'Ashish', 'Ashok', 'Ashutosh', 'Ashwin', 'Asif', 'Atharv', 'Atif', 'Atul', 'Avinash', 'Ayaan', 'Ayaz', 'Ayush',
  'Azad', 'Azhar', 'Babar', 'Babloo', 'Babul', 'Badal', 'Balaji', 'Balbir', 'Baldev', 'Balram', 'Balwan', 'Bhanu', 'Bharat', 'Bhaskar', 'Bhavesh', 'Bhavin', 'Bhupendra', 'Bikram', 'Bimal', 'Binod', 'Bipin', 'Birendra', 'Bishan', 'Chandan', 'Chandra', 'Chandrakant', 'Chapal', 'Charles', 'Chetan', 'Chinmay', 'Chintu', 'Chirag', 'Daniel', 'Darshan', 'David', 'Dayanand', 'Debashish', 'Debjit', 'Deep', 'Deepak', 'Deependra', 'Dev', 'Devendra', 'Dhananjay', 'Dharam', 'Dharmendra', 'Dheeraj', 'Dhiren', 'Dhruv', 'Dinesh', 'Divyanshu', 'Divyesh', 'Durgesh', 'Eklavya', 'Faizan', 'Farhan', 'Gagan', 'Gajendra', 'Ganesh', 'Gaurav', 'Gautam', 'George', 'Girish', 'Gopal', 'Govind', 'Gulshan', 'Gurdeep', 'Gurmeet', 'Gyan', 'Hardeep', 'Hardik', 'Hari', 'Harish', 'Harishankar', 'Harpreet', 'Harsh', 'Harshad', 'Hemant', 'Himanshu', 'Hitesh', 'Hrithik', 'Imran', 'Inderjeet', 'Inderpal', 'Iqbal', 'Irfaan', 'Ishan', 'Ishaan', 'Jacob', 'Jagdish', 'Jaideep', 'Jaidev', 'James', 'Jash', 'Jaspal', 'Jaswant', 'Javed', 'Jay', 'Jayant', 'Jignesh', 'Jitendra', 'John', 'Joseph', 'Kailash', 'Kalpesh', 'Kalyan', 'Kamal', 'Kapil', 'Karan', 'Karthik', 'Kartik', 'Kashyap', 'Kaushal', 'Kaushik', 'Keshav', 'Kishan', 'Kishore', 'Krishna', 'Kuldeep', 'Kunal', 'Kush', 'Laksh', 'Lakshay', 'Lakshman', 'Lalit', 'Lokesh', 'Madhav', 'Mahendra', 'Mahesh', 'Manan', 'Mandeep', 'Mangesh', 'Manish', 'Manjeet', 'Manjot', 'Manoj', 'Mark', 'Mayank', 'Mayur', 'Michael', 'Mihir', 'Milan', 'Mitesh', 'Mithun', 'Mohammed', 'Mohan', 'Mohit', 'Mukul', 'Mukesh', 'Mustafa', 'Nadeem', 'Nagendra', 'Nakul', 'Naman', 'Naresh', 'Naveen', 'Navin', 'Neel', 'Neeraj', 'Nikhil', 'Nilesh', 'Nirav', 'Nishant', 'Nitin', 'Om', 'Pankaj', 'Parth', 'Pavan', 'Pawan', 'Peter', 'Piyush', 'Pradeep', 'Prakash', 'Pramod', 'Pranav', 'Pranay', 'Prasad', 'Prashant', 'Prateek', 'Praveen', 'Pravin', 'Prem', 'Puneet', 'Pushkar', 'Qasim', 'Raghav', 'Rahul', 'Raj', 'Rajan', 'Rajeev', 'Rajesh', 'Rajiv', 'Rajat', 'Raju', 'Rakesh', 'Ram', 'Raman', 'Ramesh', 'Ranjeet', 'Ranjit', 'Ravi', 'Ravinder', 'Rishabh', 'Rishi', 'Ritesh', 'Rohan', 'Rohit', 'Robert', 'Robin', 'Ronak', 'Roshan', 'Rupesh', 'Sachin', 'Sagar', 'Sahil', 'Sajid', 'Salim', 'Salman', 'Sameer', 'Samuel', 'Sandeep', 'Sanjay', 'Sanjeev', 'Sanket', 'Santosh', 'Sarfaraz', 'Satish', 'Satya', 'Satyendra', 'Saurabh', 'Saurav', 'Shaan', 'Shahid', 'Shailesh', 'Shakti', 'Shankar', 'Sharad', 'Shashank', 'Shashi', 'Shekhar', 'Shishir', 'Shivam', 'Shreyas', 'Shubham', 'Siddharth', 'Sikandar', 'Soham', 'Sohail', 'Sonu', 'Subhash', 'Sudhir', 'Sujit', 'Sultan', 'Sumit', 'Sunil', 'Sunny', 'Suresh', 'Surya', 'Sushil', 'Syed', 'Tanmay', 'Tanuj', 'Tarun', 'Tejas', 'Thomas', 'Tushar', 'Uday', 'Umesh', 'Usman', 'Utkarsh', 'Vaibhav', 'Varun', 'Vibhor', 'Vidit', 'Vijay', 'Vikas', 'Vikram', 'Vimal', 'Vinay', 'Vinod', 'Vipul', 'Virendra', 'Vishal', 'Vishnu', 'Vivek', 'William', 'Yadav', 'Yash', 'Yasin', 'Yasir', 'Yogesh', 'Yusuf', 'Zayn', 'Zeeshan', 'Zubair'
];
const lastNames = [
    'Kumar', 'Sharma', 'Singh', 'Patel', 'Gupta', 'Reddy', 'Chopra', 'Malhotra', 'Jain', 'Verma',
    'Mehta', 'Shah', 'Yadav', 'Mishra', 'Pandey', 'Tiwari', 'Dubey', 'Chauhan', 'Rathore', 'Rao',
    'Naidu', 'Iyer', 'Menon', 'Nair', 'Pillai', 'Joshi', 'Bhat', 'Kulkarni', 'Deshpande', 'Das',
    'Choudhury', 'Sarkar', 'Bose', 'Ghosh', 'Banerjee', 'Mukherjee', 'Chatterjee', 'Dutta', 'Roy',
    'Agarwal', 'Goel', 'Singhal', 'Bansal', 'Garg', 'Jindal', 'Mittal', 'Agrawal', 'Khandelwal',
    'Maheshwari', 'Oswal', 'Parekh', 'Lodha', 'Chhabra', 'Arora', 'Khatri', 'Sethi', 'Malik', 'Kapoor',
    'Khanna', 'Mehra', 'Anand', 'Puri', 'Suri', 'Ahluwalia', 'Grover', 'Dhawan', 'Bhasin', 'Bhatia',
    'Bedi', 'Sodhi', 'Kohli', 'Sahni', 'Narula', 'Chawla', 'Taneja', 'Walia', 'Bindra', 'Lamba',
    'Sachdeva', 'Bajwa', 'Dhillon', 'Sidhu', 'Brar', 'Gill', 'Sandhu', 'Mann', 'Grewal', 'Basu',
    'Thakur', 'Saxena', 'Sinha', 'Srivastava', 'Bhatnagar', 'Mathur', 'Kayastha', 'Dixit', 'Shukla', 'Pathak',
    'Tripathi', 'Upadhyay', 'Bhattacharya', 'Ganguly', 'Mazumdar', 'Nayak', 'Patnaik', 'Sahu', 'Mohanty', 'Mistry',
    'Prajapati', 'Soni', 'Verlekar', 'Kamat', 'Prabhu', 'Shenoy', 'Naik', 'Hegde', 'Shetty', 'Rai',
    'Adiga', 'Bhandary', 'Acharya', 'Udupa', 'Holla', 'Bhattathiri', 'Namboothiri', 'Warrier', 'Pisharody', 'Marar',
    'Kurup', 'Panicker', 'Kaimal', 'Varghese', 'Thomas', 'George', 'Abraham', 'Mathew', 'Jacob', 'Chacko',
    'Joseph', 'Kurian', 'Philip', 'Fernandes', 'Dsouza', 'Lobo', 'Pinto', 'Castelino', 'Saldanha', 'Rebello',
    'Coelho', 'Mascarenhas', 'Gonsalves', 'Rodrigues', 'Pereira', 'Almeida', 'Noronha', 'Sequeira', 'Telles', 'Figueiredo',
    'Menezes', 'Fonseca', 'Deol', 'Dhaliwal', 'Randhawa', 'Cheema', 'Bains', 'Kahlon', 'Sekhon', 'Virk',
    'Ahuja', 'Chadha', 'Duggal', 'Gandhi', 'Johar', 'Khurana', 'Luthra', 'Madan', 'Nanda', 'Oberoi',
    'Raina', 'Sabharwal', 'Talwar', 'Wadhwa', 'Zutshi', 'Ahmed', 'Khan', 'Ansari', 'Shaikh',
    'Siddiqui', 'Qureshi', 'Syed', 'Pathan', 'Memon', 'Chaudhari', 'Patil', 'Jadhav', 'Shinde', 'Gaikwad',
    'More', 'Pawar', 'Kadam', 'Sawant', 'Desai', 'Joglekar', 'Phadke', 'Godbole', 'Kelkar', 'Gokhale',
    'Sathe', 'Datar', 'Limaye', 'Inamdar', 'Paranjape', 'Nene', 'Vaidya', 'Rane', 'Chavan', 'Mohite',
    'Ghatge', 'Shirke', 'Bhosale', 'Scindia', 'Holkar', 'Peshwa', 'Tambe', 'Pandit', 'Sane', 'Gadgil',
    'Apte', 'Modi', 'Ambani', 'Adani', 'Birla', 'Tata', 'Godrej', 'Wadia', 'Mallya', 'Mahindra',
    'Bajaj', 'Hinduja', 'Goenka', 'Singhania', 'Ruia', 'Munjal', 'Burman', 'Poonawalla', 'Parikh', 'Amin',
    'Dalmia', 'Kothari', 'Bangur', 'Somani', 'Piramal', 'Thapar', 'Jalan', 'Kanoria', 'Khaitan', 'Saraf',
    'Podar', 'Rupramka', 'Lohia', 'Neotia', 'Kanwar', 'Nayar', 'Ansal', 'Raheja', 'Hiranandani', 'Nadar',
    'Murthy', 'Premji', 'Nilekani', 'Gopalakrishnan', 'Shibulal', 'Aggarwal', 'Bhavish', 'Bansal', 'Zaveri',
    'Contractor', 'Engineer', 'Mistry', 'Merchant', 'Vakil', 'Doctor', 'Daruwalla', 'Sodawaterbottleopenerwala', 'Wankhede'
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

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// This is the component that will be rendered by the FixedSizeList.
const CardRow = ({ index, style, data }: { index: number, style: React.CSSProperties, data: { cardDataList: CardData[], cardPreviewRefs: React.RefObject<HTMLDivElement>[], handleDownload: (index: number) => void } }) => {
    const { cardDataList, cardPreviewRefs, handleDownload } = data;
    const cardData = cardDataList[index];
    
    // Ensure the ref for this index exists
    if (!cardPreviewRefs[index]) {
        cardPreviewRefs[index] = createRef<HTMLDivElement>();
    }

    return (
        <div style={style} className="flex justify-center">
            <div className="flex flex-col items-center">
                <div className="w-[350px] mb-4">
                    <Label className="text-lg font-semibold text-center block">
                        Preview for {cardData.name}
                    </Label>
                </div>
                <IdCardPreview ref={cardPreviewRefs[index]} {...cardData} />
                <Button onClick={() => handleDownload(index)} className="mt-4 w-full max-w-[350px]">
                    <Download className="mr-2 h-4 w-4" />
                    Download Card
                </Button>
            </div>
        </div>
    );
};

export default function Home({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const [cardDataList, setCardDataList] = useState<CardData[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<(string | null)[]>([]);
  const [quantity, setQuantity] = useState<number | ''>(1);
  const cardPreviewRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const handleRegenerate = () => {
    const numQuantity = typeof quantity === 'number' && quantity > 0 ? quantity : 1;
    const availablePhotos = galleryPhotos.filter((p): p is string => p !== null);
    const shuffledPhotos = shuffleArray(availablePhotos);

    const newCardDataList = Array.from({ length: numQuantity }, (_, index) => {
        const randomData = generateRandomData();
        const photo = availablePhotos.length > 0 
            ? shuffledPhotos[index % shuffledPhotos.length] 
            : null;
        return { ...randomData, photo };
    });
    
    // Reset and create refs for the new list size
    cardPreviewRefs.current = Array.from({ length: newCardDataList.length }, () => createRef());
    setCardDataList(newCardDataList);
  };
  
  useEffect(() => {
    handleRegenerate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, galleryPhotos]);


  const handleDownload = (index: number) => {
    // This function now needs to handle the possibility that the ref isn't attached
    // to a DOM element because it's virtualized. A more robust solution for downloading
    // might be needed for very large lists, but this will work for visible items.
    const cardRef = cardPreviewRefs.current[index];
    if (cardRef && cardRef.current) {
      html2canvas(cardRef.current, { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        const cardData = cardDataList[index];
        link.download = `id-card-${cardData.studentId || 'download'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    } else {
        console.warn(`Cannot download card at index ${index} as it is not currently rendered.`);
        // To handle this properly, one might render the specific card off-screen before capturing.
    }
  };

  const handleDownloadAll = async () => {
     // A helper to render and capture a single card
    const captureCard = (cardData: CardData): Promise<string> => {
        return new Promise((resolve) => {
            // Create a temporary container to render the card off-screen
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            document.body.appendChild(container);

            // Temporarily render the card
            const tempCard = <IdCardPreview {...cardData} />;
            const root = require('react-dom/client').createRoot(container);
            
            // We need to delay the canvas capture slightly to allow for rendering
            root.render(tempCard);

            setTimeout(() => {
                const cardElement = container.children[0] as HTMLElement;
                html2canvas(cardElement, { scale: 3 }).then(canvas => {
                    const dataUrl = canvas.toDataURL('image/png');
                    // Cleanup
                    root.unmount();
                    document.body.removeChild(container);
                    resolve(dataUrl);
                });
            }, 100); // A small delay to ensure images are loaded etc.
        });
    };

    for (let i = 0; i < cardDataList.length; i++) {
        const cardData = cardDataList[i];
        console.log(`Generating image for ${cardData.name}...`);
        const dataUrl = await captureCard(cardData);
        const link = document.createElement('a');
        link.download = `id-card-${cardData.studentId || 'download'}.png`;
        link.href = dataUrl;
        link.click();
        // A small delay to prevent browser download spamming issues
        await new Promise(resolve => setTimeout(resolve, 300));
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <div className="fixed top-4 right-4 z-20">
          <span className="text-2xl font-bold text-primary">
              NUR &amp; GURU
          </span>
      </div>
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">IdentiCard Generator</h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            Upload your photos, set the quantity, and instantly generate official identity cards.
          </p>
        </div>
        
        <div className="mb-8">
            <ImageGallery onPhotosChange={setGalleryPhotos} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-8">
             <IdCardForm
                onUpdate={() => {}} 
                initialData={{}}
                onRegenerate={handleRegenerate}
                onDownloadAll={handleDownloadAll}
                quantity={quantity}
                onQuantityChange={setQuantity}
                isDownloadAllDisabled={cardDataList.length === 0}
             />
          </div>
          <div className="lg:col-span-3">
            {cardDataList.length > 0 ? (
                 <FixedSizeList
                    height={800} // Adjust height as needed
                    itemCount={cardDataList.length}
                    itemSize={650} // Approximate height of one card + button + margins
                    width="100%"
                    itemData={{
                        cardDataList,
                        cardPreviewRefs: cardPreviewRefs.current,
                        handleDownload
                    }}
                >
                    {CardRow}
                </FixedSizeList>
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>Click &quot;Regenerate&quot; to create ID cards.</p>
                </div>
            )}
           </div>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t relative z-10 bg-background">
        <p>Built with Next.js and ShadCN UI. Designed for modern identity solutions.</p>
      </footer>
    </div>
  );
}

