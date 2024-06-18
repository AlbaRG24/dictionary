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

  const sorted = data.sort((a, b) => {
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

  console.log({ sorted });

  return (
    <div className={styles.container}>
      <List
        className={styles.list}
        size="small"
        bordered
        dataSource={sorted}
        renderItem={(item: Entry, index: number) => {
          return (
            <List.Item className={styles.listItem}>
              <Link href={`/idioms/${index + 1}`}>
                <List.Item.Meta
                  title={<a className={styles.title}>{item.idiom}</a>}
                  description={item.meaning}
                />
              </Link>
            </List.Item>
          );
        }}
      />
    </div>
  );
};
