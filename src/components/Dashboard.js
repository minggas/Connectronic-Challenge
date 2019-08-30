import React from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "4fr 1fr",
    gridTemplateAreas: '"card1 card1 card1 card2" "card3 card3 card3 card3"',
    gridGap: "20px",
    width: "100%",
    height: "300px"
  },

  card1: {
    gridArea: "card1",
    padding: "1rem"
  },
  card2: {
    gridArea: "card2",
    padding: "1rem"
  },
  card3: {
    gridArea: "card3",
    padding: "1rem"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const cards = ["card1", "card2", "card3"];
  return (
    <div className={classes.root}>
      {cards.map((tag, idx) => (
        <Card key={idx} className={classes[tag]}>
          construção
        </Card>
      ))}
    </div>
  );
}
