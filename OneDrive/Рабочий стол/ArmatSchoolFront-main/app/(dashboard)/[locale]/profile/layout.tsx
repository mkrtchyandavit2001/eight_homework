import DashSidebar from "@/components/DashSidebar/DashSidebar";
import type { ReactNode } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#fff]">
      <DashSidebar />
      <div className="flex min-w-0 flex-1 px-5 flex-col">{children}</div>
    </div>
  );
}