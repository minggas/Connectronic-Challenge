import React, { useContext } from "react";
import { Button, Paper, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";

import { Context } from "../App";
import DeleteDialog from "../components/DeleteDialog";

export default function MaterialTableDemo({ history }) {
  const { dispatch, state: items } = useContext(Context);
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

  function handleClose(event) {
    const btnType = event.target.textContent;
    if (btnType === "Apagar") {
      dispatch({ type: "deleteItem", payload: selectedItem });
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
      <MaterialTable
        title="Categorias"
        columns={tableHead.columns}
        data={items}
        actions={[
          {
            icon: "edit",
            tooltip: "Editar Item ",
            onClick: (event, rowData) => {
              const id = rowData.tableData.id;
              history.push(`/edit/${id}`);
            }
          },
          {
            icon: "delete",
            tooltip: "Apagar Item",
            onClick: (event, rowData) => {
              setSelectedItem(rowData.tableData.id);
              handleClickOpen();
            }
          }
        ]}
        options={{
          actionsColumnIndex: -1
        }}
      />
      <DeleteDialog open={open} handleClose={handleClose} />
    </Paper>
  );
}
