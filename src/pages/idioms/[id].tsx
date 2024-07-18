import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Breadcrumb, Skeleton } from "antd";
import { ErrorMessage } from "../../components/error/error-message";
import styles from "../../styles/idioms/[id].module.css";
import { Synonym, useIdioms } from "../../hooks/useIdioms";

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
    <main>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
      <div className={styles.container} data-testid="id-page">
        <h1>{idiom}</h1>
        <div className={styles.gridContainer}>
          <section className={`${styles.block}`}>
            <h3>Meaning and use</h3>
            <p aria-label="meaning">{meaning}</p>
            <ul>
              {examples?.map((item: string, index: number) => (
                <li key={index + 1} aria-label="example of use">
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className={`${styles.block} `}>
            <h3>Ethimology</h3>
            <p aria-label="ethimology">{origin}</p>
          </section>
          <section className={`${styles.block}`}>
            <h3>Looking for synonyms?</h3>
            <ul className={styles.synonyms}>
              {synonyms?.map((item: Synonym, index: number) => {
                return (
                  <li key={index + 1} className={styles.listItem}>
                    <a
                      href={item.url}
                      className={styles.url}
                      aria-label="go to meaning of synonym"
                    >
                      {item.word}
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
        <small>
          From{" "}
          <a
            href={source.url}
            className={styles.url}
            aria-label="go to source url"
          >
            {source.name}
          </a>
        </small>
        <br />
        <small>Added by {author}</small>
      </div>
    </main>
  );
}
