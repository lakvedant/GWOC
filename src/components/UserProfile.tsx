import React, { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, ShoppingBag, Heart, Star, LogIn } from 'lucide-react';
import LoginSignupModal from './Login';
import Link from 'next/link';

interface UserInfo {
  name: string;
  email: string;
}

const UserDropdown = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  };

  if (!userInfo) {
    return (
      <div  className='flex'>
        <Button
          variant="ghost" 
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
          onClick={() => setIsModalOpen(true)}
        >
          <LogIn size={20} />
          <span>Login</span>
        </Button>
        
        <LoginSignupModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50"
        >
          <User size={20} />
          <span className="max-w-[100px] truncate">{userInfo.name}</span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-56" align="end">
        
        <DropdownMenuSeparator />
        
        <Link href="/dashboard">
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <User size={16} />
         
          <span>Your Profile</span>
          
        </DropdownMenuItem>
        </Link>
        
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <ShoppingBag size={16} />
          <span>My Orders</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Star size={16} />
          <span>My Reviews</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <Heart size={16} />
          <span>My Favorites</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center gap-2 text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
          onClick={handleLogout}
        >
          <LogIn size={16} className="rotate-180" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;