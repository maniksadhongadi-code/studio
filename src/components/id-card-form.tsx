import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, Shuffle, Download } from 'lucide-react';

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
  onRegenerate: () => void;
  onDownload: () => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
};

export function IdCardForm({ onRegenerate, quantity, onQuantityChange }: IdCardFormProps) {
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onQuantityChange(value);
    } else if (e.target.value === '') {
      onQuantityChange(1);
    }
  };

  const photoInputId = React.useId();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Generate Your ID Cards</CardTitle>
            <CardDescription>Set quantity and click regenerate.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
           <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input 
                id="quantity" 
                name="quantity" 
                type="number"
                value={quantity} 
                onChange={handleQuantityChange} 
                placeholder="e.g. 10" 
                min="1"
              />
            </div>
          
          <div className="space-y-2 pt-2">
            <Label className="block mb-2">Actions</Label>
            <div className="grid grid-cols-1 gap-4">
                <Button variant="outline" onClick={onRegenerate} className="w-full">
                    <Shuffle className="mr-2 h-4 w-4" />
                    Regenerate
                </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
    