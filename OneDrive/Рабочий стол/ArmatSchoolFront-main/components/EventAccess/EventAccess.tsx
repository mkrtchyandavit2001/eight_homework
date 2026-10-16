import type { EventsContent } from "@/types/types";
import Container from "../Container";

export default function EventAccess({
  content,
}: {
  content: EventsContent["access"];
}) {
  return (
    <section className="bg-[#F4F4F4] py-10">
      <Container>
        <div className=" max-lg:px-5">
          <h2 className="text-[26px] leading-[39px] tracking-[-0.65px] text-black">
            {content.title}
          </h2>
          <div className="flex gap-5 py-5 max-md:flex-col">
            {content.items.map((item, i) => (
              <article
                key={item.badge}
                className="flex flex-1 flex-col rounded-xl border border-[#EDEDED] bg-white p-6"
              >
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#F15A22]" />
                  <span
                    className={`text-xs leading-[18px] tracking-[0.6px] text-[#F15A22] uppercase ${
                      i === 0 ? "font-semibold" : ""
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className="pt-3 text-base leading-6 text-black">
                  {item.title}
                </h3>
                <p className="pt-1.5 text-sm leading-[23px] text-[#666]">
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
