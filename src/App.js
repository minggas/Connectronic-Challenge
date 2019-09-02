import React, { createContext, useReducer, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

//Components
import Dashboard from "./views/Dashboard";
import ItemForm from "./components/ItemForm";
import ItemList from "./views/ItemList";
import Layout from "./views/Layout";

//Custom Hooks
import { dataFetchReducer } from "./hooks/useItemReducer";

export const Context = createContext();

export default function App() {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: []
  });

  useEffect(() => {
    const url = "http://localhost:8080/api/itens";

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios(url);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE" });
      }
    };
    fetchData();
  }, []);
  return (
    <Router>
      <Context.Provider value={{ dispatch, state }}>
        <Layout items={state.data.length}>
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
