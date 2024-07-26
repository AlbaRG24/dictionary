import { beforeEach, describe, expect, it, Mock } from "vitest";
import { act, render, screen } from "../../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import { Nav } from "./nav";
import { signIn, signOut, useSession } from "next-auth/react";
import { vi } from "vitest";
import { useRouter } from "next/router";
import MockSessionProvider from "../../../tests/mocks/mockSessionProvider";
import { Session } from "next-auth";

beforeEach(() => {
  setupMocks();
});

describe("#nav", () => {
  it("show user icon if user is signed out", () => {
    const session: Session = {
      expires: "",
    };
    (useSession as Mock).mockImplementation(() => ({
      data: null,
    }));

    render(
      <MockSessionProvider session={session}>
        <Nav />
      </MockSessionProvider>
    );

    expect(screen.getByRole("button", { name: "user" })).toBeInTheDocument();
  });

  it("show my account link if user is signed in", () => {
    const image = "user profile image";
    const session = createSession(image);
    useSessionMockReturnValue(image);

    render(
      <MockSessionProvider session={session}>
        <Nav />
      </MockSessionProvider>
    );

    expect(
      screen.getByRole("link", { name: "link to my account" })
    ).toHaveAttribute("href", "/my-account");
  });

  it("show user profile image if it exists", () => {
    const image = "user profile image";
    const session = createSession(image);
    useSessionMockReturnValue(image);

    render(
      <MockSessionProvider session={session}>
        <Nav />
      </MockSessionProvider>
    );

    expect(
      screen.getByRole("img", { name: "user profile image" })
    ).toHaveAttribute("src", "user profile image");
  });

  it("show user profile image placeholder if it user image does not exist", () => {
    const session = createSession(null);
    useSessionMockReturnValue(null);

    render(
      <MockSessionProvider session={session}>
        <Nav />
      </MockSessionProvider>
    );
    expect(
      screen.getByLabelText("user profile image placeholder")
    ).toBeInTheDocument();
  });
  it("calls signIn when user icon is clicked and user is not signed in", async () => {
    const session: Session = {
      expires: "",
    };
    (useSession as Mock).mockImplementation(() => ({
      data: null,
    }));

    render(
      <MockSessionProvider session={session}>
        <Nav />
      </MockSessionProvider>
    );

    const user = userEvent.setup();
    const userIcon = screen.getByRole("button", { name: /user/i });

    await act(async () => {
      await user.click(userIcon);
    });

    expect(signIn).toHaveBeenCalled();
  });
  it("calls signOut when user is signed in", async () => {
    const image = "user profile image";
    const session = createSession(image);
    useSessionMockReturnValue(image);

    render(
      <MockSessionProvider session={session}>
        <Nav />
      </MockSessionProvider>
    );

    const user = userEvent.setup();
    const signOutButton = screen.getByRole("link", { name: /sign out/i });

    await act(async () => {
      await user.click(signOutButton);
    });

    expect(signOut).toHaveBeenCalled();
  });
});

function setupMocks() {
  // Mock next-auth/react module
  vi.mock("next-auth/react", async () => {
    const actual = await vi.importActual("next-auth/react");
    return {
      ...actual,
      useSession: vi.fn(),
      signIn: vi.fn(),
      signOut: vi.fn(),
    };
  });

  // Mock next/router module
  vi.mock("next/router", () => ({
    useRouter: vi.fn(),
  }));

  const pushMock = vi.fn();
  (useRouter as Mock).mockReturnValue({
    push: pushMock,
    prefetch: vi.fn(() => Promise.resolve()),
  });
}

function createSession(image: string | null): Session {
  return {
    user: {
      name: "user",
      email: "userEmail@gmail.com",
      image: image,
    },
    expires: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // Mock expires property
  };
}
function useSessionMockReturnValue(image: string | null) {
  return (useSession as Mock).mockReturnValue({
    data: {
      user: {
        name: "an user",
        email: "anuser@gmail.com",
        image: image,
      },
      expires: "2024-08-18T08:56:22.226Z",
    },
  });
}
