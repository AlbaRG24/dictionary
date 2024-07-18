import { GetServerSideProps } from "next";
import React from "react";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import styles from "../../styles/idioms/index.module.css";
import Idioms from "../../components/idioms/idioms";
import { useIdioms } from "../../hooks/useIdioms";

export const getServerSideProps: GetServerSideProps = async () => {
  const { fetchIdioms } = useIdioms();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["idioms"],
    queryFn: fetchIdioms,
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function IdiomsPage() {
  const breadcrumbItems = [
    {
      title: <a href="/">Search</a>,
    },
    { title: <a href="/idioms">A-Z</a> },
  ];
  return (
    <main>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb}/>
      <Idioms />
    </main>
  );
}
