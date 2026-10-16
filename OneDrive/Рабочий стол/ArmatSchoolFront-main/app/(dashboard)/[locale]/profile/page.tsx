import { redirect } from "next/navigation";

export default async function ProfileIndexPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const resolvedParams = await params;
  
  // Եթե լեզուն բացակայում է կամ սխալմամբ "undefined" է, սահմանում ենք "en" կամ "hy"
  const locale = 
    resolvedParams?.locale && resolvedParams.locale !== "undefined"
      ? resolvedParams.locale
      : "en";

  redirect(`/${locale}/profile/lessons`);
}