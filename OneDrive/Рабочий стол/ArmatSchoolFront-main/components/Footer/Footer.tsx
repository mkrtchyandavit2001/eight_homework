"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/Container";
import { FacebookLineIcon, InstagramLineIcon, YoutubeIcon } from "../icons/Icons";

export default function Footer() {
  const { locale, dict, setLocale } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!email) return;

    // setStatus('loading');

    // try {
    //   const response = await fetch('/api/newsletter', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       email,
    //       locale,
    //       subscribedAt: new Date().toISOString(),
    //       source: 'footer'
    //     }),
    //   });

    //   if (!response.ok) throw new Error('Failed to subscribe');

    //   setStatus('success');
    //   alert(locale === 'hy' ? 'Հաջողությամբ բաժանորդագրվեցիք!' : 'Successfully subscribed!');
    //   setEmail("");
    // } catch (error) {
    //   console.error('Subscription error:', error);
    //   setStatus('error');
    // } finally {
    //   setStatus('idle');
    // }
  };

  const path = (p: string) => `/${locale}${p === "/" ? "" : p}`;

  const linkClass =
    "text-[14px] font-medium leading-[21px] text-[#666666] hover:text-[#F15A22]";
  const headingClass =
    "text-[12px] font-semibold leading-[18px] tracking-[1.2px] text-[#2D2D2D] uppercase";
  const legalLinkClass =
    "text-[13px] font-medium leading-[20px] text-[#999999] hover:text-[#666666]";
  const socialClass =
    "flex h-[36px] w-[36px] items-center justify-center rounded-full text-[#999999] transition-colors hover:text-[#F15A22]";

  return (
    <footer className="w-full border-t border-[#EDEDED] bg-white pb-[32px] pt-[40px] font-['Plus_Jakarta_Sans'] md:pt-[56px] lg:pb-[40px] lg:pt-[64px]">
      <Container>
        {/* Top grid: 1 col (mobile) → 2 cols (tablet) → 3 cols (desktop) */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-[minmax(0,320px)_1fr_250px] lg:items-start lg:gap-x-12">
          {/* Column 1: Brand, Description & Socials */}
          <div className="flex w-full max-w-[320px] flex-col gap-[24px] md:col-span-2 lg:col-span-1 lg:justify-between">
            <div className="flex flex-col items-start">
              {/* Logo */}
              <div className="relative h-[44px] w-[260px] sm:h-[51px] sm:w-[316px]">
                <Image
                  src="/images/Black_text+Orange_hat.png"
                  alt="Armat School - Premium Armenian language learning for children and families across the globe"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Description */}
              <p className="max-w-[280px] pt-[20px] text-[14px] font-normal leading-[23px] text-[#666666]">
                {dict.footer?.description ||
                  "Premium Armenian language learning for children and families across the globe."}
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-[12px] pt-[24px]">
                <Link
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={socialClass}
                >
                  <InstagramLineIcon className="h-[18px] w-[18px]" />
                </Link>

                <Link
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={socialClass}
                >
                  <FacebookLineIcon className="h-[18px] w-[18px]" />
                </Link>

                <Link
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className={socialClass}
                >
                  <YoutubeIcon className="h-[20px] w-[20px]" />
                </Link>
              </div>
            </div>

            {/* Email & Phone */}
            <div className="flex w-full flex-wrap items-start gap-x-8 gap-y-4">
              <div className="flex flex-col">
                <span className="text-[11px] font-medium uppercase leading-[18px] tracking-[0.6px] text-[#AAAAAA]">
                  {dict.footer?.email || "Email"}
                </span>
                <Link
                  href="mailto:hello@armat.academy"
                  className="break-all text-[14px] font-medium leading-[24px] text-[#666666] hover:text-[#F15A22]"
                >
                  hello@armat.academy
                </Link>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-medium uppercase leading-[18px] tracking-[0.6px] text-[#AAAAAA]">
                  {dict.footer?.phone || "Phone"}
                </span>
                <a
                  href="tel:+37411123456"
                  className="whitespace-nowrap text-[14px] font-medium leading-[24px] text-[#666666] hover:text-[#F15A22]"
                >
                  +374 11 123 456
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links & Resources
              lg:pt-[71px] = logo height (51px) + description top padding (20px),
              so the headings line up with the description text */}
          <div className="grid ml-45 grid-cols-2 gap-x-6 gap-y-8 md:col-span-1 lg:col-span-1 lg:gap-x-10 lg:pt-[72px]">
            {/* Quick Links */}
            <div className="flex flex-col">
              <h4 className={headingClass}>
                {dict.footer?.quickLinks?.title || "Quick Links"}
              </h4>
              <ul className="flex flex-col gap-[12px] pt-[20px]">
                <li>
                  <Link href={path("/home")} className={`${linkClass} capitalize`}>
                    {dict.footer?.quickLinks?.home || "Home"}
                  </Link>
                </li>
                <li>
                  <Link href={path("/courses")} className={`${linkClass} capitalize`}>
                    {dict.footer?.quickLinks?.courses || "Courses"}
                  </Link>
                </li>
                <li>
                  <Link href={path("/about")} className={`${linkClass} capitalize`}>
                    {dict.footer?.quickLinks?.about || "About"}
                  </Link>
                </li>
                <li>
                  <Link href={path("/reviews")} className={`${linkClass} capitalize`}>
                    {dict.footer?.quickLinks?.reviews || "Reviews"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col ">
              <h4 className={headingClass}>
                {dict.footer?.resources?.title || "Resources"}
              </h4>
              <ul className="flex flex-col gap-[12px] pt-[20px]">
                <li>
                  <Link href={path("/blog")} className={linkClass}>
                    {dict.footer?.resources?.blog || "Blog"}
                  </Link>
                </li>
                <li>
                  <Link href={path("/free-trial")} className={linkClass}>
                    {dict.footer?.resources?.freeTrial || "Free Trial"}
                  </Link>
                </li>
                <li>
                  <Link href={path("/contact")} className={linkClass}>
                    {dict.footer?.resources?.contact || "Contact Us"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter & Legal */}
          <div className="flex w-full flex-col md:col-span-1 lg:col-span-1 lg:w-[250px] lg:pt-[71px]">
            <h4 className={headingClass}>
              {dict.footer?.newsletter?.title || "ՆՈՐՈՒԹՅՈՒՆՆԵՐԻ ՑՈՒՑԱԿ"}
            </h4>

            {/* Subscribe Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col gap-[16px] pt-[20px]">
              <div className="flex h-[46px] w-full items-center rounded-[11px] border border-[#EDEDED] text-[16px] bg-[#F7F7F7] px-[16px] transition-colors focus-within:border-[#F15A22]">
                <input
                  type="email"
                  placeholder={dict.footer?.newsletter?.placeholder || "Ձեր էլ. փոստի հասցեն"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-[15px] font-normal text-[#2D2D2D] outline-none placeholder-[#999999]"
                  required
                  disabled={status === "loading"}
                  aria-label="Email address for newsletter"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex h-[44px] w-full cursor-pointer items-center justify-center rounded-[11px] border border-[#F15A22] bg-white px-4 text-[14px] font-medium text-[#F15A22] shadow-sm transition-all hover:bg-[#F15A22] hover:text-white disabled:opacity-50 sm:w-[170px]"
              >
                {status === "loading"
                  ? "..."
                  : dict.footer?.newsletter?.subscribe || "Բաժանորդագրվել"}
              </button>
            </form>

            {/* Legal Links */}
            <div className="pt-[32px]">
              <h4 className={headingClass}>
                {dict.footer?.legal?.title || "Legal"}
              </h4>
              <ul className="flex flex-col gap-[8px] pt-[12px]">
                <li>
                  <Link href={path("/privacy-policy")} className={legalLinkClass}>
                    {dict.footer?.legal?.privacyPolicy || "Privacy Policy"}
                  </Link>
                </li>
                <li>
                  <Link href={path("/terms")} className={legalLinkClass}>
                    {dict.footer?.legal?.terms || "Terms & Conditions"}
                  </Link>
                </li>
                <li>
                  <Link href={path("/refund-policy")} className={legalLinkClass}>
                    {dict.footer?.legal?.refundPolicy || "Refund Policy"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright & Language Switcher */}
        <div className="mt-[32px] flex w-full flex-col-reverse items-center gap-4 border-t border-[#EDEDED] pt-[24px] text-center sm:flex-row sm:justify-between sm:text-left lg:mt-[30px] lg:pt-[28px]">
          <p className="text-[13px] font-normal leading-[20px] text-[#999999]">
            {dict.footer?.copyright || "© 2026 Armat School. All rights reserved. | Designed & Developed by Webex Technologies"}
          </p>

          {/* Language Switcher */}
          <div className="flex items-center gap-[4px]">
            <button
              onClick={() => setLocale("en")}
              className={`text-[12px] font-medium leading-[24px] ${
                locale === "en" ? "text-[#F15A22]" : "text-[#999999]"
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <span className="px-[4px] text-[13px] font-semibold text-[#DDDDDD]">|</span>
            <button
              onClick={() => setLocale("hy")}
              className={`text-[13px] font-medium leading-[24px] ${
                locale === "hy" ? "text-[#F15A22]" : "text-[#999999]"
              }`}
              aria-label="Switch language to Armenian"
            >
              AM
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}