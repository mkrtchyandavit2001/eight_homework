import type { EventsContent } from "@/types/types";
import Container from "../Container";

export default function EventCategories({ content }: { content: EventsContent["categories"] }) {
  return (
    <section className="bg-[#F7F7F7] py-10">
      <Container>      <div className="mx-auto">
        <h2 className="text-4xl leading-[54px] font-medium tracking-[-0.9px] text-black max-md:text-3xl">
          {content.title}
        </h2>
        <p className="pt-3 text-base leading-6 text-[#666]">{content.description}</p>

        <div className="grid grid-cols-3 gap-4 pt-10 max-lg:grid-cols-2 max-md:grid-cols-1">
          {content.items.map((item) => (
            <article
              key={item.label}
              className="flex min-h-[137px] flex-col justify-center rounded-2xl border border-[#EDEDED] bg-white p-6"
            >
              <h3 className="text-sm leading-4 font-semibold tracking-[1.32px] text-[#F15A22] uppercase">
                {item.label}
              </h3>
              <p className="pt-2 text-sm leading-[23px] text-[#666]">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
      </Container>
    </section>
  );
}