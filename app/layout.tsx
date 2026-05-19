import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TreatPlanner — Find Affordable Medical Treatment Abroad",
  description: "Compare hospitals, procedures and total trip costs across 50+ countries. Save up to 90% on medical treatment with TreatPlanner.",
  keywords: "medical tourism, affordable surgery abroad, hospital comparison, medical travel planner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
