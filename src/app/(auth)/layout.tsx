"use client";

import Header from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex flex-col">
      <Header />
      <section className="flex flex-1">
        {/* <Sidebar /> */}
        {children}
      </section>
    </section>
  );
}
