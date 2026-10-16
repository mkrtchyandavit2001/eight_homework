import type { EventsContent } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container";

const PAST_EVENT_IMAGES: Record<string, string> = {
  "game-hour": "/images/game-hour.jpg",
  "culture-day": "/images/past-culture.jpg",
  "speaking-club": "/images/past-speaking.jpg",
  "kids-workshop": "/images/past-kids.jpg",
  "community-meetup": "/images/past-community.jpg",
};

type PastItem = EventsContent["past"]["items"][number] & {
  href?: string;
  slug?: string;
};

export default function PastEvents({
  content,
}: {
  content: EventsContent["past"];
}) {
  return (
    <section className="py-10 max-md:px-5 bg-white">
      <Container>
        <div className="mx-auto">
          <h2 className="text-4xl leading-[54px] font-medium tracking-[-0.9px] text-black max-md:text-3xl">
            {content.title}
          </h2>
          <p className="pt-3 text-base leading-6 text-[#666]">
            {content.description}
          </p>

          <div className="grid grid-cols-3 grid-rows-[192px_192px] gap-4 pt-10 max-md:grid-cols-1 max-md:grid-rows-none max-md:auto-rows-[192px]">
            {(content.items as PastItem[]).map((item, i) => {
              const href = item.href ?? `/events/${item.slug ?? item.id}`;

              return (
                <Link
                  key={item.id}
                  href={href}
                  aria-label={item.title}
                  className={`group relative block overflow-hidden rounded-2xl bg-[#EDEDED] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                    i === 0 ? "row-span-2 max-md:row-span-1" : ""
                  }`}
                >
                  <figure className="absolute inset-0">
                    <Image
                      src={PAST_EVENT_IMAGES[item.id]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block text-[10px] leading-[15px] font-semibold tracking-[1px] text-white uppercase">
                        {item.category}
                      </span>
                      <span className="block pt-1 text-[15px] leading-[19px] text-white">
                        {item.title}
                      </span>
                    </figcaption>
                  </figure>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}