import { Skeleton } from "antd";
import Link from "next/link";
import { useIdioms } from "../../hooks/useIdioms";

export const Idioms = () => {
  const { getIdioms } = useIdioms();
  const { data, isLoading, isError } = getIdioms();
  if (isLoading) return <Skeleton />;
  if (isError || !data) return <div>Error</div>;
  return (
    <ul>
      {data?.map(({ id, title }) => {
        return (
          <li key={id}>
            <Link href={`/idioms/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
