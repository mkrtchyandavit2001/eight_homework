"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Calendar, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Flags from "country-flag-icons/react/3x2";
import {
  CountryOption,
  CountryCode,
  FormData,
  FormErrors,
  PasswordStrength,
} from "@/types/auth";
import { useLanguage } from "@/context/LanguageContext";
import { SpinnerIcon } from "../icons/Icons";
import {
  useLazyGetCsrfTokenQuery,
  useRegisterMutation,
  useGetLegalDocumentsQuery,
} from "@/redux/slices/authSlice/authApi";

const COUNTRIES: readonly CountryOption[] = [
  { code: "+1", country: "US", name: "USA / Canada", digits: 10 },
  { code: "+374", country: "AM", name: "Armenia", digits: 8 },
  { code: "+7", country: "RU", name: "Russia", digits: 10 },
  { code: "+33", country: "FR", name: "France", digits: 9 },
  { code: "+49", country: "DE", name: "Germany", digits: 10 },
];

const PASSWORD_CRITERIA = [
  { key: "minLength", test: (v: string) => v.length >= 8 },
  { key: "upper", test: (v: string) => /[A-Z]/.test(v) },
  { key: "lower", test: (v: string) => /[a-z]/.test(v) },
  { key: "number", test: (v: string) => /[0-9]/.test(v) },
  { key: "special", test: (v: string) => /[^A-Za-z0-9\s]/.test(v) },
  { key: "noSpaces", test: (v: string) => v.length > 0 && !/\s/.test(v) },
] as const;

function getPasswordStrength(password: string): { strength: PasswordStrength; metCount: number } {
  if (!password) return { strength: null, metCount: 0 };
  const metCount = PASSWORD_CRITERIA.filter((c) => c.test(password)).length;
  if (metCount <= 2) return { strength: "weak", metCount };
  if (metCount <= 4) return { strength: "medium", metCount };
  return { strength: "strong", metCount };
}

type StrengthKey = Exclude<PasswordStrength, null>;

const STRENGTH_STYLE: Record<
  StrengthKey,
  { barColor: string; segments: number; textColor: string }
