import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 300000,
        retry: 2,
        refetchOnWindowFocus: false,
      },
    },
  });
}
