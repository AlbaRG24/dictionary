import { AppProps } from "next/app";
import "../styles/global.css";
import Layout from "../components/layout/layout";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import React from "react";
import { usePathname } from "next/navigation";

const App = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname();
  console.log(pathname);
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {pathname !== "/auth/signin" ? (
          <Layout {...pageProps}>
            <Component {...pageProps} state={pageProps.dehydratedState} />
          </Layout>
        ) : (
          <Component {...pageProps} state={pageProps.dehydratedState} />
        )}
      </HydrationBoundary>
    </QueryClientProvider>
  );
};

export default App;
