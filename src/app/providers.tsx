"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { AcademyProvider } from "@/lib/academy-context";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 30_000, retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <AcademyProvider>
        <ServiceWorkerRegister />
        {children}
      </AcademyProvider>
    </QueryClientProvider>
  );
}
