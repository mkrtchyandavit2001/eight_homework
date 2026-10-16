"use client";

import type { SettingsText } from "@/types/settings";
import { useState } from "react";
import SettingsCard from "../SettingsCard/SettingsCard";
import SettingsRow from "../SettingsRow/SettingsRow";
import OutlineButton from "../OutlineButton/OutlineButton";
import { useAuth } from "@/context/AuthContext";
import { useGetMeQuery } from "@/redux/slices/authSlice/authApi";

interface SecurityTabProps {
  t: SettingsText;
  daysSincePasswordChange?: number;
  sessionCount?: number;
  browser?: string;
  onChangePassword?: () => void;
  onChangeEmail?: (email: string) => void;
  onSignOutOthers?: () => void;
  onDeleteAccount?: () => void;
}

function format(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

export default function SecurityTab({
  t,
  daysSincePasswordChange = 30,
  sessionCount = 1,
  browser = "Chrome, macOS",
  onChangePassword,
  onChangeEmail,
  onSignOutOthers,
  onDeleteAccount,
}: SecurityTabProps) {
  const s = t.security;
  const { user } = useAuth();

  // Ստանում ենք օգտատիրոջ տվյալները բեքենդից (/api/me)
  const { data: meData } = useGetMeQuery();
  const apiUser = meData?.data;

  // Իրական էլ. հասցեն բեքենդից կամ AuthContext-ից
  const currentEmail = apiUser?.email || user?.email || "emma@example.com";

  const [emailOpen, setEmailOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

  return (
    <SettingsCard title={s.title} className="!pb-7">
      <div className="-mt-8">
        {/* Change password */}
        <SettingsRow
          title={s.changePassword}
          description={format(s.lastChanged, { days: daysSincePasswordChange })}
          action={
            <OutlineButton onClick={onChangePassword}>{s.change}</OutlineButton>
          }
        />

        {/* Change email */}
        <div className="mt-4 rounded-2xl border border-[#EDEDED]">
          <SettingsRow
            title={s.changeEmail}
            description={currentEmail}
            action={
              <OutlineButton onClick={() => setEmailOpen((v) => !v)}>
                {s.change}
              </OutlineButton>
            }
          />
          {emailOpen && (
            <div className="flex flex-col gap-2 border-b border-[#E5E5E7] px-[22px] py-4">
              <label
                htmlFor="new-email"
                className="text-[12px] leading-[18px] text-[#2D2D2D]"
              >
                {s.newEmail}
              </label>
              <div className="flex items-center gap-4">
                <input
                  id="new-email"
                  type="email"
                  value={newEmail}
                  placeholder={s.newEmailPlaceholder}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="h-[47px] flex-1 rounded-xl border border-[#EDEDED] px-3 text-[14px] font-medium text-[#2D2D2D] outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-[#F15A22]"
                />
                <OutlineButton
                  disabled={!emailValid}
                  onClick={() => {
                    onChangeEmail?.(newEmail);
                    setNewEmail("");
                    setEmailOpen(false);
                  }}
                >
                  {s.change}
                </OutlineButton>
              </div>
            </div>
          )}
        </div>

        {/* Active sessions */}
        <SettingsRow
          title={s.activeSessions}
          description={format(s.sessionsDesc, {
            count: sessionCount,
            browser,
          })}
          action={
            <OutlineButton onClick={onSignOutOthers} className="px-4">
              {s.signOutOthers}
            </OutlineButton>
          }
        />

        {/* Danger zone */}
        <div className="flex flex-col gap-[6px] pt-4">
          <p className="text-[15px] leading-[22px] text-[#E7000B]">
            {s.dangerZone}
          </p>
          <p className="text-[13px] leading-5 text-[#666666]">{s.dangerDesc}</p>
          <div className="pt-1">
            {confirmDelete ? (
              <div className="flex items-center gap-2">
                <OutlineButton
                  variant="danger"
                  className="h-[37.5px] text-[13px]"
                  onClick={() => {
                    onDeleteAccount?.();
                    setConfirmDelete(false);
                  }}
                >
                  {s.deleteConfirm}
                </OutlineButton>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  className="h-[37.5px] px-3 text-[13px] font-semibold text-[#999999] hover:text-[#2D2D2D]"
                >
                  {t.account.cancel}
                </button>
              </div>
            ) : (
              <OutlineButton
                variant="danger"
                className="h-[37.5px] text-[13px]"
                onClick={() => setConfirmDelete(true)}
              >
                {s.deleteAccount}
              </OutlineButton>
            )}
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}