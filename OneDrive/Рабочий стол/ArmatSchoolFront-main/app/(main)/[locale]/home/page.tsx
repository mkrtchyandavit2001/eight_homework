import type { Metadata } from "next";

import CertifiedTeachersSection from "@/components/CertifiedTeachersSection/CertifiedTeachersSection";
import Container from "@/components/Container";
import Courses from "@/components/Courses/Courses";
import FaqSection from "@/components/FaqSection/FaqSection";
import HowItWorks from "@/components/Howitworks/Howitworks";
import StatsSection from "@/components/Statssection/Statssection";
import TestimonialsSection from "@/components/TestimonialsSection/TestimonialsSection";
import WhyArmat from "@/components/WhyArmat/WhyArmat";
import HomeBannerSlider from "@/components/HomeBannerSlider/HomeBannerSlider";

export const metadata: Metadata = {
  title: "Արմատ | Առցանց կրթություն և դասընթացներ երեխաների համար",
  description:
    "Արմատը առցանց կրթական հարթակ է, որտեղ երեխաները կարող են սովորել ծրագրավորում, տեխնոլոգիաներ և այլ ժամանակակից հմտություններ՝ փորձառու ուսուցիչների օգնությամբ։",

  keywords: [
    "Արմատ",
    "առցանց դասընթացներ",
    "օնլայն դասընթացներ երեխաների համար",
    "ծրագրավորման դասընթացներ",
    "ծրագրավորում երեխաների համար",
    "HTML CSS JavaScript",
    "ծրագրավորում երեխաների համար Հայաստանում",
    "առցանց կրթություն Հայաստանում",
    "կրթական հարթակ",
  ],

  authors: [
    {
      name: "Armat",
    },
  ],

  creator: "Armat",
  publisher: "Armat",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://your-domain.am",
  },

  openGraph: {
    type: "website",
    locale: "hy_AM",
    url: "https://your-domain.am",
    siteName: "Armat",
    title: "Արմատ | Առցանց կրթություն և դասընթացներ երեխաների համար",
    description:
      "Սովորիր ժամանակակից հմտություններ փորձառու ուսուցիչների հետ։ Առցանց դասընթացներ երեխաների և դեռահասների համար։",
    images: [
      {
        url: "https://your-domain.am/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Armat առցանց կրթական հարթակ",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Արմատ | Առցանց կրթություն և դասընթացներ",
    description:
      "Առցանց դասընթացներ երեխաների և դեռահասների համար՝ փորձառու ուսուցիչների հետ։",
    images: ["https://your-domain.am/twitter-image.jpg"],
  },

  category: "education",
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Ստանդարտ բաժին՝ Container-ի ներսում */}
        <section aria-labelledby="hero-title" className="py-6">
          <HomeBannerSlider />
        </section>

      {/* ՕՐԻՆԱԿ՝ Ամբողջ լայնությամբ (full-width) բաժին ֆոնային գույնով */}
      <section aria-labelledby="why-armat-title" className="w-full bg-[#f7f7f7] py-12">
        <Container>
          <WhyArmat />
        </Container>
      </section>

      {/* Մնացած բաժինները, որոնք կարող են լինել Container-ի ներսում կամ առանձին */}
      <Container>
        <section aria-labelledby="stats-title" className="py-8">
          <StatsSection />
        </section>

        <section aria-labelledby="how-it-works-title" className="py-8">
          <HowItWorks />
        </section>

        <section aria-labelledby="courses-title" className="py-8">
          <Courses />
        </section>
      </Container>

      {/* Եթե ցանկանում եք, որ, օրինակ, ուսուցիչների կամ մյուս բաժիններն էլ լինեն ամբողջ լայնությամբ ֆոնով */}
      <section aria-labelledby="teachers-title" className="w-full bg-[#f7f7f7] py-12">
        <Container>
          <CertifiedTeachersSection />
        </Container>
      </section>

      <Container>
        <section aria-labelledby="testimonials-title" className="py-8">
          <TestimonialsSection />
        </section>
      </Container>

      <section aria-labelledby="faq-title" className="w-full py-12">
        <Container>
          <FaqSection />
        </Container>
      </section>
    </main>
  );
}