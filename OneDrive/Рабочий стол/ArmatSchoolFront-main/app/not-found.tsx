import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavBar from '@/components/NavBar/NavBar';

export default function NotFoundComponent() {
  return (
    <>
      <NavBar/>
    <div className="flex flex-col items-center justify-center relative w-full h-screen bg-white font-['Plus_Jakarta_Sans'] overflow-hidden">
      
      {/* Main Error Section (Frame 158) */}
      <main className="flex flex-col justify-center items-center relative w-full max-w-[800px] px-4 py-6 max-h-screen">
        
        {/* Background Illustration & Absolute Positioned Text Container */}
        <div className="relative w-full h-[260px] lg:h-[340px] mb-4 flex justify-center">
          <Image 
            src="/images/NotFound.png" 
            alt="Not Found Illustration" 
            fill 
            className="object-contain"
            priority
          />
          
          {/* Error Texts positioned with offset to the right */}
          <div className="absolute top-[2%] left-[calc(50%+60px)] lg:left-[calc(50%+94.5px)] transform -translate-x-1/2 flex flex-col items-center text-center gap-1 w-full max-w-[433px] px-4 z-10">
            <h1 className="text-[20px] lg:text-[36px] font-extrabold leading-[150%] text-[#2D2D2D] whitespace-nowrap">
              Oops! Page Not Found
            </h1>
            <p className="text-[12px] lg:text-[15px] font-medium leading-[150%] text-[#2D2D2D] max-w-[330px]">
              The page you’re looking for doesn’t exist or has been moved.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full max-w-[463px]">
          
          <Link href="/" className="box-border flex items-center justify-center px-8 py-2.5 gap-2.5 w-full sm:w-[226.34px] h-[44px] border-[0.67px] border-[#F15A22] rounded-[12px] text-[#F15A22] font-medium text-[16px] hover:bg-[#F15A22]/5 transition-colors">
            <span>Go to Homepage</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#F15A22]">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>

          <Link href="/courses" className="box-border flex items-center justify-center px-8 py-2.5 gap-2.5 w-full sm:w-[190px] h-[44px] border border-[#EDEDED] rounded-[12px] text-[#666666] font-normal text-[16px] hover:bg-gray-50 transition-colors">
            <span>Browse Courses</span>
          </Link>

        </div>

        {/* Footer Track Info (Frame 157) */}
        <div className="flex flex-row justify-center items-center gap-4 w-full mt-6 lg:mt-6">
          <span className="text-[14px] font-normal leading-[24px] text-[#666666] text-center">
            Let's get you back on track!
          </span>
          <div className="relative w-[45px] h-[45px] lg:w-[60px] lg:h-[60px] rotate-180">
            <Image 
              src="/images/arrow.png" 
              alt="Arrow Track" 
              fill 
              className="object-contain"
            />
          </div>
        </div>

      </main>

    </div>
    </>
  );
}