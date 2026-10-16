"use client";

import { AVATAR_MAX_BYTES } from "@/data/settingsOptions";
import type { Gender, ProfileFormValues, SettingsLocale, SettingsText } from "@/types/settings";
import { useEffect, useMemo, useState } from "react";
import SettingsCard from "../SettingsCard/SettingsCard";
import AvatarUploader from "../AvatarUploader/AvatarUploader";
import TextField from "../TextField/TextField";
import ProfileSelectField from "../ProfileSelectField/ProfileSelectField";
import TextAreaField from "../TextAreaField/TextAreaField";
import { SettingsCalendarIcon, SettingsClockIcon, SettingsGlobeIcon, SettingsMailIcon, SettingsMapPinIcon, SettingsPhoneIcon, SettingsUserIcon } from "../icons/Icons";
import { useAuth } from "@/context/AuthContext";
import { useGetMeQuery } from "@/redux/slices/authSlice/authApi";

// Ներմուծում ենք բազայից աշխատող RTK Query հուքերը
import { useGetCountriesQuery } from "@/redux/slices/countriesSlice/countriesApi";
import { useGetTimezonesQuery } from "@/redux/slices/timezonesSlice/timezonesApi";

interface AccountTabProps {
  t: SettingsText;
  locale: SettingsLocale;
  onSave?: (values: ProfileFormValues & { firstName: string; lastName: string }, avatar: File | null) => Promise<void> | void;
}

const GENDERS: Gender[] = ["female", "male", "other", "preferNot"];

// Օգնական ֆունկցիա՝ երկրի կոդը (օրինակ՝ 'AM') դրոշի էմոջիի փոխարկելու համար
const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

