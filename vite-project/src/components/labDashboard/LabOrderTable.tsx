import {
  Button,
  CssBaseline,
  InputLabel,
  MenuItem,
  TextField,
} from "@material-ui/core";
import { Alert, Snackbar } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  CellProps,
  FilterProps,
  FilterValue,
  IdType,
  Row,
  TableInstance,
} from "react-table";
import { claimNewOrders } from "../Authentication";
import { LabOrder } from "../UserTypes";

import { Page } from "./regulator/Page";
import { Table } from "./regulator/Table";
import { PersonData, makeData } from "./regulator/utils";

const columns = [
  {
    Header: "Order ID",
    accessor: "id",
  },
  {
    Header: "Pickup Location",
    accessor: "location",
  },
  {
    Header: "Info",
    accessor: "strain_info",
  },
  {
    Header: "Status",
    accessor: "status",
  },
]; //.flatMap((c:any)=>c.columns) // remove comment to drop header groups

const LabOrderTable: React.FC = (props) => {
  const { labOrders } = props;

  const [data, setData] = React.useState(labOrders);
  React.useEffect(() => {
    if (labOrders) {
      setData(labOrders);
    }
  }, [labOrders]);

  const [selectedRows, setSelectedRows] = React.useState([]);

  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");
  const [snackBarSeverity, setSnackBarSeverity] = React.useState("info");
  const [isSendingClaimRequest, setIsSendingClaimRequest] =
    React.useState(false);

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsSnackBarOpen(false);
  };

  const onStartClaimRequest = function () {
    setIsSendingClaimRequest(true);
    setIsSnackBarOpen(true);
    setSnackBarSeverity("info");
    setSnackBarMessage("Claiming orders...");
  };

  const onClaimSuccess = function () {
    setIsSendingClaimRequest(false);
    setIsSnackBarOpen(true);
    setSnackBarSeverity("success");
    setSnackBarMessage("Successfully claimed orders!");
  };

  const onClaim = function () {
    if (isSendingClaimRequest) return;
    const order_ids = selectedRows
      .map((e) => e.original)
      .filter((e) => e.status == "Not Claimed")
      .map((e) => e.id);

    onStartClaimRequest();

    claimNewOrders(order_ids).then(() => {
      onClaimSuccess();
      // set order's to claimed
      const new_data = data.map((e) => {
        if (e.status == "Not Claimed") {
          e.status = order_ids.includes(e.id) ? "Claimed" : "Not Claimed";
        }
        return e;
      });
      setData(new_data);
    });
  };
  const onSelectionChange = function (a) {
    setSelectedRows(a.selectedFlatRows);
    // console.log(a.selectedFlatRows)
  };

  const dummy = useCallback(
    (instance: TableInstance<PersonData>) => () => {
      console.log(
        "Selected",
        instance.selectedFlatRows
          .map((v) => `'${v.original.firstName} ${v.original.lastName}'`)
          .join(", ")
      );
    },
    []
  );

  return (
    <Page>
      <CssBaseline />
      <Table<PersonData>
        name={"testTable"}
        columns={columns}
        data={data}
        onSelectionChange={onSelectionChange}
        onClaim={onClaim}
      />
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackBarSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
    </Page>
  );
};

export default LabOrderTable;
