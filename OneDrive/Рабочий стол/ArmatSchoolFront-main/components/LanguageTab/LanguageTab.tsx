"use client";

import { INITIAL_LANGUAGE } from "@/data/settingsOptions";
import type { DialectPreference, SelectOption, SettingsLocale, SettingsText } from "@/types/settings";
import { useEffect, useState } from "react";
import SettingsCard from "../SettingsCard/SettingsCard";
import ProfileSelectField from "../ProfileSelectField/ProfileSelectField";


interface LanguageTabProps {
  t: SettingsText;
  /** Active locale (from LanguageProvider) */
  locale: SettingsLocale;
  onLocaleChange: (locale: SettingsLocale) => void;
  initialDialect?: DialectPreference;
  onSave?: (prefs: {
    interfaceLocale: SettingsLocale;
    dialect: DialectPreference;
  }) => Promise<void> | void;
}

const DIALECTS: DialectPreference[] = [
  "readWrite",
  "speak",
  "understand",
  "none",
];

export default function LanguageTab({
  t,
  locale,
  onLocaleChange,
  initialDialect = INITIAL_LANGUAGE.dialect,
  onSave,
}: LanguageTabProps) {
  const l = t.language;
  const [selectedLocale, setSelectedLocale] = useState<SettingsLocale>(locale);
  const [dialect, setDialect] = useState<DialectPreference>(initialDialect);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Keep in sync when the URL locale changes elsewhere
  useEffect(() => setSelectedLocale(locale), [locale]);

  useEffect(() => {
    if (!justSaved) return;
    const id = window.setTimeout(() => setJustSaved(false), 2500);
    return () => window.clearTimeout(id);
  }, [justSaved]);

  const dialectOptions: SelectOption[] = DIALECTS.map((d) => ({
    value: d,
    label: l.dialectOptions[d],
  }));

  const localeButtons: { value: SettingsLocale; label: string }[] = [
    { value: "en", label: l.english },
    { value: "hy", label: l.armenian },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave?.({ interfaceLocale: selectedLocale, dialect });
      if (selectedLocale !== locale) onLocaleChange(selectedLocale);
      setJustSaved(true);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SettingsCard title={l.title}>
      <div className="-mt-6 flex flex-col gap-5 pt-6">
        {/* Interface language */}
        <div className="flex flex-col gap-[6px]">
          <p className="text-[13px] font-semibold leading-5 text-[#2D2D2D]">
            {l.interfaceLanguage}
          </p>
          <div className="flex gap-2 pt-3" role="radiogroup">
            {localeButtons.map(({ value, label }) => {
              const active = selectedLocale === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSelectedLocale(value)}
                  className={`h-[37.5px] min-w-[77px] rounded-lg border px-4 text-[13px] font-semibold leading-5 transition-colors ${
                    active
                      ? "border-transparent bg-[#F15A22]/10 text-[#F15A22]"
                      : "border-[#E5E5E7] text-[#666666] hover:border-[#F15A22]"
                  } ${value === "hy" ? "font-['Segoe_UI',sans-serif]" : ""}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dialect */}
        <div className="flex flex-col gap-[6px]">
          <ProfileSelectField
            label={l.dialect}
            value={dialect}
            options={dialectOptions}
            onChange={(v) => setDialect(v as DialectPreference)}
            className="!py-0 [&_label]:!text-[13px] [&_label]:!text-[#2D2D2D]"
          />
        </div>

        <div className="flex items-center justify-center gap-3 py-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full px-5 py-2 text-[15px] font-semibold leading-[22px] text-[#F15A22] transition-colors hover:bg-[#F15A22]/10 disabled:opacity-50"
          >
            {l.savePreferences}
          </button>
          {justSaved && (
            <span className="text-[13px] font-medium text-[#16A34A]">
              {l.saved}
            </span>
          )}
        </div>
      </div>
    </SettingsCard>
  );
}
