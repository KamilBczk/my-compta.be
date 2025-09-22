import React from "react";
import Container from "@/components/kago-ui/Container";
import Section from "@/components/kago-ui/section";
import Separator from "@/components/separator";
import { Sparkles, Zap, Gem } from "lucide-react";
import CtaImages from "@/components/kago-ui/cta-images";
import Button from "@/components/kago-ui/button";

export default function Career() {
  return (
    <div>
      <Section color="gray">
        <>
          <Container>
            <CtaImages
              title={
                <h3 className="text-3xl font-medium text-[#0F2137]">
                  Le parcours de votre expert
                </h3>
              }
              items={[
                {
                  icon: (
                    <Sparkles size={48} className="text-[#28D1DC] size-28" />
                  ),
                  text: "Vision",
                  description: {
                    title: "Vision",
                    points: [
                      "Accompagner chaque client dans la réussite de ses projets.",
                      "Transformer la comptabilité en un outil simple et utile au quotidien.",
                      "Être un partenaire de confiance pour les entrepreneurs, dirigeants et particuliers.",
                    ],
                  },
                },
                {
                  icon: <Zap size={48} className="text-[#FA578E] size-28" />,
                  text: "Méthodes",
                  description: {
                    title: "Méthodes",
                    points: [
                      "Privilégier l'échange et le conseil personnalisé plutôt que les solutions toutes faites.",
                      "Utiliser des outils modernes pour simplifier la gestion et gagner du temps.",
                      "Allier expérience et approche humaine pour apporter des réponses concrètes.",
                      "Accompagner les clients pas à pas, selon l'évolution de leurs besoins.",
                    ],
                  },
                },
                {
                  icon: <Gem size={48} className="text-[#28DCB2] size-28" />,
                  text: "Valeurs",
                  description: {
                    title: "Valeurs",
                    points: [
                      "Proximité : toujours à l'écoute et disponible.",
                      "Clarté : des conseils compréhensibles, sans langage compliqué.",
                      "Rigueur : un travail sérieux et fiable.",
                      "Engagement : chaque client est suivi avec attention et respect.",
                    ],
                  },
                },
              ]}
              content={[
                "Avec 16 ans d'expérience, votre expert vous accompagne en comptabilité, fiscalité, déclarations TVA et création d'entreprise à Bruxelles.",
                "Rigueur, indépendance et confidentialité sont au cœur de ses services pour optimiser votre gestion et sécuriser vos obligations.",
              ]}
              button={
                <Button variant="gradient" href="/contact">
                  Contactez-nous
                </Button>
              }
            />
          </Container>
          <div className="h-[30px] absolute bottom-0 left-0 right-0">
            <Separator align="left" />
          </div>
        </>
      </Section>
    </div>
  );
}
