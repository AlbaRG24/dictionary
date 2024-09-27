import { Breadcrumb } from "antd";
import styles from "../../styles/my-account/index.module.css";
import { useSession } from "next-auth/react";
import {
  BulbFilled,
  EditFilled,
  HeartFilled,
  RightOutlined,
  setTwoToneColor,
} from "@ant-design/icons";
import Link from "next/link";

export default function MyAccount() {
  const { data: session } = useSession();
  const breadcrumbItems = [
    {
      title: <a href="/">Home</a>,
    },
    { title: <a href="/my-account">My account</a> },
  ];
  setTwoToneColor("#164773");

  return (
    <main>
      <Breadcrumb items={breadcrumbItems} className={styles.breadcrumb} />
      <div className={styles.personalDetailsSummary}>
        {session?.user?.image ? (
          <img src={session?.user?.image} className={styles.profileImage} />
        ) : (
          <div className={styles.profileImagePlaceholder}>
            {session?.user?.name?.charAt(0)}
          </div>
        )}
        <div className={styles.nameAndEmailContainer}>
          <h4 className={styles.userName}>{session?.user?.name}</h4>
          <small className={styles.userEmail}> {session?.user?.email}</small>
        </div>
      </div>
      <div className={styles.linkContainer}>
        <div className={styles.linkWithIcon}>
          <EditFilled className={styles.icon} />
          <p>Personal details</p>
        </div>
        <RightOutlined className={styles.icon} />
      </div>
      <div className={styles.linkContainer}>
        <div className={styles.linkWithIcon}>
          <BulbFilled className={styles.icon} />
          <Link href="/my-account/my-idioms">My idioms</Link>
        </div>
        <RightOutlined className={styles.icon} />
      </div>
      <div className={styles.linkContainer}>
        <div className={styles.linkWithIcon}>
          <HeartFilled className={styles.icon} />
          <p>Favourites</p>
        </div>
        <RightOutlined className={styles.icon} />
      </div>
    </main>
  );
}
