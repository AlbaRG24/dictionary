import { describe, expect, it, afterEach } from "vitest";
import { cleanup, render, screen } from "./test-utils";
import { http, HttpResponse } from "msw";
import IdiomsPage from "../pages/idioms/[id]";
import { server } from "./mocks/server";

afterEach(() => cleanup());

const idiomsUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

describe("#IdiomsPage", () => {
  it("displays the idiom page", async () => {
    render(<IdiomsPage id={"1"} />);
    await screen.findByTestId("id-page");
    expect(
      screen.getByRole("heading", { name: "hit the sack" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("paragraph", { name: "meaning" })
    ).toHaveTextContent("go to sleep");
    expect(
      screen.getByRole("listitem", { name: "example of use" })
    ).toHaveTextContent("I'll hit the sack early today");
    expect(
      screen.getByRole("paragraph", { name: "ethimology" })
    ).toHaveTextContent("origin");
    expect(
      screen.getByRole("link", { name: "go to meaning of synonym" })
    ).toHaveAttribute("href", "www.something.com");
    expect(
      screen.getByRole("link", { name: "go to source url" })
    ).toHaveTextContent("Oxford dictionary");
    expect(
      screen.getByRole("link", { name: "go to source url" })
    ).toHaveAttribute("href", "www.something.com");
  });

  it("shows skeleton while fetching data", async () => {
    render(<IdiomsPage id={"1"} />);

    const skeleton = await document.querySelector(".ant-skeleton");
    expect(skeleton).toBeInTheDocument();
  });

  it("shows breadcrumb", async () => {
    render(<IdiomsPage id={"1"} />);

    await screen.findByTestId("id-page");

    expect(screen.getByRole("link", { name: "hit the sack" })).toHaveAttribute(
      "href",
      "/idioms/1"
    );
  });

  it("handles server error", async () => {
    server.use(
      http.get(`${idiomsUrl}/idioms/:id`, () => {
        return HttpResponse.error();
      })
    );
    render(<IdiomsPage id={"1"} />);
    await screen.findByTestId("error-message");
    expect(screen.getByRole("heading")).toHaveTextContent(
      "Oops! We Couldn't Find That Word"
    );
  });
});
