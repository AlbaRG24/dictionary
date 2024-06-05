import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../components/layout/layout";
import { Divider, Input } from "antd";
import styles from "../styles/idioms/index.module.css";

const HomePage: React.FC<Response> = (props) => {
  const { Search } = Input
  return (
    <Layout>
      <main>
        <section className={styles.searchBlock}>
          <h1>Slangopedia</h1>
          <div className={styles.search}>
            <Search placeholder="Search" />
          </div>
        </section>
        <section className={styles.intro}>
          <p>
            Slangopedia is a community-driven dictionary of expressions and
            slang.
            <br />
            Discover the colorful world of expressions and slang, crafted and
            curated by people just like you.
          </p>
        </section>
        <section className={`${styles.block} ${styles.idiomOfTheDay}`}>
          <div className={styles.headings}>
            <h2>Idiom of the day</h2>
            <a href="#" className={styles.viewAll}>
              View all
            </a>
          </div>
          <div className={styles.content}>
            <h3>Hit the sack</h3>
            <p>Go to sleep</p>
          </div>
        </section>
        <Divider></Divider>
        <section className={`${styles.block} ${styles.recentSearches}`}>
          <div className={styles.headings}>
            <h2>Recent searches</h2>
            <a href="#" className={styles.viewAll}>
              View all
            </a>
          </div>
          <div className={styles.content}>
            <p>Recent search 1</p>
            <p>Recent search 2</p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
