import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KONNET STREAM",
  description: "watch exclusive content on KONNET ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
         attribute="class"
         defaultTheme="dark"
         forcedTheme="dark"
         >
       <main className="  max-w-[2000px]  flex-1  mx-auto">
        <Toaster theme="light" position="bottom-center"/>
       {children}
       </main>
        </ThemeProvider>
        </body>
    </html>
  );
}
