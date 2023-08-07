// const columns = [
//   {
//     Header: 'Analysis ID',
//     accessor: 'analysis_id',
//   },
//   {
//     Header: 'Passed',
//     accessor: 'pass',
//   },
//   {
//     Header: 'Brand',
//     accessor: 'brand_name',
//   },
//   {
//     Header: 'Lab',
//     accessor: 'lab_name',
//   },

//   {
//     Header: 'QR link',
//     accessor: 'sku',
//   },
// ]

// const moleculePredictionColumns = [
//   {
//     Header: 'Molecule ID',
//     accessor: 'molecule_id',
//   },
//   {
//     Header: 'Concentration',
//     accessor: 'concentration',
//   },
// ]

// export default function AnalysisTable({ analysis: AnalysisTableRow[]}){
//   // const [data, setData] = React.useState(analysis)

//   // const [moleculePredictionData, setMoleculePredictionData] = useState<
//   //   MoleculePredict[]
//   // >([])

//   // const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

//   // // const handleClick = (event: BaseSyntheticEvent, row: Row) => {
//   // //   setAnchorEl(event.currentTarget)
//   // //   setMoleculePredictionData(row.original.molecules)
//   // // }

//   // const handlePopoverClose = () => {
//   //   console.log('close')
//   //   setAnchorEl(null)
//   //   setMoleculePredictionData([])
//   // }

//   // const open = Boolean(anchorEl)

//   // React.useEffect(() => {
//   //   if (analysis) {
//   //     setData(analysis)
//   //   }
//   // }, [analysis])

//   // const [selectedRows, setSelectedRows] = React.useState([])

//   // const [isSnackBarOpen, setIsSnackBarOpen] = React.useState(false)
//   // const [snackBarMessage, setSnackBarMessage] = React.useState('')
//   // const [snackBarSeverity, setSnackBarSeverity] =
//   //   React.useState<AlertColor>('info')
//   // const [isSendingClaimRequest, setIsSendingClaimRequest] =
//   //   React.useState(false)

//   // const handleSnackBarClose = (
//   //   event: React.SyntheticEvent | Event,
//   //   reason?: string,
//   // ) => {
//   //   if (reason === 'clickaway') {
//   //     return
//   //   }

//   //   setIsSnackBarOpen(false)
//   // }

//   // const onStartClaimRequest = function () {
//   //   setIsSendingClaimRequest(true)
//   //   setIsSnackBarOpen(true)
//   //   setSnackBarSeverity('info')
//   //   setSnackBarMessage('Claiming orders...')
//   // }

//   // const onClaimSuccess = function () {
//   //   setIsSendingClaimRequest(false)
//   //   setIsSnackBarOpen(true)
//   //   setSnackBarSeverity('success')
//   //   setSnackBarMessage('Successfully claimed orders!')
//   // }

//   // const onApprove = function () {
//     // if (isSendingClaimRequest) return
//     // const analysis_ids = selectedRows
//     //   .map((e) => e.original)
//     //   .filter((e) => e.status == NOT_APPROVED)
//     //   .map((e) => e.analysis_id)
//     // onStartClaimRequest()
//     // approveOrders(analysis_ids).then(() => {
//     //   onClaimSuccess()
//     //   // set order's to claimed
//     //   const new_data = data.map((e) => {
//     //     if (e.status == "Not Approved") {
//     //       e.status = analysis_ids.includes(e.analysis_id)
//     //         ? APPROVED
//     //         : NOT_APPROVED
//     //     }
//     //     return e
//     //   })
//     //   setData(new_data)
//     //   window.location.reload()
//     // })
//   }
//   // const onSelectionChange = function (a) {
//   //   setSelectedRows(a.selectedFlatRows)
//   //   // console.log(a.selectedFlatRows)
//   // }

//   return (
//     <>
//       <Popover
//         id="mouse-over-popover"
//         sx={{
//           pointerEvents: 'none',
//         }}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'center',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'center',
//         }}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handlePopoverClose}
//         disableRestoreFocus
//       >
//         <>{/* molecular prediction table here */}</>
//       </Popover>
//       {/* analysis table here */}
//       <Snackbar
//         open={isSnackBarOpen}
//         autoHideDuration={2000}
//         onClose={handleSnackBarClose}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//       >
//         <Alert severity={snackBarSeverity}>{snackBarMessage}</Alert>
//       </Snackbar>
//     </>
//   )
// }

interface TempProps {
  analysis: any[]
}

export default function AnalysisTable({ analysis }: TempProps) {
  console.log(analysis)

  return <div>AnalysisTable</div>
}
