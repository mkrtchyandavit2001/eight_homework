'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';

export interface CheckoutProduct {
  badge: string;
  title: string;
  meta: string;
  price: number;
  image: string;
  description: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: (email: string) => void;
  product?: CheckoutProduct;
}

const DEFAULT_PRODUCT: CheckoutProduct = {
  badge: 'Premium',
  title: 'Armenian Writing Practice Workbook',
  meta: 'Writing · PDF · 52 Pages',
  price: 8,
  image: '/images/workbook.jpg',
  description:
    'Guided handwriting drills, joined-letter practice, and exercises that help you build confident Armenian writing skills.',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CheckoutModal({
  isOpen,
  onClose,
  onContinue,
  product = DEFAULT_PRODUCT,
}: CheckoutModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const price = `$${product.price}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    onContinue?.(value);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-black/40 p-4 font-jakarta lg:items-center lg:px-20 lg:py-[10px]"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Checkout"
        className="relative flex w-full max-w-[1120px] flex-col items-center justify-center gap-5 rounded-[22px] bg-white px-6 pb-6 pt-14 lg:flex-row lg:gap-9 lg:px-20 lg:py-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#999] transition-colors hover:bg-[#F7F7F7] hover:text-[#2D2D2D]"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Product card */}
        <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-[22px] border border-[#EDEDED] bg-white px-6 py-[30px] lg:min-h-[404px]">
          <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="relative h-[121px] w-[121px] flex-none overflow-hidden rounded-md bg-[#F7F7F7]">
              <Image src={product.image} alt={product.title} fill sizes="121px" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
              <span className="text-[10px] font-semibold uppercase leading-[15px] tracking-[0.6px] text-primary">
                {product.badge}
              </span>
              <h3 className="text-[17px] font-semibold leading-[26px] text-[#2D2D2D]">{product.title}</h3>
              <p className="text-[13px] leading-5 text-[#999]">{product.meta}</p>
              <span className="text-xl font-semibold leading-[30px] text-[#2D2D2D]">{price}</span>
            </div>
          </div>
          <p className="w-full rounded-lg border border-[#EDEDED] p-5 text-[13px] leading-[21px] text-[#666]">
            {product.description}
          </p>
        </div>

        {/* Order summary */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full min-w-0 flex-1 flex-col items-center gap-4 rounded-[22px] border border-[#EDEDED] bg-white p-6 lg:min-h-[404px]"
        >
          <h4 className="self-stretch text-[15px] font-semibold leading-[22px] text-[#2D2D2D]">Order Summary</h4>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            autoComplete="email"
            className={`h-[52px] self-stretch rounded-lg border bg-[#F7F7F7] p-4 text-sm leading-[18px] text-[#2D2D2D] outline-none transition-colors placeholder:text-[#2D2D2D]/50 focus:border-primary ${
              error ? 'border-[#D93025]' : 'border-[#EDEDED]'
            }`}
          />
          {error && <p className="-mt-2 self-stretch text-xs leading-[18px] text-[#D93025]">{error}</p>}

          <div className="flex flex-col gap-3 self-stretch pt-4 text-sm leading-[21px] text-[#666]">
            <div className="flex justify-between">
              <span>{product.title}</span>
              <span className="font-medium text-[#2D2D2D]">{price}</span>
            </div>
            <div className="flex justify-between">
              <span>One-time payment</span>
              <span className="font-medium text-[#2D2D2D]">—</span>
            </div>
          </div>

          <div className="self-stretch pt-[10px]">
            <div className="flex items-center justify-between border-t border-[#EDEDED] py-2">
              <span className="text-sm font-semibold leading-[21px] text-[#2D2D2D]">Total</span>
              <span className="text-xl font-semibold leading-[30px] text-[#2D2D2D]">{price}</span>
            </div>
          </div>

          <button
            type="submit"
            className="flex h-[42px] w-full max-w-[310px] items-center justify-center gap-2 rounded-lg border border-primary text-sm font-semibold leading-[21px] text-primary transition-colors hover:bg-primary text-orange-500"
          >
            Continue to Payment
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.6 7h8.8M7.4 3.3L11.4 7l-4 3.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center justify-center gap-1.5 pt-3 text-xs leading-[18px] text-[#999]">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="2.6" y="6.1" width="8.8" height="6.1" rx="1" stroke="#999" strokeWidth="1.3" />
              <path d="M4.4 6.1V4.4a2.6 2.6 0 015.2 0v1.7" stroke="#999" strokeWidth="1.3" />
            </svg>
            <span>Secure one-time payment</span>
          </div>
        </form>
      </div>
    </div>
  );
}