import React, { createContext, useReducer } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Components
import Dashboard from "./views/Dashboard";
import ItemForm from "./components/ItemForm";
import ItemList from "./views/ItemList";
import Layout from "./views/Layout";

//Custom Hooks
import useItemReducer from "./hooks/useItemReducer";

export const Context = createContext();

export default function App() {
  const [state, dispatch] = useReducer(useItemReducer, []);
  return (
    <Router>
      <Context.Provider value={{ dispatch, state }}>
        <Layout items={state.length}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/lista" component={ItemList} />
          <Route
            path="/create"
            render={props => <ItemForm {...props} isCreate={true} />}
          />
          <Route
            path="/edit/:id"
            render={props => <ItemForm {...props} isCreate={false} />}
          />
        </Layout>
      </Context.Provider>
    </Router>
  );
}
