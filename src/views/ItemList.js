import React, { useContext } from "react";
import axios from "axios";
import { Button, Paper, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

import { Context } from "../App";
import DeleteDialog from "../components/DeleteDialog";

export default function MaterialTableDemo({ history }) {
  const { dispatch, state } = useContext(Context);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const tableHead = {
    columns: [
      { title: "Nome", field: "name" },
      { title: "Descrição", field: "description" }
    ]
  };

  function handleClickOpen() {
    setOpen(true);
  }

  const deleteData = async () => {
    const url = "http://localhost:8080/api/itens";
    dispatch({ type: "FETCH_INIT" });
    try {
      const result = await axios["delete"](url, {
        data: { id: selectedItem }
      });
      if (result.data) {
        const filtered = state.data.filter(item => item._id !== selectedItem);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: filtered
        });
      }
    } catch (error) {
      dispatch({ type: "FETCH_FAILURE" });
    }
  };

  function handleClose(event) {
    const btnType = event.target.textContent;
    if (btnType === "Apagar") {
      deleteData();
    }
    setOpen(false);
  }

  return (
    <Paper style={{ padding: "2.4rem 1rem 1rem 1rem" }}>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-end"
        direction="row"
      >
        <Button
          component={Link}
          to="/create"
          variant="outlined"
          color="primary"
        >
          Adicionar <AddIcon />
        </Button>
      </Grid>
      {state.isLoading ? (
        <h1>LOADING.....</h1>
      ) : (
        <MaterialTable
          title="Categorias"
          columns={tableHead.columns}
          data={state.data}
          actions={[
            {
              icon: "edit",
              tooltip: "Editar Item ",
              onClick: (event, rowData) => {
                const id = rowData._id;
                history.push(`/edit/${id}`);
              }
            },
            {
              icon: "delete",
              tooltip: "Apagar Item",
              onClick: (event, rowData) => {
                setSelectedItem(rowData._id);
                handleClickOpen();
              }
            }
          ]}
          options={{
            actionsColumnIndex: -1
          }}
        />
      )}
      <DeleteDialog open={open} handleClose={handleClose} />
    </Paper>
  );
}
