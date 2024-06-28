import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useIdioms } from "../hooks/useIdioms";
import { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { server } from "./mocks/node";
import { http, HttpResponse } from "msw";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("#useIdioms", () => {
  it("getIdioms - successful query hook", async () => {
    const { result } = renderHook(() => useIdioms().getIdioms(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual([
      {
        id: "1",
        idiom: "hit the sack",
        meaning: "go to sleep",
        examples: ["I'll hit the sack early today"],
        synonyms: ["Hit the hay"],
        origin: "something",
        source: "Oxford dictionary",
        author: null,
      },
    ]);
  });
  it("getIdioms - failure query hook", async () => {
    server.use(
      http.get("*", () => {
        return HttpResponse.error();
      })
    );
    const { result } = renderHook(() => useIdioms().getIdioms(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.isError).toBeDefined();
  });
  it("getIdiomById - successful query hook", async () => {
    const id = "1";
    const { result } = renderHook(() => useIdioms().getIdiomById(id), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual({
      id: "1",
      idiom: "hit the sack",
      meaning: "go to sleep",
      examples: ["I'll hit the sack early today"],
      synonyms: ["Hit the hay"],
      origin: "something",
      source: "Oxford dictionary",
      author: null,
    });
  });
  it("getIdiomById - failure query hook", async () => {
    const id = "1";
    server.use(
      http.get("*", () => {
        return HttpResponse.error();
      })
    );
    const { result } = renderHook(() => useIdioms().getIdiomById(id), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.isError).toBeDefined();
  });
});
