import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));
export default function App(props) {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Route exact path="/" component={Dashboard} />
      </div>
    </Router>
  );
}
