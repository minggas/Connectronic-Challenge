import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./views/Layout";
export default function App(props) {
  return (
    <Router>
      <Layout items={4}>
        <Route exact path="/" component={Dashboard} />
      </Layout>
    </Router>
  );
}
