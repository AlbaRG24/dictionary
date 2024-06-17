import React from "react";
import { GetServerSideProps } from "next";
import Idiom from "../../components/idioms/idiom";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchIdiomById } from "../../hooks/useIdioms";

type Idiom = {
  id: string;
  title: string;
  definition: string;
  origin?: string;
  examples: string[];
  synonyms?: string[];
  source: string;
  author: string;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const { id } = context.params;
  await queryClient.prefetchQuery(["idiomById", id], () =>
    fetchIdiomById(id as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

const IdiomPage = ({ id }: { id: string }) => {
  return <Idiom id={id} />;
};

export default IdiomPage;
