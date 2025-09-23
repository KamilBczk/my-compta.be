"use client";

import React from "react";
import { Clock } from "lucide-react";

type Dictionary = typeof import("@/dictionaries/fr.json");

interface OpeningHoursProps {
  dictionary: Dictionary;
}

export default function OpeningHours({ dictionary }: OpeningHoursProps) {
  // Obtenir le jour actuel (0 = dimanche, 1 = lundi, etc.)
  const currentDay = new Date().getDay();

  // Convertir le jour JS (0=dimanche) vers notre ordre (0=lundi)
  const getCurrentDayIndex = () => {
    return currentDay === 0 ? 6 : currentDay - 1;
  };

  const currentDayIndex = getCurrentDayIndex();

  // Définir les horaires dans l'ordre lundi à dimanche
  const schedule = [
    { key: "monday", hours: dictionary.contact.hours.schedule.weekdays },
    { key: "tuesday", hours: dictionary.contact.hours.schedule.weekdays },
    { key: "wednesday", hours: dictionary.contact.hours.schedule.weekdays },
    { key: "thursday", hours: dictionary.contact.hours.schedule.weekdays },
    { key: "friday", hours: dictionary.contact.hours.schedule.weekdays },
    { key: "saturday", hours: dictionary.contact.hours.schedule.weekend },
    { key: "sunday", hours: dictionary.contact.hours.schedule.weekend },
  ];

  // Vérifier si c'est ouvert maintenant
  const isOpenNow = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    // Ouvert de 9h à 17h en semaine seulement
    if (currentDayIndex >= 0 && currentDayIndex <= 4) {
      const openTime = 9 * 60; // 9:00
      const closeTime = 17 * 60; // 17:00
      return currentTime >= openTime && currentTime < closeTime;
    }
    return false;
  };

  const openNow = isOpenNow();

  return (
    <div className="bg-[#F9FAFC] rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="size-6 text-[#025EAC]" />
        <div>
          <h3 className="text-xl font-medium text-[#02073E]">
            {dictionary.contact.hours.title}
          </h3>
          <p
            className={`text-sm font-medium ${
              openNow ? "text-green-600" : "text-red-600"
            }`}
          >
            {openNow
              ? dictionary.contact.hours.status.open
              : dictionary.contact.hours.status.closed}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {schedule.map((day, index) => {
          const dayName =
            dictionary.contact.hours.days[
              day.key as keyof typeof dictionary.contact.hours.days
            ];
          const isToday = index === currentDayIndex;

          return (
            <div
              key={day.key}
              className={`flex justify-between items-center ${
                isToday ? "font-bold text-[#025EAC]" : "text-[#55575A]"
              }`}
            >
              <span className="capitalize">{dayName}</span>
              <span>{day.hours}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
