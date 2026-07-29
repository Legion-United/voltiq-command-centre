import type { Metadata } from "next";
import "./globals.css";
import DashShell from "@/components/DashShell";
import BootScreen from "@/components/BootScreen";

export const metadata: Metadata = {
  title: "Voltiq · Electrical Command Centre",
  description:
    "The command centre for a growing electrical contractor. Voltiq runs on LEGION OS: live crew dispatch, planning, multi-project delivery, procurement and cash, with a digital workforce coordinating it all.",
};

const themeInit = `(function(){try{var t=localStorage.getItem('voltiq-theme')||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <BootScreen />
        <DashShell>{children}</DashShell>
      </body>
    </html>
  );
}
