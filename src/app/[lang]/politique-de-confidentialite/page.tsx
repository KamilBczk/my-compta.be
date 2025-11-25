import Container from "@/components/kago-ui/Container";
import Section from "@/components/kago-ui/section";
import { getDictionary } from "@/dictionaries/getDictionary";
import { generateMetadata as generateSEOMetadata } from "@/utils/generateMetadata";

interface PrivacyPolicyProps {
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
  return generateSEOMetadata({ lang: lang as "fr" | "en", page: "privacy" });
}

export default async function PrivacyPolicyPage({
  params,
}: PrivacyPolicyProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "fr" | "en");

  return (
    <Section color="white">
      <Container>
        <div className="max-w-4xl mx-auto py-12">
          <h1 className="text-4xl font-bold text-[#0F2137] mb-8">
            {dictionary.privacy.title}
          </h1>

          <div className="space-y-8 text-[#02073E]">
            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.intro.title}
              </h2>
              <p className="leading-relaxed">{dictionary.privacy.intro.content}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.controller.title}
              </h2>
              <div className="space-y-2">
                <p>
                  <strong>{dictionary.privacy.controller.name}:</strong> MY COMPTA
                </p>
                <p>
                  <strong>{dictionary.privacy.controller.address}:</strong> Rue
                  des Genévriers 56, 1020 Bruxelles
                </p>
                <p>
                  <strong>{dictionary.privacy.controller.email}:</strong>{" "}
                  <a
                    href="mailto:info@my-compta.be"
                    className="text-[#025EAC] hover:underline"
                  >
                    info@my-compta.be
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.dataCollected.title}
              </h2>
              <p className="mb-4 leading-relaxed">
                {dictionary.privacy.dataCollected.intro}
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-[#0F2137] mb-2">
                    {dictionary.privacy.dataCollected.contact.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {dictionary.privacy.dataCollected.contact.items.map(
                      (item: string, index: number) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-medium text-[#0F2137] mb-2">
                    {dictionary.privacy.dataCollected.tracking.title}
                  </h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {dictionary.privacy.dataCollected.tracking.items.map(
                      (item: string, index: number) => (
                        <li key={index}>{item}</li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.purpose.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {dictionary.privacy.purpose.items.map(
                  (item: string, index: number) => (
                    <li key={index} className="leading-relaxed">
                      {item}
                    </li>
                  )
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.legalBasis.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.privacy.legalBasis.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.retention.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.privacy.retention.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.cookies.title}
              </h2>
              <p className="mb-4 leading-relaxed">
                {dictionary.privacy.cookies.intro}
              </p>
              <div className="space-y-2">
                <p>
                  <strong>{dictionary.privacy.cookies.analytics.title}:</strong>{" "}
                  {dictionary.privacy.cookies.analytics.content}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.rights.title}
              </h2>
              <p className="mb-4 leading-relaxed">
                {dictionary.privacy.rights.intro}
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                {dictionary.privacy.rights.items.map(
                  (item: string, index: number) => (
                    <li key={index} className="leading-relaxed">
                      {item}
                    </li>
                  )
                )}
              </ul>
              <p className="mt-4 leading-relaxed">
                {dictionary.privacy.rights.contact}{" "}
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
                {dictionary.privacy.security.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.privacy.security.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.sharing.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.privacy.sharing.content}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#0F2137] mb-4">
                {dictionary.privacy.updates.title}
              </h2>
              <p className="leading-relaxed">
                {dictionary.privacy.updates.content}
              </p>
            </section>

            <section className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600">
                {dictionary.privacy.lastUpdate}: 25/11/2025
              </p>
            </section>
          </div>
        </div>
      </Container>
    </Section>
  );
}