export default function AccountTab({
  t,
  locale,
  onSave,
}: AccountTabProps) {
  const a = t.account;
  const { user } = useAuth();
  
  // 1. Ստանում ենք օգտատիրոջ տվյալները բեքենդից
  const { data: meData, refetch } = useGetMeQuery();
  const apiUser = meData?.data;

  // 2. Բեռնում ենք երկրները բազայից՝ ըստ ընթացիկ լեզվի
  const { data: countriesRes } = useGetCountriesQuery(locale);
  const countriesList = countriesRes?.data || [];

  const [selectedCountryId, setSelectedCountryId] = useState<number | string>("");

  // Առանձնացնում ենք First Name և Last Name
  const initialFirstName = apiUser?.first_name || user?.name?.split(" ")[0] || "";
  const initialLastName = apiUser?.last_name || user?.name?.split(" ").slice(1).join(" ") || "";

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);

  // Սկզբնական արժեքներ մնացած դաշտերի համար
  const initialValues: ProfileFormValues = useMemo(() => ({
    fullName: `${initialFirstName} ${initialLastName}`.trim(),
    email: apiUser?.email || user?.email || "",
    phone: apiUser?.phone || user?.phone || "",
    country: apiUser?.country?.code || "",
    city: apiUser?.city?.name || "",
    timezone: apiUser?.timezone?.identifier || "",
    dob: apiUser?.birth_date || "",
    gender: (apiUser?.gender as Gender) || "preferNot",
    learningGoal: apiUser?.learning_goal || "",
    aboutMe: apiUser?.about_me || "",
  }), [apiUser, user, initialFirstName, initialLastName]);

  const [saved, setSaved] = useState<ProfileFormValues>(initialValues);
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  // Երբ բեքենդից տվյալները գալիս են, թարմացնում ենք ֆորման
  useEffect(() => {
    if (apiUser) {
      setFirstName(apiUser.first_name || "");
      setLastName(apiUser.last_name || "");
      const freshValues: ProfileFormValues = {
        fullName: `${apiUser.first_name || ""} ${apiUser.last_name || ""}`.trim(),
        email: apiUser.email,
        phone: apiUser.phone || "",
        country: apiUser.country?.code || "",
        city: apiUser.city?.name || "",
        timezone: apiUser.timezone?.identifier || "",
        dob: apiUser.birth_date || "",
        gender: (apiUser.gender as Gender) || "preferNot",
        learningGoal: apiUser.learning_goal || "",
        aboutMe: apiUser.about_me || "",
      };
      setValues(freshValues);
      setSaved(freshValues);
    }
  }, [apiUser]);

  // Առանձին useEffect՝ երկրի ID-ն որոշելու համար
  useEffect(() => {
    if (apiUser?.country?.code && countriesList.length > 0) {
      const found = countriesList.find((c) => c.code === apiUser.country.code);
      if (found) {
        setSelectedCountryId(found.id);
      }
    }
  }, [apiUser, countriesList]);

  // 3. Բեռնում ենք թայմզոնները բազայից՝ կախված լեզվից և ընտրված երկրից
  const { data: timezonesRes } = useGetTimezonesQuery({
    locale,
    country_id: selectedCountryId || undefined,
  });
  const timezonesList = timezonesRes?.data || [];

  const dirty = useMemo(
    () =>
      firstName !== (apiUser?.first_name || "") ||
      lastName !== (apiUser?.last_name || "") ||
      avatarFile !== null ||
      (Object.keys(values) as (keyof ProfileFormValues)[]).some(
        (k) => values[k] !== saved[k]
      ),
    [values, saved, avatarFile, firstName, lastName, apiUser]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!justSaved) return;
    const id = window.setTimeout(() => setJustSaved(false), 2500);
    return () => window.clearTimeout(id);
  }, [justSaved]);

  const set = <K extends keyof ProfileFormValues>(
    key: K,
    value: ProfileFormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setJustSaved(false);
  };

  const handleCountryChange = (countryCode: string) => {
    const matchedCountry = countriesList.find((c) => c.code === countryCode);
    if (matchedCountry) {
      setSelectedCountryId(matchedCountry.id);
    } else {
      setSelectedCountryId("");
    }

    setValues((prev) => ({
      ...prev,
      country: countryCode,
      timezone: "",
      city: "",
    }));
  };

  const handleTimezoneChange = (timezoneIdentifier: string) => {
    const matchedTz = timezonesList.find((tz) => tz.identifier === timezoneIdentifier);
    setValues((prev) => ({
      ...prev,
      timezone: timezoneIdentifier,
      city: matchedTz ? matchedTz.representative_city : prev.city,
    }));
  };

  const handleAvatar = (file: File) => {
    const okType = ["image/jpeg", "image/png", "image/gif"].includes(file.type);
    if (!okType) {
      setAvatarError(a.photoBadType);
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      setAvatarError(a.photoTooBig);
      return;
    }
    setAvatarError(null);
    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setValues(saved);
    setFirstName(apiUser?.first_name || "");
    setLastName(apiUser?.last_name || "");
    setAvatarFile(null);
    setPreviewUrl(null);
    setAvatarError(null);
    setJustSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { ...values, fullName: `${firstName} ${lastName}`.trim(), firstName, lastName };
      if (onSave) {
        await onSave(payload, avatarFile);
      } else {
        await new Promise((res) => setTimeout(res, 800));
      }
      setSaved(values);
      setAvatarFile(null);
      setJustSaved(true);
      refetch();
    } catch {
      // Handled silently
    } finally {
      setSaving(false);
    }
  };

  const countryOptions = countriesList.map((c) => ({
    value: c.code,
    label: `${getFlagEmoji(c.code)}  ${c.name}`,
  }));

  const timezoneOptions = timezonesList.map((tz) => ({
    value: tz.identifier,
    label: tz.label || `${tz.representative_city} (${tz.offset})`,
  }));

  const cityOptions = Array.from(
    new Set(timezonesList.map((tz) => tz.representative_city).filter(Boolean))
  ).map((cityName) => ({
    value: cityName,
    label: cityName,
  }));

  const genderOptions = GENDERS.map((g) => ({ value: g, label: a.genders[g] }));

  return (
    <SettingsCard title={a.title}>
      <p className="-mt-5 pb-6 text-[13px] leading-5 text-[#999999]">
        {a.subtitle}
      </p>

      <AvatarUploader
        initial={firstName.trim().charAt(0).toUpperCase() || "?"}
        previewUrl={previewUrl || apiUser?.avatar_url || null}
        title={a.photoTitle}
        hint={a.photoHint}
        uploadLabel={a.uploadPhoto}
        error={avatarError}
        onFile={handleAvatar}
      />

      <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-5 px-0 md:grid-cols-2 md:px-5">
        {/* Անուն (First Name) */}
        <TextField
          label="Անուն"
          icon={SettingsUserIcon}
          value={firstName}
          onChange={(v) => {
            setFirstName(v);
            setJustSaved(false);
          }}
          autoComplete="given-name"
        />

        {/* Ազգանուն (Last Name) */}
        <TextField
          label="Ազգանուն"
          icon={SettingsUserIcon}
          value={lastName}
          onChange={(v) => {
            setLastName(v);
            setJustSaved(false);
          }}
          autoComplete="family-name"
        />

        <TextField
          label={a.fields.email}
          icon={SettingsMailIcon}
          value={values.email}
          onChange={(v) => set("email", v)}
          type="email"
          disabled
        />
        <TextField
          label={a.fields.phone}
          icon={SettingsPhoneIcon}
          value={values.phone}
          onChange={(v) => set("phone", v)}
          type="tel"
          autoComplete="tel"
        />
        
        <ProfileSelectField
          label={a.fields.country}
          icon={SettingsGlobeIcon}
          value={values.country}
          options={countryOptions}
          searchable={true}
          onChange={handleCountryChange}
        />
        <ProfileSelectField
          label={a.fields.city}
          icon={SettingsMapPinIcon}
          value={values.city}
          options={cityOptions}
          searchable={true}
          onChange={(v) => set("city", v)}
        />

        <ProfileSelectField
          label={a.fields.timezone}
          icon={SettingsClockIcon}
          value={values.timezone}
          options={timezoneOptions}
          searchable={true}
          onChange={handleTimezoneChange}
        />
        <TextField
          label={a.fields.dob}
          icon={SettingsCalendarIcon}
          value={values.dob}
          onChange={(v) => set("dob", v)}
          type="date"
        />

        <div className="md:col-span-2">
          <ProfileSelectField
            label={a.fields.gender}
            icon={SettingsUserIcon}
            value={values.gender}
            options={genderOptions}
            onChange={(v) => set("gender", v as Gender)}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-6 px-0 md:px-5">
        <TextAreaField
          label={a.learningGoal}
          value={values.learningGoal}
          placeholder={a.learningGoalPlaceholder}
          onChange={(v) => set("learningGoal", v)}
        />
        <div className="border-t border-[#F4F4F4] pt-5">
          <TextAreaField
            label={a.aboutMe}
            value={values.aboutMe}
            placeholder={a.aboutPlaceholder}
            onChange={(v) => set("aboutMe", v)}
            rows={3}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-5">
        {justSaved && (
          <span className="mr-2 text-[13px] font-medium text-[#16A34A]">
            {a.saved}
          </span>
        )}
        <button
          type="button"
          onClick={handleCancel}
          disabled={!dirty || saving}
          className="h-10 rounded-[22px] px-4 text-[13px] font-semibold text-[#999999] transition-colors hover:text-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {a.cancel}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!dirty || saving}
          className="h-10 rounded-full px-5 text-[14px] font-semibold text-[#F15A22] transition-colors hover:bg-[#F15A22]/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "..." : a.save}
        </button>
      </div>
    </SettingsCard>
  );
}