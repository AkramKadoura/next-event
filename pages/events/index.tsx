import { Box, Button, Typography } from "@mui/material";
import styles from "../../styles/Home.module.css";
import { Card } from "../../components/Card";
import { useEventStorage } from "../../lib/eventsStorage";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import Head from "next/head";
import Navbar from "../../components/Navbar";

export default function Events() {
  const { Events, resetEvents } = useEventStorage();

  return (
    <div className={styles.container}>
      <Head>
        <title>NextEvent App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar page="events" />
        {Events.length > 0 ? (
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
            {Events.map((item: { id: number; title: string }, idx: number) => (
              <Card key={item.id} title={item.title} id={item.id} />
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              color: "#0E2F44",
              marginTop: "5rem",
              padding: "0 1rem",
            }}
          >
            <Typography align="center" sx={{ fontSize: "2rem" }}>
              You have no favorite events!
            </Typography>
            <SentimentVeryDissatisfiedIcon sx={{ fontSize: "2rem" }} />
          </Box>
        )}
      </main>
    </div>
  );
}
