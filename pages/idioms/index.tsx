import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchIdioms } from "../../hooks/useIdioms";
import { Idioms } from "../../components/idioms/idioms";
import { Breadcrumb } from "antd";
import styles from "../../styles/idioms/index.module.css"

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
  const breadcrumbItems = [
    {
      title: <a href="/">Search</a>,
    },
    { title: <a href="/idioms">A-Z</a> },
  ];
  return (
    <>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb}/>
      <Idioms />
    </>
  );
};

export default IdiomsPage;
