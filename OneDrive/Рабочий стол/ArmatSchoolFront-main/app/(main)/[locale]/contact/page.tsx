import ContactForm from "@/components/ContactForm/ContactForm";
import ContactHero from "@/components/ContactHero/ContactHero";
import ContactInfo from "@/components/ContactInfo/ContactInfo";
import Container from "@/components/Container";

export default function ContactPage() {
  return (
    <main>
      <Container>
        <section className="bg-surface mt-20 py-10">
          <div className="mx-auto w-full">
            <ContactHero />
          </div>
        </section>

        <section className="mx-auto bg-white w-full  py-10">
          <div className="mx-auto grid items-start  gap-5 lg:grid-cols-2">
            <ContactForm />
            <ContactInfo />
          </div>
        </section>
      </Container>
    </main>
  );
}
