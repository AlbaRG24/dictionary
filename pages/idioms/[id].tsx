import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Breadcrumb, Skeleton } from "antd";
import { ErrorMessage } from "../../components/error/error-message";
import { List } from "../../components/list/list";
import styles from "../../styles/idioms/[id].module.css";
import { useIdioms } from "../../hooks/useIdioms";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fetchIdiomById } = useIdioms();
  const id = context?.params?.id as string;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["idiomById"],
    queryFn: () => fetchIdiomById(id),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      id,
    },
  };
};

export default function IdiomsPage({ id }: { id: string }) {
  const { getIdiomById } = useIdioms();
  const { data, isPending, isError } = getIdiomById(id);
  if (isPending) return <Skeleton />;
  if (isError || !data) return <ErrorMessage />;
  const { idiom, meaning, origin, examples, synonyms, source, author } = data;

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
        <small className={styles.smallText}>Added by {author}</small>
      </div>
    </>
  );
}