> = {
  weak: { barColor: "bg-red-500", segments: 1, textColor: "text-red-500" },
  medium: { barColor: "bg-orange-400", segments: 2, textColor: "text-orange-400" },
  strong: { barColor: "bg-green-500", segments: 3, textColor: "text-green-500" },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpForm() {
  const { login } = useAuth();
  const { locale, dict } = useLanguage();
  const t = dict.signup;
  const router = useRouter();

 const { data: legalDocsData } = useGetLegalDocumentsQuery(locale || "en");
  const [getCsrfToken] = useLazyGetCsrfTokenQuery();
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();

  // Գտնում ենք տվյալ լեզվին համապատասխան Terms-ի և Privacy-ի փաստաթղթերը
  const termsDoc = legalDocsData?.data?.find((doc) => doc.type === "terms");
  const privacyDoc = legalDocsData?.data?.find((doc) => doc.type === "privacy");

  // Հղումները կոճակների համար (եթե API-ից տվյալ չկա, դնում ենք ֆոլբեք ռուտ)
  const termsHref = termsDoc?.file_url || `/${locale}/terms`;
  const privacyHref = privacyDoc?.file_url || `/${locale}/privacy-policy`;

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    country: "AM",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  const selectedCountry = COUNTRIES.find((c) => c.country === formData.country) || COUNTRIES[0];
  const FlagIcon = Flags[selectedCountry.country];
  const { strength } = getPasswordStrength(formData.password);

  const countryName = (code: string) => t.countries?.[code] ?? code;

  const updateField = useCallback(
    <K extends keyof FormData>(field: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (submitted) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
      if (generalError) {
        setGeneralError(null);
      }
    },
    [submitted, generalError]
  );

  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, selectedCountry.digits);
    updateField("phoneNumber", digits);
  };

  const validate = (data: FormData): FormErrors => {
    const next: FormErrors = {};
    if (!data.firstName.trim()) next.firstName = t.errors.firstName;
    if (!data.lastName.trim()) next.lastName = t.errors.lastName;
    if (!data.email.trim()) next.email = t.errors.emailRequired;
    else if (!EMAIL_REGEX.test(data.email)) next.email = t.errors.emailInvalid;
    if (!data.birthDate) next.birthDate = t.errors.birthDate;

    if (!data.phoneNumber) {
      next.phoneNumber = t.errors.phoneRequired;
    } else if (data.phoneNumber.length < selectedCountry.digits) {
      next.phoneNumber = (t.errors.phoneLength as string)
        .replace("{digits}", String(selectedCountry.digits))
        .replace("{country}", countryName(selectedCountry.country));
    }

    if (!data.password) {
      next.password = t.errors.passwordRequired;
    } else {
      const unmetCriteria = PASSWORD_CRITERIA.filter((c) => !c.test(data.password));
      if (unmetCriteria.length > 0) {
        next.password = t.errors.passwordWeak;
      }
    }

    if (!data.confirmPassword) next.confirmPassword = t.errors.confirmRequired;
    else if (data.confirmPassword !== data.password) next.confirmPassword = t.errors.confirmMismatch;
    if (!data.agreeToTerms) next.agreeToTerms = t.errors.terms;
    return next;
  };

  const isFormValid = Object.keys(validate(formData)).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setGeneralError(null);

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // Վերցնում ենք id-ները ըստ ընթացիկ լեզվի (հայերեն՝ [1, 3], անգլերեն՝ [2, 4] կամ ըստ ստացված տվյալների)
    const fetchedIds = legalDocsData?.data?.map((doc) => doc.id) || [];
    const defaultIds = locale === "hy" ? [1, 3] : [2, 4];
    const legalDocumentIds = fetchedIds.length > 0 ? fetchedIds : defaultIds;

    // language_id՝ հայերենի դեպքում 1, անգլերենի դեպքում 2
    const languageId = locale === "hy" ? 1 : 2;

    try {
      await getCsrfToken().unwrap();

      const fullPhoneNumber = `${selectedCountry.code}${formData.phoneNumber}`;

      const response = await registerUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: fullPhoneNumber,
        birth_date: formData.birthDate,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        language_id: languageId,
        timezone_id: null,
        legal_document_ids: legalDocumentIds,
      }).unwrap();

      login(
        {
          email: response.data.email,
          name: response.data.first_name,
          phone: response.data.phone || fullPhoneNumber,
        },
        "sanctum-token"
      );

      router.push(
        `/${locale}/verify-email?email=${encodeURIComponent(formData.email)}&name=${encodeURIComponent(formData.firstName)}`
      );
    } catch (err: any) {
      console.log("Full Error Response:", err);

      if (err?.status === 500) {
        setGeneralError(t.errors.server500);
      } else if (err?.data?.errors) {
        const serverErrors: FormErrors = {};
        if (err.data.errors.email) serverErrors.email = err.data.errors.email[0];
        if (err.data.errors.phone) serverErrors.phoneNumber = err.data.errors.phone[0];
        if (err.data.errors.password) serverErrors.password = err.data.errors.password[0];
        if (err.data.errors.birth_date) serverErrors.birthDate = err.data.errors.birth_date[0];
        setErrors((prev) => ({ ...prev, ...serverErrors }));
      } else {
        setGeneralError(t.errors.generic);
      }
    }
  };

  const inputClass = (hasError?: string) =>
    `w-full rounded-[14px] border px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:ring-2 focus:ring-orange-200 ${
      hasError ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-orange-400"
    }`;

  return (
    <div
      itemScope
      itemType="https://schema.org/RegisterAction"
      className="my-auto w-full max-w-[440px] rounded-2xl bg-white p-5 sm:p-6 shadow-xl"
    >
      <header className="mb-3">
        <h2 className="text-xl sm:text-2xl font-semibold leading-7 text-gray-900">{t.title}</h2>
        <p className="mt-1 text-xs sm:text-sm leading-4 text-gray-500">{t.subtitle}</p>
      </header>

      <form className="space-y-3" onSubmit={handleSubmit} noValidate>
        {generalError && (
          <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600 border border-red-200">
            ⚠️ {generalError}
          </div>
        )}

        <fieldset className="grid grid-cols-2 gap-2.5 border-none p-0 m-0">
          <div>
            <label htmlFor="firstName" className="mb-1 block text-xs font-medium text-gray-700">
              {t.firstName}
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              placeholder={t.firstNamePlaceholder}
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              aria-invalid={!!errors.firstName}
              aria-describedby={errors.firstName ? "firstName-error" : undefined}
              className={inputClass(errors.firstName)}
            />
            {errors.firstName && (
              <p id="firstName-error" className="mt-1 text-[11px] leading-3 text-red-500">
                ⊘ {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-xs font-medium text-gray-700">
              {t.lastName}
            </label>
            <input
              id="lastName"
              type="text"
              autoComplete="family-name"
              placeholder={t.lastNamePlaceholder}
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
              className={inputClass(errors.lastName)}
            />
            {errors.lastName && (
              <p id="lastName-error" className="mt-1 text-[11px] leading-3 text-red-500">
                ⊘ {errors.lastName}
              </p>
            )}
          </div>
        </fieldset>

        <div>
          <label htmlFor="email" className="mb-1 block text-xs font-medium text-gray-700">
            {t.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(errors.email)}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-[11px] leading-3 text-red-500">
              ⊘ {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="birthDate" className="mb-1 block text-xs font-medium text-gray-700">
            {t.birthDate}
          </label>
          <div className="relative">
            <Calendar className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="birthDate"
              type="date"
              lang={locale}
              autoComplete="bday"
              value={formData.birthDate}
              onChange={(e) => updateField("birthDate", e.target.value)}
              aria-invalid={!!errors.birthDate}
              aria-describedby={errors.birthDate ? "birthDate-error" : undefined}
              className={`w-full rounded-[14px] border bg-[#F7F7F7] px-3.5 py-2 pl-10 text-sm text-gray-900 outline-none transition-colors focus:ring-2 focus:ring-orange-200 ${
                errors.birthDate ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-orange-400"
              }`}
            />
          </div>
          {errors.birthDate && (
            <p id="birthDate-error" className="mt-1 text-[11px] leading-3 text-red-500">
              ⊘ {errors.birthDate}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="mb-1 block text-xs font-medium text-gray-700">
            {t.phone}
          </label>
          <div
            className={`flex items-center overflow-visible rounded-[14px] border transition-colors focus-within:ring-2 focus-within:ring-orange-200 ${
              errors.phoneNumber ? "border-red-400" : "border-gray-200 focus-within:border-orange-400"
            }`}
          >
            <div className="relative flex-shrink-0 rounded-l-[14px] border-r border-gray-200 bg-gray-50">
              <button
                type="button"
                id="countryCode"
                aria-label={t.selectCountryCode}
                onClick={() => setIsCountryOpen((prev) => !prev)}
                className="flex h-9 w-24 items-center justify-center gap-1 px-2.5 text-xs font-medium text-gray-700 outline-none cursor-pointer"
              >
                <FlagIcon className="h-3.5 w-5 rounded-sm object-cover shadow-sm flex-shrink-0" aria-hidden="true" />
                <span>{selectedCountry.code}</span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </button>

              {isCountryOpen && (
                <div className="absolute left-0 top-full mt-1 z-50 w-52 rounded-lg border border-gray-200 bg-white shadow-lg py-1">
                  {COUNTRIES.map((c) => {
                    const OptionFlag = Flags[c.country];
                    return (
                      <button
                        key={c.country}
                        type="button"
                        onClick={() => {
                          updateField("country", c.country as CountryCode);
                          updateField("phoneNumber", "");
                          setIsCountryOpen(false);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs hover:bg-gray-50 transition-colors"
                      >
                        <OptionFlag className="h-3.5 w-5 rounded-sm object-cover shadow-sm flex-shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-gray-900 w-10">{c.code}</span>
                        <span className="text-gray-600 truncate">{countryName(c.country)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <input
              id="phoneNumber"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="(XX) XX XX XX"
              value={formData.phoneNumber}
              onChange={(e) => handlePhoneChange(e.target.value)}
              aria-invalid={!!errors.phoneNumber}
              aria-describedby={errors.phoneNumber ? "phone-error" : undefined}
              className="w-full px-3 py-2 text-sm text-gray-900 outline-none rounded-r-[14px]"
            />
          </div>
          {errors.phoneNumber && (
            <p id="phone-error" className="mt-1 text-[11px] leading-3 text-red-500">
              ⊘ {errors.phoneNumber}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-xs font-medium text-gray-700">
            {t.password}
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder={t.passwordPlaceholder}
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={`${inputClass(errors.password)} pr-10`}
            />
            <button
              type="button"
              aria-label={showPassword ? t.hidePassword : t.showPassword}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {formData.password && strength && (
            <div className="mt-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-1 gap-1" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${
                        i < STRENGTH_STYLE[strength].segments
                          ? STRENGTH_STYLE[strength].barColor
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`ml-2 text-[11px] font-semibold ${STRENGTH_STYLE[strength].textColor}`}
                >
                  {t.strength[strength]}
                </span>
              </div>
              <ul className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px] leading-3 text-gray-400">
                {PASSWORD_CRITERIA.map((c) => {
                  const met = c.test(formData.password);
                  return (
                    <li
                      key={c.key}
                      className={met ? "text-green-600 font-medium" : "text-gray-400"}
                    >
                      {met ? "✓" : "•"} {t.criteria[c.key]}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {errors.password && (
            <p id="password-error" className="mt-1 text-[11px] leading-3 text-red-500">
              ⊘ {errors.password}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="mb-1 block text-xs font-medium text-gray-700">
            {t.confirmPassword}
          </label>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder={t.confirmPasswordPlaceholder}
              value={formData.confirmPassword}
              onChange={(e) => updateField("confirmPassword", e.target.value)}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
              className={`${inputClass(errors.confirmPassword)} pr-10`}
            />
            <button
              type="button"
              aria-label={showConfirmPassword ? t.hideConfirmPassword : t.showConfirmPassword}
              aria-pressed={showConfirmPassword}
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="mt-1 text-[11px] leading-3 text-red-500">
              ⊘ {errors.confirmPassword}
            </p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-1.5 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => updateField("agreeToTerms", e.target.checked)}
              aria-invalid={!!errors.agreeToTerms}
              aria-describedby={errors.agreeToTerms ? "terms-error" : undefined}
              className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-orange-500 focus:ring-orange-400 cursor-pointer"
            />
            <span>
              {t.termsPrefix}{" "}
              <a
                href={termsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline"
              >
                {t.terms}
              </a>{" "}
              {t.and}{" "}
              <a
                href={privacyHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 underline"
              >
                {t.privacy}
              </a>
              .
            </span>
          </label>
          {errors.agreeToTerms && (
            <p id="terms-error" className="mt-1 text-[11px] leading-3 text-red-500">
              ⊘ {errors.agreeToTerms}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isRegistering || !isFormValid}
          aria-disabled={isRegistering || !isFormValid}
          className={`mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white shadow-sm transition-colors ${
            isFormValid ? "bg-orange-500 hover:bg-orange-600" : "bg-orange-300 cursor-not-allowed"
          } ${
            isRegistering ? "cursor-not-allowed opacity-70" : "active:scale-[0.99]"
          }`}
        >
          {isRegistering ? (
            <>
              <SpinnerIcon className="h-4 w-4 animate-spin text-white" />
              <span>{t.submitting}</span>
            </>
          ) : (
            <>{t.submit}</>
          )}
        </button>

        <p className="pt-1 text-center text-xs text-gray-500">
          {t.haveAccount}{" "}
          <Link
            href={`/${locale}/login`}
            className="font-semibold text-orange-500 hover:text-orange-600"
          >
            {t.signIn}
          </Link>
        </p>
      </form>
    </div>
  );
}