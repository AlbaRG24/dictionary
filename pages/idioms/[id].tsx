import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchIdiomById } from "../../hooks/useIdioms";
import { Breadcrumb, Skeleton } from "antd";
import { useIdioms } from "../../hooks/useIdioms";
import { ErrorMessage } from "../../components/error/error-message";
import { List } from "../../components/list/list";
import styles from "../../styles/idioms/[id].module.css";

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
  const { getIdiomById } = useIdioms();
  const { data, isLoading, isError } = getIdiomById(id);
  const { idiom, meaning, origin, examples, synonyms, source, author } = data;
  if (isLoading) return <Skeleton />;
  if (isError || !data) return <ErrorMessage />;

  const breadcrumbItems = [
    {
      title: <a href="/">Search</a>,
    },
    { title: <a href="/idioms">A-Z</a> },
    { title: <a href={`/idioms/${id}`}>{idiom}</a> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
      <div className={styles.container}>
        <h1>{idiom}</h1>
        <p>{meaning}</p>
        <h2>Origin</h2>
        <p>{origin}</p>
        <h2>Examples</h2>
        <List list={examples} />
        <h2>Synonyms</h2>
        <List list={synonyms} />
        <h2>Source</h2>
        <p>{source}</p>
        <small>{author}</small>
      </div>
    </>
  );
};

export default IdiomPage;
