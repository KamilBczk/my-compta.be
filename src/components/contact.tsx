"use client";

import React, { useState } from "react";
import { SmilePlus, Mail, Phone } from "lucide-react";
import Button from "@/components/kago-ui/button";
import Container from "@/components/kago-ui/Container";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { StaticImageData } from "next/image";
import Section from "@/components/kago-ui/section";
type Dictionary = typeof import("@/dictionaries/fr.json");

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(1),
});

type ContactFormData = z.infer<typeof contactSchema>;

type FormErrors = {
  [key in keyof ContactFormData]?: string;
};

interface ValidationMessages {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  message: string;
  company?: string;
}

interface ContactProps {
  dictionary: Dictionary;
  bannerImage: StaticImageData;
}

export default function Contact({ dictionary, bannerImage }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const contacts = [
    {
      icon: <SmilePlus className="size-6 text-[#28D1DC]" />,
      title: dictionary.contact.info.address.title,
      description: dictionary.contact.info.address.description,
      content: dictionary.contact.info.address.content,
      href: "https://maps.app.goo.gl/bAh6maEzH1q4RDFn9",
    },
    {
      icon: <Mail className="size-6 text-[#FF753A]" />,
      title: dictionary.contact.info.email.title,
      description: dictionary.contact.info.email.description,
      content: dictionary.contact.info.email.content,
      href: "mailto:info@my-compta.be",
    },
    {
      icon: <Phone className="size-6 text-[#FA578E]" />,
      title: dictionary.contact.info.phone.title,
      description: dictionary.contact.info.phone.description,
      content: dictionary.contact.info.phone.content,
      href: "tel:+3202318340",
    },
  ];

  return (
    <div className="">
      <Section>
        <Container>
          <ToastContainer position="bottom-right" />
          <div>
            <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
              <div className="w-full lg:w-2/5 flex flex-col gap-8 lg:gap-12">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    className="flex-1 bg-[#F9FAFC] rounded-2xl py-4 sm:py-5 lg:py-6 px-6 sm:px-8 lg:px-10 flex flex-col gap-3 sm:gap-4"
                    href={contact.href}
                  >
                    {contact.icon}
                    <span>
                      <p className="text-lg font-light">{contact.title}</p>
                      <p className="text-sm text-[#55575A]">
                        {contact.description}
                      </p>
                    </span>
                    <p className="text-lg text-[#02073E]">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: contact.content.replace(/\n/g, "<br />"),
                        }}
                      />
                    </p>
                  </a>
                ))}
              </div>
              <div className="w-full lg:w-3/5 flex-1 bg-white rounded-2xl p-6 sm:p-8 lg:p-12 border-[3px] border-[#025EAC]">
                <div className="mb-12 text-[#02073E]">
                  <h2 className="text-3xl font-medium">
                    {dictionary.contact.form.title}
                  </h2>
                  <p className="text-base text-[#02073E] font-regular mt-1">
                    {dictionary.contact.form.description}
                  </p>
                </div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (isSubmitting) return;

                    const formData = new FormData(e.currentTarget);
                    const form = e.currentTarget;

                    const formValues: ContactFormData = {
                      firstName: formData.get("firstName") as string,
                      lastName: formData.get("lastName") as string,
                      phone: formData.get("phone") as string,
                      company: (formData.get("company") as string) || undefined,
                      email: formData.get("email") as string,
                      message: formData.get("message") as string,
                    };

                    const result = contactSchema.safeParse(formValues);

                    if (!result.success) {
                      const newErrors: FormErrors = {};
                      result.error.issues.forEach((issue) => {
                        const path = issue.path[0] as keyof ContactFormData;
                        const validationMessages = dictionary.contact.form
                          .validation as ValidationMessages;
                        if (validationMessages[path]) {
                          newErrors[path] = validationMessages[path];
                        }
                      });
                      setErrors(newErrors);
                      return;
                    }

                    setErrors({});

                    try {
                      setIsSubmitting(true);

                      const response = await fetch("/api/contact", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          type: "contact",
                          ...result.data,
                        }),
                      });

                      const data = await response.json();

                      if (!response.ok) {
                        throw new Error(
                          data.message || dictionary.contact.form.error
                        );
                      }

                      form.reset();
                      toast.success(dictionary.contact.form.success);
                    } catch (error) {
                      console.error("Erreur détaillée:", error);
                      toast.error(dictionary.contact.form.error);
                    } finally {
                      setIsSubmitting(false);
                    }
                  }}
                  className="flex flex-col gap-6 sm:gap-8"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="lastName"
                        placeholder={dictionary.contact.form.lastName}
                        className={`w-full bg-transparent border rounded-md px-3 py-2 ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } text-black placeholder-gray-700 outline-none`}
                        required
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="firstName"
                        placeholder={dictionary.contact.form.firstName}
                        className={`w-full bg-transparent border rounded-md px-3 py-2 ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } text-black placeholder-gray-700 outline-none`}
                        required
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="tel"
                        name="phone"
                        placeholder={dictionary.contact.form.phone}
                        className={`w-full bg-transparent border rounded-md px-3 py-2 ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } text-black placeholder-gray-700 outline-none`}
                        required
                      />
                      {errors.phone && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="company"
                        placeholder={dictionary.contact.form.company}
                        className="w-full bg-transparent border border-gray-300 rounded-md px-3 py-2 text-black placeholder-gray-700 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="email"
                        name="email"
                        placeholder={dictionary.contact.form.email}
                        className={`w-full bg-transparent border rounded-md px-3 py-2 ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        } text-black placeholder-gray-700 outline-none`}
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-500 text-sm">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      placeholder={dictionary.contact.form.message}
                      className={`w-full bg-transparent border rounded-md px-3 py-2 ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } text-black placeholder-gray-700 outline-none min-h-[100px] resize-none`}
                      required
                    />
                    {errors.message && (
                      <p className="mt-1 text-red-500 text-sm">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-center mt-2 sm:mt-4">
                    <Button
                      type="submit"
                      variant="gradient"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? dictionary.contact.form.submitting
                        : dictionary.contact.form.submit}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
