import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditCircleIcon from "@material-ui/icons/Edit";

import { Context } from "../App";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  toolbar: theme.mixins.toolbar,
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  icon: {
    margin: "auto",
    display: "block"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flex: 1
  },
  title: {
    width: "12rem",
    fonSize: "0.9rem",
    textAlign: "center",
    textTransform: "uppercase"
  }
}));

export default function ItemForm({ history, isCreate, location }) {
  const classes = useStyles();

  const { dispatch, state } = useContext(Context);
  const currentItemId = location.pathname.replace("/edit/", "");
  const [submit, setSubmit] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (!isCreate) {
      const item = state.data.filter(item => item._id === currentItemId)[0];
      setValues({ name: item.name, description: item.description });
    }
  }, [currentItemId, isCreate, state.data]);

  const postData = async () => {
    const url = "http://localhost:8080/api/itens";
    dispatch({ type: "FETCH_INIT" });
    try {
      const result = await axios["post"](url, values, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const { name, description, _id } = result.data;

      if (result.data) {
        dispatch({
          type: "FETCH_SUCCESS",
          payload: [...state.data, { name, description, _id }]
        });
      }
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };

  const editData = async () => {
    const url = "http://localhost:8080/api/itens";
    dispatch({ type: "FETCH_INIT" });
    try {
      const result = await axios["put"](
        url,
        { ...values, id: currentItemId },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (result.data === "success") {
        const filtered = state.data.filter(item => item._id !== currentItemId);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: [...filtered, { ...values, _id: currentItemId }]
        });
      }
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };

  const isValidated = () => {
    if (values.name === "" || values.description === "") return false;
    return true;
  };

  const handleChange = event => {
    setSubmit(false);
    setValues({
      ...values,
      [event.target.id]: event.target.value.toString()
    });
  };

  const handleClick = event => {
    const btnText = event.target.textContent;
    setSubmit(true);
    switch (btnText) {
      case "Adicionar":
        if (isValidated()) {
          postData();
          return history.push("/lista");
        }
        break;
      case "Editar":
        if (isValidated()) {
          editData();
          return history.push("/lista");
        }
        break;
      default:
        history.goBack();
    }
  };

  return (
    <div>
      {isCreate ? (
        <AddCircleIcon
          fontSize="large"
          color="primary"
          className={classes.icon}
        />
      ) : (
        <>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                informaçoes
              </Typography>
              <Typography variant="h6" className={classes.title}>
                Itens
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.toolbar} />
          <EditCircleIcon
            fontSize="large"
            color="primary"
            className={classes.icon}
          />
        </>
      )}
      <h2 style={{ textAlign: "center" }}>
        {isCreate ? "Criar" : "Editar"} Categoria
      </h2>
      {state.isLoading ? (
        <h1>LOADING...</h1>
      ) : (
        <form className={classes.container} autoComplete="off">
          <div style={{ display: "flex", width: "100%" }}>
            <TextField
              id="name"
              label="Nome"
              error={submit && !values.name}
              className={classes.textField}
              value={values.name}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              placeholder="name"
            />
            <TextField
              id="description"
              label="Descrição"
              error={submit && !values.description}
              className={classes.textField}
              value={values.description}
              onChange={handleChange}
              margin="normal"
              variant="outlined"
              required
              placeholder="description"
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between"
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleClick}
            >
              Voltar
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleClick}
            >
              {isCreate ? "Adicionar" : "Editar"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
