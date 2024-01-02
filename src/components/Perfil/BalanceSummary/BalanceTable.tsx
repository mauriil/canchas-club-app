/* eslint-disable @typescript-eslint/no-unsafe-argument */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Alert, AlertColor, Box, Snackbar } from '@mui/material';
import { getAccountBalance } from '../../../api/users';
import CanchasClubLoader from '../../Loader';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'fecha', label: 'Fecha', minWidth: 170 },
    { id: 'tipo', label: 'Tipo movimiento', minWidth: 170 },
    { id: 'estado', label: 'Estado', minWidth: 170 },
    { id: 'monto', label: 'Monto', minWidth: 170 },
    { id: 'saldo', label: 'Saldo', minWidth: 170 },
];

const dictionary = {
    status: {
        requested: 'Solicitado',
        completed: 'Completado',
        'approved - accredited': 'Acreditado',
        'internal_booking': 'Pago en club',
        'refunded - refunded': 'Reembolsado',
    },
};


export default function BalanceTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [balanceData, setBalanceData] = React.useState<[{
        amount: number;
        createdAt: string;
        status: string;
        type: string;
    }]>([]);
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("");
    const [snackBarSeverity, setSnackBarSeverity] = React.useState("success");
    const handelSnackClose = () => {
        setSnackBarOpen(false);
    };
    const [loading, setLoading] = React.useState(true);
    const [formattedBalanceData, setFormattedBalanceData] = React.useState<[{
        amount: number;
        createdAt: string;
        status: string;
        type: string;
    }]>([]);
    const [totalItems, setTotalItems] = React.useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    React.useEffect(() => {
        void getBalanceData(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const formatBalanceData = (balance: Array<{
        amount: number;
        createdAt: string;
        status: string;
        type: string;
        fieldPrice: number;
    }>) => {
        let totalBalance = 0;

        const formattedBalance = [];

        for (let index = balance.length - 1; index >= 0; index--) {
            const item = balance[index];

            const date = new Date(item.createdAt);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

            if (item.type === 'withdraw') {
                totalBalance -= item.amount;
            } else {
                if (item.status !== 'refunded - refunded' && item.status !== 'internal_booking') {
                    totalBalance += item.fieldPrice;
                }
            }

            const formattedItem = {
                fecha: formattedDate,
                tipo: item.type === 'withdraw' ? 'Retiro' : 'Ingreso',
                estado: dictionary.status[item.status],
                monto: item.type === 'withdraw' ? item.amount : item.fieldPrice,
                saldo: totalBalance,
            };

            formattedBalance.unshift(formattedItem);
        }

        setFormattedBalanceData(formattedBalance);
    };


    const getBalanceData = async (page: number, rowsPerPage: number) => {
        try {
            setLoading(true);
            const balanceQuery = await getAccountBalance(page, rowsPerPage);
            if (balanceQuery.statusCode >= 400) {
                setSnackBarMessage(balanceQuery.message);
                setSnackBarSeverity("error");
                setSnackBarOpen(true);
                setLoading(false);
                return;
            }
            setBalanceData(balanceQuery.payments as unknown as React.SetStateAction<[{ amount: number; createdAt: string; status: string; type: string; }]>);
            formatBalanceData(balanceQuery.payments as unknown as React.SetStateAction<[{ amount: number; createdAt: string; status: string; type: string; }]>);
            setTotalItems(balanceQuery.total);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'column' }}>
            {loading ? (
                <Box sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}>
                    <CanchasClubLoader width="80%" />
                </Box>
            ) : (
                <>
                    <TableContainer sx={{
                        maxHeight: 440,
                        borderRadius: '10px',
                        marginTop: '1rem',
                        marginBottom: '1rem',
                    }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth, backgroundColor: '#00a6c0', color: 'white' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {formattedBalanceData?.length > 0 &&
                                    formattedBalanceData
                                        .map((row) => {
                                            const isRetiro = row.tipo === 'Retiro';
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code} style={{ color: isRetiro ? 'red' : 'inherit' }}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align} style={{ color: isRetiro && column.id === 'tipo' ? 'red' : 'inherit' }}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                            </TableBody>
                        </Table>
                    </TableContainer><TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        labelRowsPerPage="Registros por página"
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </>
            )}


            <Snackbar
                open={snackBarOpen}
                autoHideDuration={5000}
                onClick={handelSnackClose}
                onClose={handelSnackClose}
            >
                <Alert
                    severity={snackBarSeverity as AlertColor}
                    sx={{ width: "100%", fontSize: "15px" }}
                    onClose={handelSnackClose}
                >
                    {snackBarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}