"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import Container from "@/components/Container";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import LegalContent, { LegalSection } from "@/components/LegalContent/LegalContent";

export default function PrivacyPolicyPage() {
  const { dict } = useLanguage();
  const policy = dict.privacyPolicy as {
    title: string;
    lastUpdated: string;
    sections: LegalSection[];
  };

  return (
    <>
      <NavBar />
      <main className="w-full">
        <Container className="py-16">
          <LegalContent
            title={policy.title}
            lastUpdated={policy.lastUpdated}
            sections={policy.sections}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}