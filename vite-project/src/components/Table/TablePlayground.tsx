import Table from "./Table";
import { createColumnHelper } from '@tanstack/react-table'

const data: TestData[] = [
    {
        'producer_name': 'Koray Okumus',
        'pickup_date': 'Jun 24, 2022',
        'amount_kg': 126,
        'lab_user_id': null,
        'zip_code': '90000'
    },
    {
        'producer_name': 'Natali Craig',
        'pickup_date': 'Mar 10, 2022',
        'amount_kg': 121,
        'lab_user_id': 'xasdk23332sd9v2j3',
        'zip_code': '90001'
    },
    {
        'producer_name': 'Olivia Rhye',
        'pickup_date': 'Nov 10, 2022',
        'amount_kg': 113,
        'lab_user_id': '9jdj3jjb991k12cvb94',
        'zip_code': '19038'
    }
]

type TestData = {
    producer_name: string,
    pickup_date: string,
    amount_kg: number,
    lab_user_id: string | null,
    zip_code: string
}

const columnHelper = createColumnHelper<TestData>()

const columns = [
    columnHelper.accessor('producer_name', {
        cell: info => info.getValue(),
        header: 'Producer Name'
    }),
    columnHelper.accessor(row => row.pickup_date, {
        id: 'pickup_date',
        cell: info => (<div>
            <div>above it</div>
            <div>{info.getValue()}</div>
            <div>below it</div>
        </div>),
        header: () => <h3>Date of Pickup</h3>
    }),
    columnHelper.accessor(row => Number(row.amount_kg > 120), {
        cell: info => info.getValue(),
        header: 'Greater than 120'
    })
]
export default function TablePlayground() {
    return (
        <Table<TestData> data={data} columns={columns} />
    )
}