import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchIdioms } from "../../hooks/useIdioms";
import { Idioms } from "../../components/idioms/idioms";

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["idioms"], fetchIdioms);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const IdiomsPage = () => {
  return <Idioms />
};

export default IdiomsPage;
