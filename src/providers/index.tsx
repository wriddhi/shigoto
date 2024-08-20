"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/providers/auth";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const Provider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </AuthProvider>
      <Toaster closeButton />
    </QueryClientProvider>
  );
};
