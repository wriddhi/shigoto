import type { Metadata } from "next";
import { Provider } from "@/providers";
import "./globals.css";
import { mabry } from "@/config/font";

export const metadata: Metadata = {
  title: "Shigoto",
  description: "Manage all your workspaces in one place",
};

const fonts = `${mabry.variable}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fonts} font-serif`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
