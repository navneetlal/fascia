import React from 'react'
import { usePagination, useTable } from 'react-table'

import Box from '@mui/material/Box'
import MaUTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableFooter from '@mui/material/TableFooter'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'

import { visuallyHidden } from '@mui/utils';

import TablePaginationActions from '../components/TablePaginationAction'
import IconButton from '@mui/material/IconButton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

type Order = 'asc' | 'desc';

function Table({
    columns,
    data,
    fetchData,
    pageCount: controlledPageCount
}) {
    const {
        getTableProps,
        headerGroups,
        prepareRow,
        page,
        pageOptions,
        gotoPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
            manualPagination: true,
            pageCount: controlledPageCount,
        },
        usePagination
    )

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('name');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            handleRequestSort(event, property);
        };

    React.useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize, orderBy, order])

    return (
        <MaUTable size="small" {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell
                                {...column.getHeaderProps()}
                                sortDirection={orderBy === column.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === column.id}
                                    direction={orderBy === column.id ? order : 'asc'}
                                    onClick={createSortHandler(column.id)}
                                >
                                    {column.render('Header')}
                                    {orderBy === column.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <TableRow {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                            <TableCell align='center'>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <DeleteForeverIcon />
                                </IconButton>
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            <TableFooter>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    count={pageOptions.length}
                    rowsPerPage={pageSize}
                    page={pageIndex}
                    onRowsPerPageChange={(e) => setPageSize(parseInt(e.target.value, 10))}
                    onPageChange={(event: unknown, newPage: number) => gotoPage(newPage)}
                    ActionsComponent={TablePaginationActions}
                />
            </TableFooter>
        </MaUTable>
    )
}

export default Table