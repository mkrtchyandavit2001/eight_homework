import Container from "@/components/Container";
import { Hero } from "@/components/Hero/Hero";
import { OurStory } from "@/components/OurStory/OurStory";
import { Statistics } from "@/components/Statistics/Statistics";
import { Teachers } from "@/components/Teachers/Teachers";
import { TeachingMethod } from "@/components/TeachingMethod/TeachingMethod";
import { Testimonials } from "@/components/Testimonials/Testimonials";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col mt-15 overflow-hidden">
      {/* Ստանդարտ բաժիններ (Hero և OurStory) Container-ի ներսում */}
      <div className="space-y-12 py-6">
        <Container>
          <Hero />
          <OurStory />
        </Container>
      </div>

      {/* ՕՐԻՆԱԿ՝ Ամբողջ լայնությամբ (full-width) բաժին ֆոնային գույնով */}
      <section className=" py-6 my-6">
        <Container>
          <TeachingMethod />
        </Container>
      </section>

      {/* Մնացած բաժինները */}
      <div className="py-6 bg-[#f7f7f7]">
        <Container>
          <Statistics />
        </Container>
      </div>

      {/* Եթե ցանկանում եք, որ Teachers-ն էլ լինի ամբողջ լայնությամբ ֆոնով */}
      <section className="w-full py-12 my-6">
        <Container>
          <Teachers />
        </Container>
      </section>

      <div className="py-6 mb-12">
        <Container>
          <Testimonials />
        </Container>
      </div>
    </main>
  );
}
