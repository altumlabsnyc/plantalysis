import { Button, CssBaseline, InputLabel, MenuItem, TextField } from '@material-ui/core'
import { Alert, AlertColor, Snackbar } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { CellProps, FilterProps, FilterValue, IdType, Row, TableInstance } from 'react-table'
import { approveOrders, claimNewOrders } from '../Authentication'
import { AnalysisTableRow, APPROVED, LabOrder, LabOrderTableRow, NOT_APPROVED } from '../UserTypes'

import { Page } from './regulator/Page'
import { Table } from './regulator/Table'
import { PersonData, makeData } from './regulator/utils'

const columns = [
    {
        Header: 'Analysis ID',
        accessor: 'analysis_id'
    },
    {
        Header: 'Passed',
        accessor: 'pass'
    },
    {
        Header: 'Brand',
        accessor: 'brand_name'
    },
    {
        Header: 'Lab',
        accessor: 'lab_name'
    },
    {
        Header: 'Status',
        accessor: 'status'
    }
] //.flatMap((c:any)=>c.columns) // remove comment to drop header groups

const AnalysisTable: React.FC<{analysis: AnalysisTableRow[]}> = ({analysis}) => {

  const [data, setData] = React.useState(analysis)
  React.useEffect(() => {
    if (analysis) {
        setData(analysis);
    }
  }, [analysis])

  const [selectedRows, setSelectedRows] = React.useState([])
  
  const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false)
  const [snackBarMessage, setSnackBarMessage] = React.useState('')
  const [snackBarSeverity, setSnackBarSeverity] = React.useState<AlertColor>('info')
  const [isSendingClaimRequest, setIsSendingClaimRequest] = React.useState(false)
  
  const handleSnackBarClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsSnackBarOpen(false);
  }

  const onStartClaimRequest = function() {
    setIsSendingClaimRequest(true)
    setIsSnackBarOpen(true)
    setSnackBarSeverity('info')
    setSnackBarMessage('Claiming orders...')
  }

  const onClaimSuccess = function() {
    setIsSendingClaimRequest(false)
    setIsSnackBarOpen(true)
    setSnackBarSeverity('success')
    setSnackBarMessage('Successfully claimed orders!')
  }

  const onApprove = function() {
    if(isSendingClaimRequest) return
    const analysis_ids = selectedRows
        .map(e => e.original)
        .filter(e => e.status == NOT_APPROVED)
        .map(e => e.analysis_id)

    onStartClaimRequest()

    approveOrders(analysis_ids)
        .then(() => {
            onClaimSuccess()
            // set order's to claimed
            const new_data = data.map(e => {
                if(e.status == 'Not Approved') {
                    e.status = analysis_ids.includes(e.analysis_id)
                                    ? APPROVED : NOT_APPROVED
                }
                return e
            })
            setData(new_data)
        })
  }
  const onSelectionChange = function(a) {
    setSelectedRows(a.selectedFlatRows)
    // console.log(a.selectedFlatRows)
  }

  return (
    <Page>

      <CssBaseline />
      <Table<PersonData>
        name={'testTable'}
        columns={columns}
        data={data}
        onSelectionChange={onSelectionChange}
        onApprove={onApprove}
      />
      <Snackbar
        open={isSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackBarSeverity}>
            {snackBarMessage}
        </Alert>
      </Snackbar>
    </Page>
  )
}

export default AnalysisTable;
