import {
    useReactTable,
    getCoreRowModel,
    ColumnDef,
    flexRender
} from '@tanstack/react-table'

interface TableProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
}

export default function Table<T>({ data, columns }: TableProps<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div>
            table
            <table className="w-full">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b-2 border-[#1C1C1C] border-opacity-40">
                            {headerGroup.headers.map((header, i) => (
                                <th
                                    key={header.id}
                                    className={`py-[6px] pr-[12px]`}
                                    style={{ paddingLeft: (i == 0 ? 0 : 7) + 'px' }}
                                >
                                    {
                                        header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="py-[3px] pr-[12px] pl-0">
                                            {
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}