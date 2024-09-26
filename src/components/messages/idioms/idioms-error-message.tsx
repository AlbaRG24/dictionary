import styles from "./idioms-error-message.module.css";
export const IdiomsErrorMessage = () => {
  return (
    <div className={styles.container} data-testid="error-message">
      <h1>Oops! We couldn't find it!</h1>
      <p>
        We're sorry, but the word you're looking for doesn't seem to be in our
        dictionary. Here are a few things you can try:
      </p>
      <ul>
        <li>
          Check the spelling: Make sure there are no typos in the word you
          entered.{" "}
        </li>
        <li>Try a similar word: Use a synonym or a related term. </li>
        <li>
          Explore our dictionary: Browse our categories or look at our word
          suggestions.
        </li>
      </ul>
    </div>
  );
};
