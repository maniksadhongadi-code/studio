
'use client';

import { useState, useEffect, useRef, ComponentProps, createRef } from 'react';
import html2canvas from 'html2canvas';
import { IdCardForm } from '@/components/id-card-form';
import { IdCardPreview } from '@/components/id-card-preview';
import { ImageGallery } from '@/components/image-gallery';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
  'Vrinda', 'Yashvi', 'Zara', 'Aadil', 'Aakash', 'Aarif', 'Aasif', 'Aatish', 'Aayush', 'Abdul', 'Abdullah',
  'Abhay', 'Abhijit', 'Abhishek', 'Adam', 'Adarsh', 'Adnan', 'Akash', 'Akbar', 'Akhil', 'Akshay',
  'Albert', 'Alex', 'Alexander', 'Ali', 'Aman', 'Amar', 'Amit', 'Amitabh', 'Anand', 'Anant',
  'Angel', 'Ankit', 'Anthony', 'Anuj', 'Anupam', 'Apoorv', 'Armaan', 'Arun', 'Arvind', 'Aryan',
  'Ashish', 'Ashok', 'Ashwin', 'Asif', 'Atul', 'Avinash', 'Azhar', 'Babar', 'Babloo', 'Babul',
  'Badal', 'Balaji', 'Balbir', 'Baldev', 'Balram', 'Balwan', 'Bhanu', 'Bharat', 'Bhaskar', 'Bhupendra',
  'Bikram', 'Bimal', 'Binod', 'Bipin', 'Birendra', 'Bishan', 'Chandan', 'Chandra', 'Chandrakant', 'Chapal',
  'Charles', 'Chinmay', 'Chintu', 'Daniel', 'David', 'Dayanand', 'Debashish', 'Debjit', 'Deependra', 'Devendra',
  'Dhananjay', 'Dharam', 'Dharmendra', 'Dheeraj', 'Dhiren', 'Dinesh', 'Divyanshu', 'Divyesh', 'Durgesh', 'Gagan',
  'Gajendra', 'Gautam', 'George', 'Gopal', 'Govind', 'Gulshan', 'Gurdeep', 'Gurmeet', 'Gyan', 'Hardeep',
  'Hardik', 'Hari', 'Harishankar', 'Harpreet', 'Himanshu', 'Imran', 'Inderjeet', 'Inderpal', 'Iqbal', 'Irfaan',
  'Jacob', 'Jagdish', 'Jaideep', 'Jaidev', 'James', 'Jaspal', 'Jaswant', 'Javed', 'Jayant', 'Jitendra',
  'John', 'Joseph', 'Kailash', 'Kalpesh', 'Kalyan', 'Kapil', 'Karthik', 'Kashyap', 'Kaushal', 'Keshav',
  'Kishore', 'Krishna', 'Kuldeep', 'Lakshman', 'Mahendra', 'Mahesh', 'Mandeep', 'Mangesh', 'Manjeet', 'Manoj',
  'Mark', 'Mayur', 'Michael', 'Milan', 'Mitesh', 'Mithun', 'Mohammed', 'Mohan', 'Mukesh', 'Mukul',
  'Mustafa', 'Nadeem', 'Nagendra', 'Naresh', 'Naveen', 'Navin', 'Neeraj', 'Nilesh', 'Pankaj', 'Pavan',
  'Pawan', 'Peter', 'Pradeep', 'Prakash', 'Pramod', 'Prasad', 'Praveen', 'Pravin', 'Prem', 'Puneet',
  'Pushkar', 'Qasim', 'Raghav', 'Rajeev', 'Rajesh', 'Rajiv', 'Raju', 'Ram', 'Raman', 'Ramesh',
  'Ranjeet', 'Ranjit', 'Ravi', 'Ravinder', 'Rishabh', 'Ritesh', 'Robert', 'Robin', 'Rupesh', 'Sachin',
  'Sagar', 'Sajid', 'Salim', 'Salman', 'Samuel', 'Sandeep', 'Sanjeev', 'Sanjay', 'Santosh', 'Sarfaraz',
  'Satish', 'Satya', 'Satyendra', 'Saurav', 'Shahid', 'Shailesh', 'Shakti', 'Shankar', 'Sharad', 'Shashank',
  'Shashi', 'Shekhar', 'Shishir', 'Shivam', 'Sikandar', 'Sonu', 'Subhash', 'Sudhir', 'Sujit', 'Sultan',
  'Sunil', 'Suresh', 'Surya', 'Sushil', 'Syed', 'Tanmay', 'Tanuj', 'Tarun', 'Tejas', 'Thomas', 'Umesh', 'Usman',
  'Vaibhav', 'Vibhor', 'Vidit', 'Vijay', 'Vikas', 'Vikram', 'Vimal', 'Vinod', 'Virendra', 'Vishnu', 'William',
  'Yadav', 'Yasin', 'Yasir', 'Yusuf', 'Zayn', 'Zeeshan', 'Zubair', 'Aafreen', 'Aakanksha', 'Aarti', 'Aastha',
  'Abha', 'Abhilasha', 'Adhira', 'Aishwarya', 'Akanksha', 'Akhila', 'Akshara', 'Akshita', 'Alka', 'Alpana',
  'Amisha', 'Amita', 'Amulya', 'Anamika', 'Anamitra', 'Anandita', 'Anasuya', 'Anchal', 'Anisha', 'Anita',
  'Anju', 'Ankita', 'Annapurna', 'Anshika', 'Anupama', 'Anuradha', 'Anusha', 'Aparna', 'Apeksha', 'Apoorva',
  'Arpita', 'Aruna', 'Arya', 'Asha', 'Ashwini', 'Asmita', 'Babita', 'Bandana', 'Barkha', 'Basanti',
  'Bela', 'Bhanupriya', 'Bharati', 'Bhavana', 'Bhawna', 'Bhoomi', 'Bhumika', 'Chandana', 'Chandani', 'Chandrika',
  'Chaya', 'Chetana', 'Chitra', 'Daisy', 'Damini', 'Darshana', 'Dayanita', 'Deepa', 'Deepika', 'Deepti',
  'Devi', 'Devika', 'Dhanashri', 'Dharini', 'Dhriti', 'Diksha', 'Divya', 'Dolly', 'Ekta', 'Ela',
  'Elina', 'Farah', 'Fariha', 'Fatima', 'Firoza', 'Fulki', 'Gargi', 'Garima', 'Geeta', 'Geetanjali',
  'Girija', 'Gita', 'Gitanjali', 'Gowri', 'Gulab', 'Gunjan', 'Gyanada', 'Haripriya', 'Harshita', 'Heena',
  'Hema', 'Hemalata', 'Indira', 'Indrani', 'Indu', 'Isha', 'Ishani', 'Ishwari', 'Jagriti', 'Jasmine',
  'Jasmin', 'Jaspreet', 'Jaya', 'Jayanti', 'Jayshree', 'Jennifer', 'Juhi', 'Jyoti', 'Jyotsna', 'Kajal',
  'Kalpana', 'Kalyani', 'Kamala', 'Kamini', 'Kanchan', 'Kanta', 'Karishma', 'Kasturi', 'Kaumudi', 'Kausar',
  'Kavita', 'Khushboo', 'Kiran', 'Kirti', 'Komal', 'Koyal', 'Kranti', 'Krishna', 'Kshama', 'Kusum',
  'Lajwanti', 'Lakshmi', 'Lalita', 'Lata', 'Lavanya', 'Leela', 'Lekha', 'Lilly', 'Madhavi', 'Madhu',
  'Madhubala', 'Madhulika', 'Madhuri', 'Madhumita', 'Mala', 'Malati', 'Malini', 'Mamta', 'Manisha', 'Manju',
  'Manjula', 'Manjusha', 'Manorama', 'Mansi', 'Maria', 'Maruti', 'Maya', 'Mayawati', 'Medha', 'Meenakshi',
  'Megha', 'Meghna', 'Menaka', 'Minal', 'Minakshi', 'Mira', 'Mita', 'Mohini', 'Mona', 'Monica',
  'Mridula', 'Mrinalini', 'Mukta', 'Mukul', 'Nagma', 'Nalini', 'Namita', 'Namrata', 'Nandini', 'Nandita',
  'Naomi', 'Nargis', 'Neelam', 'Neelima', 'Neeta', 'Neetu', 'Nidhi', 'Nilima', 'Nilofer', 'Nirmala',
  'Nirupama', 'Nisha', 'Nishtha', 'Nivedita', 'Nupur', 'Nutan', 'Padma', 'Padmini', 'Pallavi', 'Pamela',
  'Pankaja', 'Panna', 'Parineeta', 'Parminder', 'Parul', 'Parvati', 'Payal', 'Phoolan', 'Poonam', 'Prabha',
  'Prabhati', 'Prachi', 'Pratibha', 'Pratima', 'Preeti', 'Prema', 'Prerana', 'Priti', 'Priya', 'Priyadarshini',
  'Priyanka', 'Promila', 'Purnima', 'Pushpa', 'Raakhee', 'Rabia', 'Rachana', 'Radha', 'Radhika', 'Rageshree',
  'Rajalakshmi', 'Rajani', 'Rajeshwari', 'Rajkumari', 'Rajnandini', 'Raksha', 'Rama', 'Ramya', 'Rani', 'Ranjana',
  'Ranjeeta', 'Rashmi', 'Ratna', 'Rekha', 'Renu', 'Renuka', 'Reshma', 'Reva', 'Revati', 'Richa',
  'Riddhi', 'Rimjhim', 'Rina', 'Rinki', 'Rita', 'Ritika', 'Ritu', 'Rochana', 'Rohini', 'Roma',
  'Roopa', 'Roshni', 'Ruchi', 'Rukmini', 'Rupa', 'Rupali', 'Sabina', 'Sabita', 'Sadhana', 'Saeeda',
  'Saguna', 'Sahan', 'Sahana', 'Saheli', 'Salma', 'Saloni', 'Samata', 'Sameera', 'Samiksha', 'Sanchita',
  'Sandhya', 'Sangeeta', 'Sanjana', 'Sanjivani', 'Sanjukta', 'Sapna', 'Sarika', 'Sarita', 'Sarla', 'Saroj',
  'Saroja', 'Sashi', 'Sasmita', 'Satya', 'Savita', 'Savitri', 'Seema', 'Shabana', 'Shabnam', 'Shaila',
  'Shailaja', 'Shakti', 'Shakuntala', 'Shalini', 'Shanta', 'Shanti', 'Sharada', 'Sharanya', 'Sharmila', 'Shashi',
  'Sheela', 'Sheetal', 'Shikha', 'Shilpa', 'Shirin', 'Shivani', 'Shraddha', 'Shrestha', 'Shruti', 'Shweta',
  'Sima', 'Simi', 'Simran', 'Sindhu', 'Smita', 'Smriti', 'Sneh', 'Snehal', 'Snigdha', 'Soha',
  'Sonal', 'Sonali', 'Sonia', 'Sonu', 'Subhadra', 'Subhashini', 'Subhashree', 'Sucharita', 'Sucheta', 'Suchitra',
  'Sudesha', 'Sudha', 'Sudipta', 'Sugandha', 'Sujata', 'Sukanya', 'Sulekha', 'Suman', 'Sumati', 'Sumitra',
  'Sunanda', 'Sunayana', 'Sundari', 'Sunita', 'Suparna', 'Supriya', 'Surabhi', 'Surekha', 'Sushama', 'Sushila',
  'Sushma', 'Sushmita', 'Susmita', 'Swagata', 'Swapna', 'Swarnalata', 'Swati', 'Sweta', 'Tabassum', 'Tanushree',
  'Tripti', 'Trisha', 'Tulsi', 'Uma', 'Upasana', 'Urmila', 'Usha', 'Ushakiran', 'Ushashi', 'Ushma',
  'Utpala', 'Vaishali', 'Vandana', 'Vanita', 'Varsha', 'Vasudha', 'Vasundhara', 'Veena', 'Vidisha', 'Vidula',
  'Vijaya', 'Vijayalakshmi', 'Vimala', 'Vinata', 'Vinaya', 'Vineeta', 'Yamini', 'Yamuna', 'Yasmin',
  'Yogita', 'Yojana', 'Zeenat'
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
    'Raina', 'Sabharwal', 'Talwar', 'Wadhwa', 'Yadav', 'Zutshi', 'Ahmed', 'Khan', 'Ansari', 'Shaikh',
    'Siddiqui', 'Qureshi', 'Syed', 'Pathan', 'Memon', 'Chaudhari', 'Patil', 'Jadhav', 'Shinde', 'Gaikwad',
    'More', 'Pawar', 'Kadam', 'Sawant', 'Desai', 'Joglekar', 'Phadke', 'Godbole', 'Kelkar', 'Gokhale',
    'Sathe', 'Datar', 'Limaye', 'Inamdar', 'Paranjape', 'Nene', 'Vaidya', 'Rane', 'Chavan', 'Mohite',
    'Ghatge', 'Shirke', 'Bhosale', 'Scindia', 'Holkar', 'Peshwa', 'Tambe', 'Pandit', 'Sane', 'Gadgil',
    'Apte', 'Modi', 'Ambani', 'Adani', 'Birla', 'Tata', 'Godrej', 'Wadia', 'Mallya', 'Mahindra',
    'Bajaj', 'Hinduja', 'Goenka', 'Singhania', 'Ruia', 'Munjal', 'Burman', 'Poonawalla', 'Parikh', 'Amin',
    'Dalmia', 'Kothari', 'Bangur', 'Somani', 'Piramal', 'Thapar', 'Jalan', 'Kanoria', 'Khaitan', 'Saraf',
    'Podar', 'Rupramka', 'Lohia', 'Neotia', 'Kanwar', 'Nayar', 'Ansal', 'Raheja', 'Hiranandani', 'Nadar',
    'Murthy', 'Premji', 'Nilekani', 'Gopalakrishnan', 'Shibulal', 'Aggarwal', 'Bhavish', 'Bansal', 'Yadav', 'Zaveri',
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

