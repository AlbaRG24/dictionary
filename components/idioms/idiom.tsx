import React from "react";
import styles from "../../styles/idiom.module.css";
import { Skeleton } from "antd";
import { useIdioms } from "../../hooks/useIdioms";
import { ErrorMessage } from "../error-message";

type IdiomProps = {
  id: string
}

const Idiom: React.FC<IdiomProps> = ({ id }) => {
  const { getIdiomById } = useIdioms();
  const { data, isLoading, isError } = getIdiomById(id);
  const { title, definition, origin, examples, synonyms, source, author } =
    data;
  if (isLoading) return <Skeleton />;
  if (isError || !data) return <ErrorMessage />;

  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <h3>{definition}</h3>
      <h2>Origin</h2>
      <p>{origin}</p>
      <h2>Examples</h2>
      {examples ? (
        <ul>
          {examples?.map((example, index) => (
            <li key={index + 1}>{example}</li>
          ))}
        </ul>
      ) : (
        <p>No examples available</p>
      )}
      <h2>Synonyms</h2>
      {synonyms ? (
        <ul>
          {synonyms?.map((synonym, index) => (
            <li key={index + 1}>{synonym}</li>
          ))}
        </ul>
      ) : (
        <p>No synonyms available</p>
      )}
      <h3>Source</h3>
      <p>{source}</p>
      <small>{author}</small>
    </div>
  );
};
export default Idiom;
