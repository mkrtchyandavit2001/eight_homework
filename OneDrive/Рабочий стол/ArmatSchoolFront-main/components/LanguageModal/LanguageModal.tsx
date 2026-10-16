'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import TimezoneModal from '../TimezoneModal/TimezoneModal';
import WelcomeModal from '../WelcomeModal/WelcomeModal';
import { CheckIcon, CloseIcon } from '../icons/Icons';

export default function LanguageModal({ isOpen = true, onClose }) {
  const { dict } = useLanguage();
  const t = dict?.languageModal || {};

  const [selectedLang, setSelectedLang] = useState('am');

  // Վիճակներ մոդալների հերթականության համար
  const [isTimezoneModalOpen, setIsTimezoneModalOpen] = useState(false);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);

  if (!isOpen && !isTimezoneModalOpen && !isWelcomeModalOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {/* Եթե LanguageModal-ը բաց է և մյուսները դեռ չեն ակտիվացել */}
      {isOpen && !isTimezoneModalOpen && !isWelcomeModalOpen && (
        <div
          onClick={handleClose}
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4 font-['Plus_Jakarta_Sans']"
        >
          {/* Frame 84 - Main Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[1000px] h-[600px] bg-white rounded-[40px] shadow-[4px_4px_168.9px_-36px_rgba(0,0,0,0.25)] flex overflow-hidden"
          >
            {/* Left Section - Background & Character */}
            <div className="relative w-[402px] h-[600px] rounded-l-[40px] bg-[#FFF]">
              <div className="absolute inset-0">
                <Image
                  src="/images/education_background.png"
                  alt={t?.alt?.background || "Background"}
                  fill
                  className="object-cover object-left"
                />
              </div>
              <div className="absolute left-[79px] bottom-0 w-[399px] h-[599px]">
                <Image
                  src="/images/hero.png"
                  alt={t?.alt?.character || "Character"}
                  fill
                  className="object-contain z-50"
                  priority
                />
              </div>
            </div>

            {/* Right Section - Content */}
            <div className="flex flex-col justify-between items-start px-[60px] py-[40px] w-[596px] h-[600px] relative">

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-[40px] top-[40px] z-30 w-[16px] h-[16px] text-[#999999] hover:text-[#2D2D2D] transition-colors cursor-pointer"
                aria-label={t?.closeAriaLabel || "Close"}
              >
                <CloseIcon className="w-full h-full" />
              </button>

              {/* Logo */}
              <div className="w-[305px] h-[85px] relative flex-none">
                <Image
                  src="/images/Orange_text+Black_hat_1.png"
                  alt={t?.alt?.logo || "Logo"}
                  fill
                  className="object-contain object-left"
                />
              </div>

              <div className="flex flex-col items-start gap-[12px] w-[476px]">
                <h2 className="font-semibold text-[28px] leading-[36px] text-[#2D2D2D]">
                  {t?.welcomeHeading || "Welcome to Armat School"}
                </h2>
                <p className="font-normal text-[18px] leading-[24px] text-[#666666]">
                  {t?.subtitle || "Please select your preferred language"}
                </p>
                <p className="font-normal text-[14px] leading-[18px] text-[#999999]">
                  {t?.description || "You can change this anytime."}
                </p>
              </div>

              {/* Language Cards Row */}
              <div className="flex flex-row justify-between items-start px-[30px] gap-[20px] w-[476px]">
                {/* Armenian Option */}
                <div
                  onClick={() => setSelectedLang('am')}
                  className={`box-border flex flex-col justify-between items-center p-[14px_12px] w-[180px] h-[200px] rounded-[16px] cursor-pointer transition-all ${
                    selectedLang === 'am'
                      ? 'bg-[rgba(229,145,127,0.2)] border border-[#F15A22]'
                      : 'bg-white border border-[#EDEDED] shadow-[0px_0px_4px_rgba(0,0,0,0.15)]'
                  }`}
                >
                  <div className="flex flex-col items-center w-full">
                    <div className="flex justify-end w-full mb-1">
                      <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center ${selectedLang === 'am' ? 'bg-[#F15A22]' : 'border border-gray-300 bg-white'}`}>
                        {selectedLang === 'am' && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="relative w-[96px] h-[66px] my-1">
                      <Image src="/images/arm_flag.png" alt={t?.alt?.armenianFlag || "Armenian flag"} fill className="object-contain" />
                    </div>
                    <span className="mt-2 font-medium text-[16px] leading-[20px] text-[#2D2D2D]">
                      Հայերեն
                    </span>
                  </div>
                </div>

                {/* English Option */}
                <div
                  onClick={() => setSelectedLang('en')}
                  className={`box-border flex flex-col justify-between items-center p-[14px_12px] w-[180px] h-[200px] rounded-[16px] cursor-pointer transition-all ${
                    selectedLang === 'en'
                      ? 'bg-[rgba(229,145,127,0.2)] border border-[#F15A22]'
                      : 'bg-white border border-[#EDEDED] shadow-[0px_0px_4px_rgba(0,0,0,0.15)]'
                  }`}
                >
                  <div className="flex flex-col items-center w-full">
                    <div className="flex justify-end w-full mb-1">
                      <div className={`w-[18px] h-[18px] rounded-full flex items-center justify-center ${selectedLang === 'en' ? 'bg-[#F15A22]' : 'border border-gray-300 bg-white'}`}>
                        {selectedLang === 'en' && <CheckIcon className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="relative w-[96px] h-[66px] my-1">
                      <Image src="/images/eng_flag.png" alt={t?.alt?.englishFlag || "English flag"} fill className="object-contain" />
                    </div>
                    <span className="mt-2 font-medium text-[16px] leading-[20px] text-[#2D2D2D]">
                      English
                    </span>
                  </div>
                </div>
              </div>

              <div className="font-normal text-[13px] leading-[16px] text-[#999999]">
                {t?.footerNote || "Selection will apply instantly."}
              </div>

              <button
                onClick={() => {
                  setIsTimezoneModalOpen(true);
                }}
                className="flex flex-row justify-center items-center px-[10px] gap-[10px] w-[476px] h-[46px] text-[#F15A22] rounded-[10px] font-medium text-[16px] hover:text-[#d94e1d] transition-colors cursor-pointer"
              >
                {t?.next || "Next →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isTimezoneModalOpen && (
        <TimezoneModal
          isOpen={true}
          onClose={() => {
            setIsTimezoneModalOpen(false);
            if (onClose) onClose();
          }}
          onContinue={(zone) => {
            console.log('Selected Timezone:', zone, 'Selected Lang:', selectedLang);
            setIsTimezoneModalOpen(false);
            setIsWelcomeModalOpen(true);
          }}
        />
      )}

      {isWelcomeModalOpen && (
        <WelcomeModal
          isOpen={true}
          onClose={() => {
            setIsWelcomeModalOpen(false);
            if (onClose) onClose();
          }}
          onContinueLearning={() => {
            setIsWelcomeModalOpen(false);
            if (onClose) onClose();
          }}
          onViewCalendar={() => {
            setIsWelcomeModalOpen(false);
            if (onClose) onClose();
          }}
        />
      )}
    </>
  );
}