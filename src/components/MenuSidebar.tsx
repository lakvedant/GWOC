'use client'
import React, { useEffect, useState } from 'react';
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
  onClick: () => void;
}

interface CategoryCount {
  _id: string;
  count: number;
}

const CategoryButton = ({ icon, label, count, isActive, onClick }: CategoryProps) => (
  <Button
    variant="ghost"
    className={`w-full flex items-center justify-start gap-3 p-3 mb-1 transition-all
      ${isActive
        ? 'bg-pink-100 text-pink-900 hover:bg-pink-200'
        : 'hover:bg-pink-50 text-gray-700'
      }`}
    onClick={onClick}
  >
    <span className="text-pink-500">{icon}</span>
    <span className="flex-1 text-lg text-left pl-5">{label}</span>
    <span className="text-xs px-2 py-1 rounded-full bg-pink-50 text-pink-600">
      {count}
    </span>
  </Button>
);

interface BakerySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const BakerySidebar = ({ activeCategory, onCategoryChange }: BakerySidebarProps) => {
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      icon: <Cake size={40} />,
      label: 'Cakes',
    },
    {
      icon: <Cookie size={40} />,
      label: 'Brownie',
    },
    {
      icon: <Croissant size={40} />,
      label: 'Cookies',
    },
    {
      icon: <Coffee size={40} />,
      label: 'Fudge',
    },
    {
      icon: <Gift size={40} />,
      label: 'Truffle Balls',
    },
    {
      icon: <Gift size={40} />,
      label: 'Chocolate Modak',
    },
    {
      icon: <Gift size={40} />,
      label: 'Muffins',
    },
    {
      icon: <Gift size={40} />,
      label: 'Ice Cream',
    },
    {
      icon: <Gift size={40} />,
      label: 'Donuts',
    }
  ];

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const res = await fetch('/api/category-counts');
        const data = await res.json();
        const counts = data.reduce((acc: { [key: string]: number }, curr: CategoryCount) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {});
        setCategoryCounts(counts);
      } catch (error) {
        console.error('Error fetching category counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  return (
    <div className="w-80 h-full bg-white border-r border-pink-100 pt-3">
      <ScrollArea className="h-[calc(100vh-20rem)] px-4 py-2">
        {categories.map((category) => (
          <CategoryButton
            key={category.label}
            {...category}
            count={loading ? 0 : (categoryCounts[category.label] || 0)}
            isActive={activeCategory === category.label}
            onClick={() => onCategoryChange(category.label)}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default BakerySidebar;