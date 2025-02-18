import "./globals.css";
import Sidebar from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { DotPattern } from "@/components/ui/dot-pattern";
import { LoadingScreen } from "@/components/ui/loading";
import { Suspense } from "react";

export const metadata = {
  title: "Cobble",
  description: "Data for US GOV",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full dark">
      <body className="h-full bg-background text-foreground">
        <ThemeProvider>
          <div className="fixed inset-0 -z-10">
            <DotPattern
              width={20}
              height={20}
              cx={1}
              cy={1}
              cr={1}
              className="[mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)] opacity-50"
            />
          </div>
          <Sidebar>
            <Suspense fallback={<LoadingScreen />}>
              {children}
            </Suspense>
          </Sidebar>
        </ThemeProvider>
      </body>
    </html>
  );
}