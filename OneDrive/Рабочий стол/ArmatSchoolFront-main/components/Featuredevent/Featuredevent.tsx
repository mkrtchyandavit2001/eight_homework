"use client";

import { useState } from "react";
import type { EventsContent } from "@/types/types";
import Image from "next/image";
import Container from "../Container";
import type { CheckoutProduct } from "../Checkoutmodal/Checkoutmodal";
import CheckoutModal from "../Checkoutmodal/Checkoutmodal";
import { CheckIcon } from "../icons/Icons";

const FEATURED_IMAGE = "/images/game-hour.jpg";
const EVENT_PRICE = 8; // guest access price (USD)

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px] leading-4 tracking-[0.55px] text-[#999] uppercase">
        {label}
      </span>
      <span className="pt-0.5 text-sm leading-[21px] text-[#2D2D2D]">
        {value}
      </span>
    </div>
  );
}

export default function FeaturedEvent({
  content,
}: {
  content: EventsContent["featured"];
}) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const product: CheckoutProduct = {
    badge: content.category,
    title: content.title,
    meta: `${content.format} · ${content.duration}`,
    price: EVENT_PRICE,
    image: FEATURED_IMAGE,
    description: content.description,
  };

  const handleContinue = (email: string) => {
    // TODO: redirect to payment / call your checkout API
    console.log("Checkout email:", email);
  };

  return (
    <section className="pb-10 max-lg:px-5 bg-white">
      <Container>
        <div className="flex overflow-hidden rounded-[22px] border border-[#EDEDED] max-lg:flex-col">
          <div className="relative min-h-[260px] w-[45vw] shrink-0 max-lg:w-full">
            <Image
              src={FEATURED_IMAGE}
              alt={content.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 441px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          <div className="flex flex-1 flex-col gap-6 px-7 py-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] leading-4 tracking-[1.1px] text-[#F15A22] uppercase">
                  {content.category}
                </span>
                <span className="size-1 rounded-full bg-[#EDEDED]" />
                <span className="text-[11px] leading-4 tracking-[0.55px] text-[#999] uppercase">
                  {content.format}
                </span>
              </div>
              <h2 className="pt-3 text-[26px] leading-8 font-medium text-black">
                {content.title}
              </h2>
              <p className="pt-3 text-[15px] leading-6 text-[#666]">
                {content.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-x-[16px] gap-y-3">
              <div className="w-[139px]">
                <Meta label={content.dateLabel} value={content.date} />
              </div>
              <div className="w-[139px]">
                <Meta label={content.timeLabel} value={content.time} />
              </div>
              <div className="w-[139px]">
                <Meta label={content.durationLabel} value={content.duration} />
              </div>
              <div className="w-[139px]">
                <Meta label={content.spotsLabel} value={content.spots} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3 rounded-xl bg-[#F7F7F7] p-3.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#F15A22]/5">
              <CheckIcon/>
                </span>
                <div>
                  <p className="text-[13px] leading-5 text-[#2D2D2D]">
                    {content.perkTitle}
                  </p>
                  <p className="text-xs leading-[18px] text-[#666]">
                    {content.perkText}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline justify-between flex-col gap-4 px-1 max-sm:flex-col max-sm:items-start">
                <span className="text-xs leading-[18px] text-[#999]">
                  {content.guestInfo}
                </span>
                <button
                  type="button"
                  onClick={() => setIsCheckoutOpen(true)}
                  className="flex h-11 w-[298px] cursor-pointer items-center justify-center rounded-lg border border-[#F15A22] text-sm text-[#F15A22] transition-colors hover:bg-[#F15A22] hover:text-white max-sm:w-full"
                >
                  {content.buyLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onContinue={handleContinue}
        product={product}
      />
    </section>
  );
}