export default function Home() {
  const [cardDataList, setCardDataList] = useState<CardData[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<(string | null)[]>([]);
  const [quantity, setQuantity] = useState(1);
  const cardPreviewRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    handleRegenerate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryPhotos]);

  const handleUpdate = (index: number, newData: Partial<CardData>) => {
    setCardDataList(prevList => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], ...newData };
      return newList;
    });
  };

  const handleRegenerate = () => {
    const availablePhotos = galleryPhotos.filter(p => p);
    const newCardDataList = Array.from({ length: quantity }, () => {
        const randomData = generateRandomData();
        const randomPhoto = availablePhotos.length > 0 ? getRandomItem(availablePhotos) : null;
        return { ...randomData, photo: randomPhoto };
    });
    
    cardPreviewRefs.current = newCardDataList.map(
        (_, i) => cardPreviewRefs.current[i] ?? createRef()
    );

    setCardDataList(newCardDataList);
  };

  const handleDownload = (index: number) => {
    const cardRef = cardPreviewRefs.current[index];
    if (cardRef && cardRef.current) {
      html2canvas(cardRef.current, { scale: 3 }).then(canvas => {
        const link = document.createElement('a');
        const cardData = cardDataList[index];
        link.download = `id-card-${cardData.studentId || 'download'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const handleDownloadAll = () => {
    cardDataList.forEach((_, index) => {
      // Add a small delay between downloads to avoid browser issues with multiple rapid downloads
      setTimeout(() => handleDownload(index), index * 300);
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:px-6 md:py-12">
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
          <div className="lg:col-span-3 space-y-8">
            {cardDataList.length > 0 ? (
                cardDataList.map((cardData, index) => (
                    <div key={index} className="flex flex-col items-center">
                         <div className="w-[350px] mb-4">
                            <Label className="text-lg font-semibold text-center block">
                               Preview for {cardData.name}
                            </Label>
                         </div>
                        <IdCardPreview ref={cardPreviewRefs.current[index]} {...cardData} />
                        <Button onClick={() => handleDownload(index)} className="mt-4 w-full max-w-[350px]">
                            <Download className="mr-2 h-4 w-4" />
                            Download Card
                        </Button>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 text-muted-foreground">
                    <p>Click &quot;Regenerate&quot; to create ID cards.</p>
                </div>
            )}
           </div>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm border-t">
        <p>Built with Next.js and ShadCN UI. Designed for modern identity solutions.</p>
      </footer>
    </div>
  );
}

    
