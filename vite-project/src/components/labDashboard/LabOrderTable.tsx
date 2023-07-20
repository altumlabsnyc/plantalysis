import { Button, CssBaseline, InputLabel, MenuItem, TextField } from '@material-ui/core'
import React, { useCallback } from 'react'
import { CellProps, FilterProps, FilterValue, IdType, Row, TableInstance } from 'react-table'
import { LabOrder } from '../UserTypes'

import { Page } from './regulator/Page'
import { Table } from './regulator/Table'
import { PersonData, makeData } from './regulator/utils'

const columns = [
    {
        Header: 'Order ID',
        accessor: 'id'
    },
    {
        Header: 'Pickup Location',
        accessor: 'location'
    },
    {
        Header: 'Info',
        accessor: 'strain_info'
    }
] //.flatMap((c:any)=>c.columns) // remove comment to drop header groups

const LabOrderTable: React.FC = (props) => {
  const {labOrders} = props

  const [data] = React.useState<PersonData[]>(() => makeData(100))

  const onClaim = function(a) {
    console.log(a.selectedFlatRows)
  }

  const dummy = useCallback(
    (instance: TableInstance<PersonData>) => () => {
      console.log(
        'Selected',
        instance.selectedFlatRows.map((v) => `'${v.original.firstName} ${v.original.lastName}'`).join(', ')
      )
    },
    []
  )

  return (
    <Page>
      <CssBaseline />
      <Table<PersonData>
        name={'testTable'}
        columns={columns}
        data={labOrders}
        onClaim={onClaim}
      />
    </Page>
  )
}

export default LabOrderTable;
