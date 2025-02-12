'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Cake, 
  Cookie, 
  Croissant, 
  Coffee, 
  Gift 
} from 'lucide-react';

interface CategoryProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  isActive?: boolean;
}

const CategoryButton = ({ icon, label, count, isActive }: CategoryProps) => (
  <Button
    variant="ghost"
    className={`w-full flex items-center justify-start gap-3 p-3 mb-1 transition-all
      ${isActive 
        ? 'bg-pink-100 text-pink-900 hover:bg-pink-200' 
        : 'hover:bg-pink-50 text-gray-700'
      }`}
  >
    <span className="text-pink-500">{icon}</span>
    <span className="flex-1 text-lg text-left pl-5" >{label}</span>
    <span className="text-xs px-2 py-1 rounded-full bg-pink-50 text-pink-600">
      {count}
    </span>
  </Button>
);

const BakerySidebar = () => {
  const [activeCategory, setActiveCategory] = React.useState('Cakes');

  const categories = [
    { icon: <Cake size={40} />, label: 'Cakes', count: 12 },
    { icon: <Cookie size={40} />, label: 'Cookies', count: 8 },
    { icon: <Croissant size={40} />, label: 'Pastries', count: 15 },
    { icon: <Coffee size={40} />, label: 'Beverages', count: 6 },
    { icon: <Gift size={40} />, label: 'Special Items', count: 4 },
  ];

  return (
    <div className="w-80 h-screen bg-white border-r border-pink-100 pt-3 ">
      
      <ScrollArea className="h-[calc(100vh-5rem)] px-4 py-2">
        {categories.map((category) => (
          <CategoryButton
            key={category.label}
            {...category}
            isActive={activeCategory === category.label}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default BakerySidebar;