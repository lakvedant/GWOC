import ProductGrid from '@/components/CakeProdcutGrid';
import Banner from '@/components/MenuBanner';
import BakerySidebar from '@/components/MenuSidebar';
import React from 'react';

const Page = () => {
  return (
    <div >
    <Banner title="Admin Dashboard" description="Manage your bakery items and orders here" />
    <div className='flex'>
    <BakerySidebar />
      <ProductGrid />
      </div>
    </div>
  );
};

export default Page;
