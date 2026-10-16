"use client";

import { useLanguage } from "@/context/LanguageContext";
import Container from "../Container";


export default function StoriesHeader() {
  const { dict } = useLanguage();
  const t = dict.blog;
  return (
    <div className="flex flex-col items-start mt-16">
      <Container>
        <h1 className="text-[52px] leading-[78px]  tracking-[-1.82px] font-medium text-[#2D2D2D]">
          {t.pageTitle}
        </h1>
      </Container>
    </div>
  );
}
