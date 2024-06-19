import { Skeleton } from "antd";
import Link from "next/link";
import { Entry, useIdioms } from "../../hooks/useIdioms";
import styles from "./idioms.module.css";
import { List } from "antd";

export const Idioms = () => {
  const { getIdioms } = useIdioms();
  const { data, isLoading, isError } = getIdioms();
  if (isLoading) return <Skeleton />;
  if (isError || !data) return <div>Error</div>;

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

  const renderItem = (item: Entry) => (
    <Link
      href={`/idioms/${item.id}`}
      aria-label={`View details for idiom: ${item.idiom}`}
      passHref
    >
      <List.Item className={styles.listItem}>
        <List.Item.Meta
          title={<a>{item.idiom}</a>}
          description={item.meaning}
        />
      </List.Item>
    </Link>
  );

  return (
    <div className={styles.container}>
      <List
        className={styles.list}
        size="small"
        bordered
        dataSource={alphabeticallySortedIdiomsList}
        renderItem={renderItem}
      />
    </div>
  );
};
