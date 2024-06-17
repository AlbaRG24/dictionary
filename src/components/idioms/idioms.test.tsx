import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "../../tests/test-utils";
import Idioms from "./idioms";
import { server } from "../../tests/mocks/server";
import { http, HttpResponse } from "msw";

afterEach(() => cleanup());

const idiomsUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

describe("#idioms", () => {
  it("displays idioms", async () => {
    render(<Idioms />);
    await screen.findByRole("link", {
      name: "View details for idiom: hit the sack",
    });

    expect(screen.getByRole("heading", { name: "h" })).toBeInTheDocument();
    expect(screen.getByRole("paragraph", { name: "idiom" })).toHaveTextContent(
      "hit the sack"
    );
    expect(
      screen.getByRole("link", {
        name: "View details for idiom: hit the sack",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "View details for idiom: hit the sack",
      })
    ).toHaveAttribute("href", "/idioms/1");
  });

  it("shows skeleton while fetching data", async () => {
    render(<Idioms />);

    const skeleton = await document.querySelector(".ant-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("handles server error", async () => {
    server.use(
      http.get(`${idiomsUrl}/idioms`, () => {
        return HttpResponse.error();
      })
    );
    render(<Idioms />);
    await screen.findByTestId("error-message");
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Oops! We Couldn't Find That Word"
    );
  });
});
