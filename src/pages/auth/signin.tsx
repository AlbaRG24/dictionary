import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import styles from "../../styles/signin/signin.module.css";
import SignInButton from "../../components/sign-in-button/sign-in-button";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div className={styles.container}>
          <div key={provider.name} className={styles.left}>
            <p className={styles.paragraph}>
              "Language is the road map of a culture. It tells you where its
              people come from and where they are going." – Rita Mae Brown
            </p>
          </div>
          <div key={provider.name} className={styles.right}>
            <h1>Your Knowledge Matters</h1>
            <h4>Sign-in to contribute</h4>
            <SignInButton id={provider.id as string} />
          </div>
        </div>
      ))}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
