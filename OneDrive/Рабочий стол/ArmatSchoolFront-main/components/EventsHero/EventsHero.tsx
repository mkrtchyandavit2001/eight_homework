import type { EventsContent } from "@/types/types";
import Container from "../Container";

export default function EventsHero({
  content,
}: {
  content: EventsContent["hero"];
}) {
  return (
    <section className="pt-5 pb-10 max-md:px-5 bg-white">
      <Container>
        <h1 className="text-[52px] leading-[57px] font-medium tracking-[-1.3px] text-black max-md:text-4xl max-md:leading-tight">
          {content.title}
        </h1>
        <p className="max-w-[576px] pt-5 text-[17px] leading-7 text-[#666]">
          {content.description}
        </p>
      </Container>
    </section>
  );
}
