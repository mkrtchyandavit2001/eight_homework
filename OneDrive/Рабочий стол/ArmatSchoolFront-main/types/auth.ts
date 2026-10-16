import Flags from "country-flag-icons/react/3x2";

export type CountryCode = keyof typeof Flags;

export interface CountryOption {
  code: string;
  country: CountryCode;
  name: string;
  digits: number;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  country: CountryCode;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  birthDate?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
}

export type PasswordStrength = "weak" | "medium" | "strong" | null;

export interface VerifyEmailRequest {
  token: string;
}

export interface VerifyEmailResponse {
  success: boolean;
  message: string;
}

export interface ResendEmailRequest {
  email: string;
}

export interface ApiError {
  message: string;
  code?: string;
}

export interface ResetPasswordCardProps {
  initialEmail?: string;
}
