import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "./template";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, firstName, lastName, phone, company, email, message } = body;
    const now = new Date();
    const formattedDate = now.toLocaleDateString("fr-BE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      throw new Error("La clé API Resend n'est pas configurée");
    }

    let content = "";
    let subject = "";

    if (type === "callback") {
      // Demande de rappel
      content = `
        <p style="color: #000000;"><strong>Type:</strong> Demande de rappel</p>
        <p style="color: #000000;"><strong>Prénom:</strong> ${firstName}</p>
        <p style="color: #000000;"><strong>Téléphone:</strong> ${phone}</p>
        <p style="color: #000000;"><strong>Date:</strong> ${formattedDate}</p>
      `;
      subject = "Nouvelle demande de rappel";
    } else {
      // Formulaire de contact général
      content = `
        <p style="color: #000000;"><strong>Type:</strong> Contact général</p>
        <p style="color: #000000;"><strong>Prénom:</strong> ${firstName}</p>
        <p style="color: #000000;"><strong>Nom:</strong> ${lastName}</p>
        <p style="color: #000000;"><strong>Téléphone:</strong> ${phone}</p>
        <p style="color: #000000;"><strong>Société:</strong> ${company || "Non spécifié"}</p>
        <p style="color: #000000;"><strong>Email:</strong> ${email}</p>
        <p style="color: #000000;"><strong>Message:</strong> ${message}</p>
        <p style="color: #000000;"><strong>Date:</strong> ${formattedDate}</p>
      `;
      subject = "Nouveau message depuis le formulaire de contact";
    }

    const { error } = await resend.emails.send({
      from: "My Compta Website <my-compta@kago-group.com>",
      to: [process.env.CONTACT_EMAIL as string],
      subject: subject,
      html: EmailTemplate({
        primaryColor: "#000000",
        logoUrl: "https://i.ibb.co/h1s3XVZB/Vector.png",
        contactInfo: {
          website: "https://my-compta.be",
          email: "info@my-compta.be",
          phone: "028 96 89 11",
          address: "Rue des Genévriers 56, 1020 Bruxelles",
        },
        content: content,
      }),
    });

    if (error) {
      throw new Error("Erreur lors de l'envoi du message");
    }

    const successMessage = type === "callback" 
      ? "Demande de rappel envoyée avec succès" 
      : "Message envoyé avec succès";

    return NextResponse.json(
      { message: successMessage },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}