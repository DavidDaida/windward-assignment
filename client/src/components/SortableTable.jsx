import * as React from 'react'
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel
} from '@mui/material'

export default function SortableTable({ columns, rows, onRowClick }) {
  const [orderBy, setOrderBy] = React.useState(columns[0]?.id || '')
  const [order, setOrder] = React.useState('asc')

  const handleSort = (colId) => {
    if (orderBy === colId) {
      setOrder(order === 'asc' ? 'desc' : 'asc')
    } else {
      setOrderBy(colId)
      setOrder('asc')
    }
  }

  const sorted = React.useMemo(() => {
    const arr = [...rows]
    arr.sort((a, b) => {
      const va = a[orderBy]
      const vb = b[orderBy]
      if (va == null && vb == null) return 0
      if (va == null) return 1
      if (vb == null) return -1
      if (typeof va === 'number' && typeof vb === 'number') {
        return order === 'asc' ? va - vb : vb - va
      }
      const sa = String(va).toLowerCase()
      const sb = String(vb).toLowerCase()
      if (sa < sb) return order === 'asc' ? -1 : 1
      if (sa > sb) return order === 'asc' ? 1 : -1
      return 0
    })
    return arr
  }, [rows, orderBy, order])

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map(col => (
              <TableCell key={col.id}>
                <TableSortLabel
                  active={orderBy === col.id}
                  direction={orderBy === col.id ? order : 'asc'}
                  onClick={() => handleSort(col.id)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sorted.map((row, idx) => (
            <TableRow
              hover
              key={idx}
              onClick={() => onRowClick && onRowClick(row)}
              style={{ cursor: onRowClick ? 'pointer' : 'default' }}
            >
              {columns.map(col => (
                <TableCell key={col.id}>
                  {row[col.id] ?? ''}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
