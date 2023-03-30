import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
import { toast } from "react-toastify";
import { Transaction, TransactionType } from "./Home";
import { styled, TableHead } from "@mui/material";
import moment from "moment";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function Transactions() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<Transaction[]>([]);
  const [count, setCount] = useState(10);
  const theme = useTheme();

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * 10 - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleChangePage(event, Math.max(0, Math.ceil(count / 10) - 1));
  };

  const fetch = async () => {
    const walletId = localStorage.getItem("wallet_id");
    try {
      const { data } = await axios.get(
        `http://localhost:3000/transactions?walletId=${walletId}&skip=${
          page * 10
        }&limit=${10}`
      );
      const { list, count } = data;
      setRows(list);
      setCount(count);
    } catch (err) {
      toast.error("Cannot fetch transactions. please try again");
    }
  };

  useEffect(() => {
    fetch();
  }, [page]);

  return (
    <div className="page">
      <TableContainer sx={{ width: "90%", height: "80%" }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Transaction Id</StyledTableCell>
              <StyledTableCell align="left">Type</StyledTableCell>
              <StyledTableCell align="left">Amount</StyledTableCell>
              <StyledTableCell align="left">Balance</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell
                  style={{
                    width: 160,
                    color:
                      row.type === TransactionType.CREDIT ? "green" : "red",
                  }}
                  align="left"
                >
                  {row.type}
                </TableCell>
                <TableCell
                  style={{
                    width: 160,
                    color:
                      row.type === TransactionType.CREDIT ? "green" : "red",
                  }}
                  align="left"
                >
                  {row.amount}
                </TableCell>
                <TableCell style={{ width: 160, color: "blue" }} align="left">
                  {row.balance}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {moment(row.date).format("DD/MM/YY HH:MM:SS")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                  onClick={handleFirstPageButtonClick}
                  disabled={page === 0}
                  aria-label="first page"
                >
                  {theme.direction === "rtl" ? (
                    <LastPageIcon />
                  ) : (
                    <FirstPageIcon />
                  )}
                </IconButton>
                <IconButton
                  onClick={handleBackButtonClick}
                  disabled={page === 0}
                  aria-label="previous page"
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </IconButton>
                <IconButton
                  onClick={handleNextButtonClick}
                  disabled={page >= Math.ceil(count / 10) - 1}
                  aria-label="next page"
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </IconButton>
                <IconButton
                  onClick={handleLastPageButtonClick}
                  disabled={page >= Math.ceil(count / 10) - 1}
                  aria-label="last page"
                >
                  {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                  ) : (
                    <LastPageIcon />
                  )}
                </IconButton>
              </Box>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
