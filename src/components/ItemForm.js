import React, { useContext } from "react";
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
  const { dispatch, state } = useContext(Context);
  const currentItemId = location.pathname.replace("/edit/", "");
  let name = "",
    description = "";
  if (currentItemId !== "/create") {
    name = state[currentItemId].name;
    description = state[currentItemId].description;
  }
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: name,
    description: description
  });
  const [errors, setErrors] = React.useState({
    name: false,
    description: false
  });

  const handleChange = event => {
    setValues({ ...values, [event.target.id]: event.target.value.toString() });
    setErrors({ name: false, description: false });
  };

  const handleClick = event => {
    console.log(values);
    if (values.name === "") {
      setErrors({ ...errors, name: true });
      return;
    }
    if (values.description === "") {
      setErrors({ ...errors, description: true });
      return;
    }
    if (event.target.textContent === "Adicionar") {
      dispatch({ type: "addItem", payload: values });
    }
    if (event.target.textContent === "Editar") {
      console.log(currentItemId);
      dispatch({
        type: "updateItem",
        payload: {
          ...values,
          id: currentItemId
        }
      });
    }
    history.goBack();
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

      <form className={classes.container} autoComplete="off">
        <div style={{ display: "flex", width: "100%" }}>
          <TextField
            id="name"
            label="Nome"
            error={errors.name}
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
            error={errors.description}
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
    </div>
  );
}
