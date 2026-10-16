import type { EventsContent } from "@/types/types";
import Container from "../Container";

export default function WhyJoin({
  content,
}: {
  content: EventsContent["whyJoin"];
}) {
  return (
    <section className="py-10 bg-white">
      <Container>
        <div className="mx-auto">
          <div className="pb-5">
            <span className="text-[11px] leading-4 tracking-[1.65px] text-[#F15A22] uppercase">
              {content.eyebrow}
            </span>
            <h2 className="text-4xl leading-[45px] font-medium tracking-[-0.9px] text-black max-md:text-3xl">
              {content.title}
            </h2>
            <p className="max-w-[520px] pt-4 text-base leading-[26px] text-[#666]">
              {content.description}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-5 pt-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {content.items.map((item) => (
              <article
                key={item.title}
                className="flex flex-col rounded-xl bg-[#F7F7F7] p-5"
              >
                <span className="h-0.5 w-6 rounded-full bg-[#F15A22]" />
                <h3 className="pt-3 text-[15px] leading-[22px] text-black">
                  {item.title}
                </h3>
                <p className="pt-1.5 text-[13px] leading-[21px] text-[#666]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
