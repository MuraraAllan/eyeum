import * as React from 'react'
import {useMemo} from "react"


import { Table as BTable } from 'react-bootstrap'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'


const columns = [
  {
    header: 'Ident',
    columns: [
      {
        accessorFn: row => row.fullName,
        id: 'Player Name',
        cell: info => info.getValue(),
        header: () => <span>Player Name</span>,
      },
      {
        accessorFn: row => row.preferredPosition,
        id: 'Pref Pos',
        cell: info => info.getValue(),
        header: () => <span>Pref Pos</span>,
      }
    ],
  },
  {
    header: 'Positions',
    columns: []
  }
]

export function BasicTable({ data } : { data : any } ) {
  console.log('lalala', data)

  const memoColumns = useMemo(() => {
    console.log('columns are', columns)
    const localColumns = {
      ...columns
    }
    if (data.length == 0) return localColumns
    localColumns[1].columns = []
    data[0].playerAttributes[0].playerAttributesPositionalRating.forEach((playerAttrib, index) => {
      console.log('hey', localColumns, playerAttrib)
      localColumns[1].columns.push({
        id: playerAttrib.position,
        accessorFn: (row) => {
          console.log('ACESSOR FN', row)
          return row.playerAttributes[0].playerAttributesPositionalRating[index]
        },
        cell: (info) => {
          console.log('info is', info.getValue())
          // 
          const roundedValue = info.getValue().positionalRating.toFixed(2) 
          return (roundedValue - (roundedValue * (info.getValue().type * 5 / 100))).toFixed(2)
        },
        header: () => <span>{playerAttrib.position}</span>,
      })
    })

    return localColumns
  }, [data])
  console.log('localcolumns', memoColumns)
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <BTable striped bordered hover responsive size="sm">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </BTable>
    </div>
  )
}

