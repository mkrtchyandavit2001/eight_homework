"use client";

import React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";

interface ProvidersProps {
  children: React.ReactNode;
  session?: SessionProviderProps["session"];
}

export default function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
}