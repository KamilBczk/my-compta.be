"use client";
import React, { useState } from "react";
import Modal from "./kago-ui/modal";
import Button from "./kago-ui/button";
import { Dictionary } from "@/utils/useDictionary";

interface CallbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "fr" | "en";
  dictionary: Dictionary;
}

export default function CallbackPopup({
  isOpen,
  onClose,
  lang,
  dictionary,
}: CallbackPopupProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName.trim() || !formData.phone.trim()) {
      setError(dictionary.callback.errorRequired);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "callback",
          firstName: formData.firstName,
          phone: formData.phone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send callback request");
      }

      setIsSuccess(true);
      setFormData({ firstName: "", phone: "" });
    } catch (err) {
      setError(dictionary.callback.errorSubmit);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({ firstName: "", phone: "" });
    setIsSuccess(false);
    setError("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={dictionary.callback.title}
    >
      {isSuccess ? (
        <div className="text-center py-4">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p className="text-lg text-green-600 mb-6">
            {dictionary.callback.success}
          </p>
          <Button
            variant="gradient"
            type="button"
            className="w-full"
            onClick={handleClose}
          >
            {dictionary.callback.close}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {dictionary.callback.firstName} *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#025EAC] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {dictionary.callback.phone} *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#025EAC] focus:border-transparent"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <div className="pt-4">
            <Button
              variant="gradient"
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "..." : dictionary.callback.submit}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
