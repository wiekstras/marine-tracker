import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import {ThemeProvider} from "@/components/theme-provider";
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Marine Tracker",
  description: "Track marine traffic in real-time from Terschelling",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

     const session = await auth();

  return (
      <SessionProvider session={session}>
    <html lang="en">
        <body
          className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
          )}
        >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>

        </body>
    </html>
</SessionProvider>
  );
}