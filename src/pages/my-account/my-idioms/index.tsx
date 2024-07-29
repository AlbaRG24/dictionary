import { Breadcrumb, Skeleton } from "antd";
import { useSession } from "next-auth/react";
import styles from "../../../styles/my-account/my-idioms/index.module.css";
import { IdiomsErrorMessage } from "../../../components/messages/idioms/idioms-error-message";
import { useIdioms } from "../../../hooks/useIdioms";
import Link from "next/link";

export default function MyIdioms() {
  const { data: session } = useSession();
  const { getIdioms } = useIdioms();
  const { data, isPending, isError } = getIdioms();
  if (isPending) return <Skeleton />;
  if (isError || !data) return <IdiomsErrorMessage />;

  const breadcrumbItems = [
    {
      title: <a href="/">Home</a>,
    },
    { title: <a href="/my-account">My account</a> },
    { title: <a href="/my-account/my-idioms">My idioms</a> },
  ];

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
      <div>
        <ul>
          {data
            .filter((entry) => entry.author === session?.user?.name)
            .map((entry) => (
              <li>
                <Link href={`/idioms/${entry.id}`}>{entry.idiom}</Link>
              </li>
            ))}
        </ul>
      </div>
    </main>
  );
}
