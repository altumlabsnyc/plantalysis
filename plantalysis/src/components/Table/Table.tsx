import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from '@tanstack/react-table'
import { Row } from 'react-table'

// Define the props that the Table component expects
interface TableProps<T> {
  data: T[] // Array of data rows
  columns: ColumnDef<T, any>[] | null // Column definitions or null if no columns
  hideHeader?: boolean | null // Optional flag to hide the table header
}

// Main Table component
export default function Table<T>({ data, columns, hideHeader }: TableProps<T>) {
  // Check if columns are provided
  if (!columns) {
    throw new Error('columns need to be defined')
  }

  // Initialize the table instance using useReactTable hook
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div>
      {/* Render the table */}
      <table className="w-full">
        {/* Render the table header */}
        {!hideHeader && (
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-b-2 border-[#1C1C1C] border-opacity-40"
              >
                {/* Render each header */}
                {headerGroup.headers.map((header, i) => (
                  <th
                    key={header.id}
                    className={`py-[6px] pr-[12px]`}
                    style={{ paddingLeft: (i == 0 ? 0 : 7) + 'px' }}
                  >
                    {/* Render header content or placeholder */}
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
        )}
        {/* Render the table body */}
        <tbody>
          {/* Iterate through each row */}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {/* Iterate through visible cells in the row */}
              {row.getVisibleCells().map((cell, i) => (
                <td
                  key={cell.id}
                  className="py-[3px] pr-[12px]"
                  style={{ paddingLeft: (i == 0 ? 0 : 7) + 'px' }}
                >
                  {/* Render cell content */}
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
