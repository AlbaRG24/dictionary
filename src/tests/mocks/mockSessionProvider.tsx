import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode, FC } from "react";

interface MockSessionProviderProps {
  children: ReactNode;
  session: Session;
}

const MockSessionProvider: FC<MockSessionProviderProps> = ({
  children,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default MockSessionProvider;
