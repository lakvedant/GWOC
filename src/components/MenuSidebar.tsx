'use client';
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
  onClick?: () => void;
}

const CategoryButton = ({ icon, label, count, isActive }: CategoryProps) => (
  <Button
    variant="ghost"
    className={`w-full flex items-center justify-start gap-4 p-4 mb-2 rounded-xl transition-all text-lg
      ${isActive 
        ? 'bg-pink-100 text-pink-900 hover:bg-pink-200 shadow-sm' 
        : 'hover:bg-pink-50 text-gray-700'
      }`}
  >
    <span className={`text-pink-500 transition-transform ${isActive ? 'scale-110' : ''}`}>
      {icon}
    </span>
    <span className="flex-1 font-medium">{label}</span>
    <span className="text-sm px-3 py-1 rounded-full bg-pink-50 text-pink-600 font-medium">
      {count}
    </span>
  </Button>
);

const BakerySidebar = () => {
  const [activeCategory, setActiveCategory] = React.useState('Cakes');

  const categories = [
    { icon: <Cake size={24} />, label: 'Cakes', count: 12 },
    { icon: <Cookie size={24} />, label: 'Cookies', count: 8 },
    { icon: <Croissant size={24} />, label: 'Pastries', count: 15 },
    { icon: <Coffee size={24} />, label: 'Beverages', count: 6 },
    { icon: <Gift size={24} />, label: 'Special Items', count: 4 },
  ];

  return (
    <div className="bg-white border-r border-pink-100 pt-10 h-screen w-80 lg:w-64 md:w-56 sm:w-48 xs:w-full"> {/* Responsive width */}
      <ScrollArea className="h-[calc(100vh-7rem)] px-4 py-4">
        <div className="space-y-2">
          {categories.map((category) => (
            <CategoryButton
              key={category.label}
              {...category}
              isActive={activeCategory === category.label}
              onClick={() => setActiveCategory(category.label)} // Make buttons interactive
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default BakerySidebar;