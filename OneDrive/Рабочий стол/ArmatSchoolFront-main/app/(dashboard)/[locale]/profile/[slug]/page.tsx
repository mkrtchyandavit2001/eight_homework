import { notFound } from "next/navigation";
import { PROFILE_SECTIONS, type ProfileSlug } from "@/types/dashboard";
import LessonsView from "@/components/LessonsView/LessonsView";
import CalendarView from "@/components/CalendarView/CalendarView";
import HomeworkView from "@/components/HomeworkView/HomeworkView";
import MaterialsView from "@/components/MaterialsView/MaterialsView";
import MessagesView from "@/components/MessagesView/MessagesView";
import CoursesView from "@/components/CoursesView/CoursesView";
import ProfileView from "@/components/ProfileView/ProfileView";
import SettingsView from "@/components/SettingsView/SettingsView";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const locales = ["en", "hy"];
  const params: { locale: string; slug: string }[] = [];

  locales.forEach((locale) => {
    PROFILE_SECTIONS.forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export default async function ProfileSectionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { locale, slug } = resolvedParams;

  // Եթե լեզուն "undefined" է կամ բացակայում է, կարող ենք կանխարգելել կամ թույլ տալ, 
  // բայց գլխավոր խնդիրը վերին մակարդակի redirect-ն է:
  if (!slug || !PROFILE_SECTIONS.includes(slug as ProfileSlug)) {
    notFound();
  }

  switch (slug as ProfileSlug) {
    case "lessons":
      return <LessonsView />;
    case "calendar":
      return <CalendarView />;
    case "homework":
      return <HomeworkView />;
    case "materials":
      return <MaterialsView />;
    case "messages":
      return <MessagesView />;
    case "courses":
      return <CoursesView />;
    case "profile":
      return <ProfileView />;
    case "settings":
      return <SettingsView />;
    default:
      return <div className="p-8 text-[13px] text-[#666]">{slug}</div>;
  }
}