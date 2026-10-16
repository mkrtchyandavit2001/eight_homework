import EventAccess from "@/components/EventAccess/EventAccess";
import EventCategories from "@/components/EventCategories/EventCategories";
import EventsHero from "@/components/EventsHero/EventsHero";
import FeaturedEvent from "@/components/Featuredevent/Featuredevent";
import PastEvents from "@/components/Pastevents/Pastevents";
import WhyJoin from "@/components/WhyJoin/WhyJoin";
import type { Locale } from "@/context/LanguageContext";
import { getDictionarySync } from "@/lib/dictionary";
import type { EventsContent } from "@/types/types";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const events: EventsContent = getDictionarySync(locale).events;

  return (
    <>
      <main className="mt-15">
          <EventsHero content={events.hero} />
          <FeaturedEvent content={events.featured} />
          <EventCategories content={events.categories} />
          <WhyJoin content={events.whyJoin} />
          <EventAccess content={events.access} />
          <PastEvents content={events.past} />
      </main>
    </>
  );
}
