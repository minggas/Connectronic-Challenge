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
    gridArea: "card1"
  },
  card2: {
    gridArea: "card2"
  },
  card3: {
    gridArea: "card3"
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Card className={classes.card1}>construção</Card>
      <Card className={classes.card2}>construção</Card>
      <Card className={classes.card3}>construção</Card>
    </div>
  );
}
