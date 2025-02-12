import ProductGrid from '@/components/CakeProdcutGrid';
import Banner from '@/components/MenuBanner';
import BakerySidebar from '@/components/MenuSidebar';
import React from 'react';

const Page = () => {
  return (
    <div className='' >
    <Banner />
    <div className='flex'>
    <BakerySidebar />
      <ProductGrid />
      </div>
    </div>
  );
};

export default Page;
