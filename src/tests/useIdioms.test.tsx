import { renderHook, waitFor } from "@testing-library/react";
import { useIdioms } from "../hooks/useIdioms";
import { describe, expect, it } from "vitest";
import { server } from "./mocks/server";
import { http, HttpResponse } from "msw";
import { Wrapper } from "./test-utils";

describe("#useIdioms", () => {
  it("getIdioms - successful query hook", async () => {
    const { result } = renderHook(() => useIdioms().getIdioms(), {
      wrapper: Wrapper,
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
        synonyms: [{ word: "Hit the hay", url: "www.something.com" }],
        origin: "origin",
        source: { name: "Oxford dictionary", url: "www.something.com" },
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
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.isError).toBeDefined();
  });
  it("getIdiomById - successful query hook", async () => {
    const id = "1";
    const { result } = renderHook(() => useIdioms().getIdiomById(id), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual({
      id: "1",
      idiom: "hit the sack",
      meaning: "go to sleep",
      examples: ["I'll hit the sack early today"],
      synonyms: [{ word: "Hit the hay", url: "www.something.com" }],
      origin: "origin",
      source: { name: "Oxford dictionary", url: "www.something.com" },
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
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.isError).toBeDefined();
  });
});
