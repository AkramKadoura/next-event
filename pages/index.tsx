import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { Box } from "@mui/material";
import { Card } from "../components/Card";
import { EventSchema, useEventStorage } from "../lib/eventsStorage";
import "react-widgets/styles.css";
import Multiselect from "react-widgets/Multiselect";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { GetStaticProps, NextPage } from "next";

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default function Home(props: any) {
  const { Events } = useEventStorage();
  const { data } = props;

  // const fetcher = (apiURL: string) => fetch(apiURL).then((res) => res.json());
  // const { data, error } = useSWR(process.env.NEXT_PUBLIC_API_URL, fetcher);

  const [filteredData, setFilteredData] = useState([]);

  // if (error) return <div>Error occured...</div>;
  // if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>NextEvent App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar page="main" />
        <Multiselect
          dataKey="id"
          textField="id"
          placeholder="Filter events by event ID"
          defaultValue={[0]}
          data={data}
          value={filteredData}
          onChange={(value: any) => setFilteredData(value)}
        />

        <Box
          display="grid"
          gap={4}
          sx={{
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
            },
            padding: "2rem",
          }}
        >
          {filteredData.length > 0
            ? filteredData.map(
                (item: { id: number; title: string }, idx: number) => (
                  <Card key={item.id} title={item.title} id={item.id} />
                )
              )
            : data.map((item: { id: number; title: string }, idx: number) => (
                <Card key={item.id} title={item.title} id={item.id} />
              ))}
        </Box>
      </main>
    </div>
  );
}
