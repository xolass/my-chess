import { Modal } from "@/components/modals/modal";
import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Chess :D",
  description: "Man, I really took a long time to do this",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Modal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
