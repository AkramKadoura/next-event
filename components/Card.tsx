import { Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { useEventStorage } from "../lib/eventsStorage";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export type EventProps = {
  id: number;
  title: string;
};

export const Card: FC<EventProps> = (props) => {
  const { id, title } = props;
  const { addEvent, removeEvent, Events } = useEventStorage();
  const likedEvent = Events.filter((item) => item.id === id);
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={6}
      lg={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#20B2AA",
        height: "10rem",
        borderRadius: "5px",
        padding: "1rme",
        "&:hover": {
          color: "#fff",
          backgroundColor: "#0E2F44",
        },
      }}
    >
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Typography variant="caption" align="center">
        {id}
      </Typography>
      {likedEvent.length > 0 ? (
        <FavoriteIcon
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => removeEvent({ title, id })}
        />
      ) : (
        <FavoriteBorderIcon
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => addEvent({ title, id })}
        />
      )}
    </Grid>
  );
};
