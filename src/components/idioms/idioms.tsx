import Link from "next/link";
import { Entry, useIdioms } from "../../hooks/useIdioms";
import styles from "./idioms.module.css";
import React from "react";
import { Skeleton } from "antd";
import { ErrorMessage } from "../error/error-message";

export default function Idioms() {
  const { getIdioms } = useIdioms();
  const { data, isPending, isError } = getIdioms();
  if (isPending) return <Skeleton />;
  if (isError || !data) return <ErrorMessage />;

  const alphabeticallySortedIdiomsList = data.sort((a, b) => {
    const idiomA = a.idiom.toLowerCase();
    const idiomB = b.idiom.toLowerCase();

    if (idiomA < idiomB) {
      return -1;
    }
    if (idiomA > idiomB) {
      return 1;
    }
    return 0;
  });

  const getFirstLetters = () => {
    const abc = new Set<string>();
    data.map((item) => {
      const firstLetter: string = item.idiom.charAt(0);
      abc.add(firstLetter);
    });
    return abc;
  };

  const groupEntriesByFirstLetter = () => {
    const abc = getFirstLetters();
    const groupByFirstLetter = new Map<string, Set<Entry>>();
    abc.forEach((letter) => {
      const group = new Set<Entry>();
      alphabeticallySortedIdiomsList.map((entry) => {
        entry.idiom.startsWith(letter) ? group.add(entry) : null;
        groupByFirstLetter.set(letter, group);
      });
    });
    return groupByFirstLetter;
  };

  const groups = Array.from(groupEntriesByFirstLetter());

  return (
    <div className={styles.container}>
      <ul>
        {groups.map(([letter, entries], index) => (
          <li key={index} className={styles.list}>
            <h3 key={index}>{letter}</h3>
            {Array.from(entries).map((entry) => (
              <Link
                key={entry.id}
                href={`/idioms/${entry.id}`}
                aria-label={`View details for idiom: ${entry.idiom}`}
                className={styles.url}
              >
                <p aria-label="idiom">{entry.idiom}</p>
              </Link>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
