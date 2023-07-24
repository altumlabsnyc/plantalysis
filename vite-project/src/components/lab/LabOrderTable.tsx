import { Alert, AlertColor, CssBaseline, Snackbar } from "@mui/material"
import React from "react"
import { claimNewOrders } from "../Authentication"
import { CLAIMED, LabOrderTableRow, NOT_CLAIMED } from "../UserTypes"

import { Page } from "./regulator/Page"
import { Table } from "./regulator/Table"
import { PersonData } from "./regulator/utils"

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
] //.flatMap((c:any)=>c.columns) // remove comment to drop header groups

interface TableProps {
  labOrders: LabOrderTableRow[]
  showClaimed: boolean
}

export default function LabOrderTable({ labOrders, showClaimed }: TableProps) {
  // const { labOrders } = props;

  const [data, setData] = React.useState(labOrders)
  React.useEffect(() => {
    if (labOrders) {
      setData(labOrders)
    }
  }, [labOrders])

  const [selectedRows, setSelectedRows] = React.useState([])

  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false)
  const [snackBarMessage, setSnackBarMessage] = React.useState("")
  const [snackBarSeverity, setSnackBarSeverity] =
    React.useState<AlertColor>("info")
  const [isSendingClaimRequest, setIsSendingClaimRequest] =
    React.useState(false)

  const handleSnackBarClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return
    }

    setIsSnackBarOpen(false)
  }

  const onStartClaimRequest = function () {
    setIsSendingClaimRequest(true)
    setIsSnackBarOpen(true)
    setSnackBarSeverity("info")
    setSnackBarMessage("Claiming orders...")
  }

  const onClaimSuccess = function () {
    setIsSendingClaimRequest(false)
    setIsSnackBarOpen(true)
    setSnackBarSeverity("success")
    setSnackBarMessage("Successfully claimed orders!")
  }

  const onClaim = function () {
    if (isSendingClaimRequest) return
    const order_ids = selectedRows
      .map((e) => e.original)
      .filter((e) => e.status == NOT_CLAIMED)
      .map((e) => e.id)

    onStartClaimRequest()

    claimNewOrders(order_ids).then(() => {
      onClaimSuccess()
      // set order's to claimed
      const new_data = data.map((e) => {
        if (e.status == NOT_CLAIMED) {
          e.status = order_ids.includes(e.id) ? CLAIMED : NOT_CLAIMED
        }
        return e
      })
      setData(new_data)
      window.location.reload()
    })
  }
  const onSelectionChange = function (a) {
    setSelectedRows(a.selectedFlatRows)
    // console.log(a.selectedFlatRows)
  }

  return (
    <Page>
      <CssBaseline />
      {showClaimed && (
        <Table<PersonData>
          name={"testTable"}
          columns={columns}
          data={data}
          onSelectionChange={onSelectionChange}
          onClaim={onClaim}
        />
      )}
      {!showClaimed && (
        <Table<PersonData>
          name={"testTable"}
          columns={columns}
          data={data}
          // onSelectionChange={onSelectionChange}
        />
      )}
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snackBarSeverity}>{snackBarMessage}</Alert>
      </Snackbar>
    </Page>
  )
}

// export default LabOrderTable;
