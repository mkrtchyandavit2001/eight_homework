"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { PROFILE_STATS } from "@/data/dashboardProfile";
import { intlLocaleOf } from "@/lib/calendar";
import { fillTemplate } from "@/lib/homework";
import { DashCalendarIcon, DashPackageIcon } from "../icons/Icons";

export default function ProfileHeader() {
  const { dict, locale } = useLanguage();
  const { user } = useAuth(); // <-- Ստանում ենք իրական user-ին AuthContext-ից
  const t = dict.dashboard.profile;

  // Օգտատիրոջ դինամիկ անունը կամ ֆոլբեքը
  const displayName = user?.name || dict.dashboard.user.name || "User";

  // Օրինակելի memberSince (եթե user-ը չունի ստեղծման ամսաթիվ, վերցնում ենք ընթացիկ տարին կամ ֆոլբեք)
  const memberDate = new Date(); 
  const memberSince = new Intl.DateTimeFormat(intlLocaleOf(locale), {
    month: "short",
    year: "numeric",
  }).format(memberDate);

  const stats = [
    { label: t.stats.lessonsDone, value: String(PROFILE_STATS.lessonsDone) },
    { label: t.stats.levelProgress, value: `${PROFILE_STATS.levelProgress}%` },
    { label: t.stats.homeworkRate, value: `${PROFILE_STATS.homeworkRate}%` },
    { label: t.stats.certificates, value: String(PROFILE_STATS.certificates) },
  ];

  return (
    <section className="flex flex-col rounded-2xl bg-white px-[30px] py-5 border border-solid border-[#EDEDED]">
      <div className="flex flex-col gap-1.5 pl-2.5">
        <h2 className="text-[22px] font-semibold leading-[33px] text-[#2D2D2D]">
          {displayName}
        </h2>

        <div className="flex flex-wrap items-center gap-x-[30px] gap-y-1 text-sm leading-[21px] text-[#999]">
          <span className="flex items-center gap-1.5">
            <DashPackageIcon size={12} />
            {fillTemplate(t.plan, { n: 10 })} {/* Կարող եք փոխարինել բեքենդի պլանի տվյալներով */}
          </span>
          <span className="flex items-center gap-1.5">
            <DashCalendarIcon size={12} />
            {fillTemplate(t.memberSince, { date: memberSince })}
          </span>
          <span>{user?.email ? user.email : (t.country || "Armenia")}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-4">
        {stats.map(({ label, value }) => (
          <div key={label} className="flex flex-col rounded-2xl bg-[#F7F7F7] py-[22px] text-center">
            <span className="text-xl font-semibold leading-[30px] text-[#F15A22]">{value}</span>
            <span className="text-[11px] font-semibold leading-4 text-[#999]">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}