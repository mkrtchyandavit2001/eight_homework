"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { ProfileTab } from "@/types/dashboard";
import DashTopbar from "../DashTopbar/DashTopbar";
import ProfileHeader from "../ProfileHeader/ProfileHeader";
import ProfileTabs from "../ProfileTabs/ProfileTabs";
import LearningTab from "../LearningTab/LearningTab";
import CertificatesTab from "../CertificatesTab/CertificatesTab";
import PaymentsTab from "../PaymentsTab/PaymentsTab";
import FavoritesTab from "../FavoritesTab/FavoritesTab";


export default function ProfileView() {
  const { dict } = useLanguage();
  const t = dict.dashboard.profile;
  const [tab, setTab] = useState<ProfileTab>("learning");

  return (
    <div className="flex min-w-0 flex-1 flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      <DashTopbar title={t.title} />

      <div className="flex flex-col gap-4 p-5 pb-20">
        <ProfileHeader />
        <ProfileTabs active={tab} onChange={setTab} />

        {tab === "learning" && <LearningTab />}
        {tab === "certificates" && <CertificatesTab />}
        {tab === "payments" && <PaymentsTab />}
        {tab === "favorites" && <FavoritesTab />}
      </div>
    </div>
  );
}