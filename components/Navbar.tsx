import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React, { FC } from "react";
import { useEventStorage } from "../lib/eventsStorage";

type NavbarProps = {
  page: "main" | "events";
};

const Navbar: FC<NavbarProps> = (props) => {
  const { page } = props;
  const { Events, resetEvents } = useEventStorage();

  const handleResetEvents = () => {
    resetEvents();
    useEventStorage.persist.clearStorage();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "2rem 1rem",
      }}
    >
      <Link href="/">
        <Typography variant="h4" sx={{ cursor: "pointer" }}>
          NextEvent
        </Typography>
      </Link>
      {page === "main" ? (
        <Link href="/events">
          <Button
            variant="contained"
            sx={{
              textTransform: "capitalize",
              backgroundColor: "#0E2F44",
              "&:hover": { backgroundColor: "#20B2AA", color: "#0E2F44" },
            }}
          >
            Favorite Events
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#0E2F44",
            "&:hover": { backgroundColor: "#20B2AA", color: "#0E2F44" },
          }}
          onClick={handleResetEvents}
        >
          Delete All
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
