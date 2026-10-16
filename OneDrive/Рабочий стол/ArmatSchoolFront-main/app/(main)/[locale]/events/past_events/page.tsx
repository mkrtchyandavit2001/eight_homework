import Container from "@/components/Container";
import type { Locale } from "@/context/LanguageContext";

export default async function PastEventsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Container>
        <h1>Past Event</h1>
      </Container>
    </>
  );
}
