import Container from "@/components/kago-ui/Container";
import Section from "@/components/kago-ui/section";
import { getDictionary } from "@/dictionaries/getDictionary";
import { generateMetadata as generateSEOMetadata } from "@/utils/generateMetadata";

interface LegalNoticeProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return generateSEOMetadata({ lang: lang as "fr" | "en", page: "legal" });
}

export default async function LegalNoticePage({ params }: LegalNoticeProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "fr" | "en");

  return (
    <Section color="white">
      <Container>
        <div className="max-w-4xl mx-auto py-12">
          <h1 className="text-4xl font-bold text-[#0F2137] mb-8">
            {dictionary.legal.title}
          </h1>

          <div className="space-y-8 text-[#02073E]">
            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.legal.company.title}
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>{dictionary.legal.company.name}:</strong> MY COMPTA
                </p>
                <p>
                  <strong>{dictionary.legal.company.legalForm}:</strong>{" "}
                  {dictionary.legal.company.legalFormValue}
                </p>
                <p>
                  <strong>{dictionary.legal.company.bce}:</strong> 0746.708.869
                </p>
                <p>
                  <strong>{dictionary.legal.company.vat}:</strong> BE0746708869
                </p>
                <p>
                  <strong>{dictionary.legal.company.address}:</strong> Rue des
                  Genévriers 56, 1020 Bruxelles
                </p>
                <p>
                  <strong>{dictionary.legal.company.email}:</strong>{" "}
                  <a
                    href="mailto:info@my-compta.be"
                    className="text-[#025EAC] hover:underline"
                  >
                    info@my-compta.be
                  </a>
                </p>
                <p>
                  <strong>{dictionary.legal.company.phone}:</strong>{" "}
                  <a
                    href="tel:+3228968911"
                    className="text-[#025EAC] hover:underline"
                  >
                    +32 2 896 89 11
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.legal.management.title}
              </h2>
              <p>
                <strong>{dictionary.legal.management.manager}:</strong> Rabih
                Abou Farhat
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.legal.hosting.title}
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>{dictionary.legal.hosting.provider}:</strong> OVH
                  France
                </p>
                <p>
                  <strong>{dictionary.legal.hosting.location}:</strong>{" "}
                  {dictionary.legal.hosting.locationValue}
                </p>
                <p>
                  <strong>{dictionary.legal.hosting.deployment}:</strong> Kago
                  Group
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.legal.intellectualProperty.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.legal.intellectualProperty.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.legal.liability.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.legal.liability.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.legal.dispute.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.legal.dispute.content}{" "}
                <a
                  href="mailto:info@my-compta.be"
                  className="text-[#025EAC] hover:underline"
                >
                  info@my-compta.be
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.legal.law.title}
              </h2>
              <p className="leading-relaxed">{dictionary.legal.law.content}</p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
