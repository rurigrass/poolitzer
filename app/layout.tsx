import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { DeployButton } from "@/components/deploy-button";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { Suspense } from "react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const randomImage = `https://picsum.photos/1920/1080?random=${Date.now()}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${geistSans.className} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main
            className="min-h-screen w-full overflow-x-hidden flex flex-col items-center"
            style={{
              backgroundImage: `url(${randomImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="w-full mx-auto max-w-full overflow-x-hidden">
              <div className="w-full flex flex-col gap-20 items-center overflow-x-hidden">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 overflow-x-hidden">
                  <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm min-w-0">
                    <div className="hidden md:flex gap-5 items-center font-semibold min-w-0">
                      <Link href={"/"} className="whitespace-nowrap">Next.js Supabase Starter</Link>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <DeployButton />
                      </div>
                    </div>
                    <Suspense fallback={<div className="h-9" />}>
                      <div className="flex-shrink-0">
                        <AuthButton />
                      </div>
                    </Suspense>
                  </div>
                </nav>
                <div className="w-full max-w-full overflow-x-hidden">{children}</div>
              </div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16 max-w-full overflow-x-hidden">
                <p>
                  Powered by{" "}
                  <a
                    href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    Supabase
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
