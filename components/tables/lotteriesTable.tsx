import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { IconButton, Tooltip } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { convertStatus } from "../../utils/convertion";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface MatchIF {
  date: number;
  lotteryId: number;
  amount: number;
  lotteryName: string;
  statusCode: number;
  statusString: string;
}

const sx = {
  tableCell: {
    textTransform: "capitalize",
    cursor: "pointer",
    padding: "12px",
  },
};

export default function LotteriesTable() {
  const { push } = useRouter();
  const { lotteries } = useSelector((state: RootState) => state.lotteries);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={sx.tableCell}>Lottery Id</TableCell>
            <TableCell sx={sx.tableCell}>Date</TableCell>
            <TableCell sx={sx.tableCell}>Name</TableCell>
            <TableCell sx={sx.tableCell}>Amount</TableCell>
            <TableCell sx={sx.tableCell}>Status</TableCell>
            <TableCell sx={sx.tableCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lotteries.map((item: MatchIF) => (
            <TableRow
              key={item.lotteryId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => push(`/lottery/${item.lotteryId}`)}
            >
              <TableCell sx={sx.tableCell}>{item.lotteryId}</TableCell>
              <TableCell sx={sx.tableCell}>{item.date}</TableCell>
              <TableCell sx={sx.tableCell}>{item.lotteryName}</TableCell>
              <TableCell sx={sx.tableCell}>{item.amount}&nbsp;MSCN</TableCell>
              <TableCell sx={sx.tableCell}>
                {convertStatus(item.statusCode)}
              </TableCell>
              <TableCell sx={sx.tableCell}>
                {item.statusCode === 4 ? (
                  <Tooltip title="Hidden" placement="top">
                    <IconButton color="error" sx={{ cursor: "default" }}>
                      <VisibilityOff sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip title="Visible" placement="top">
                    <IconButton color="success" sx={{ cursor: "default" }}>
                      <Visibility sx={{ fontSize: "16px" }} />
                    </IconButton>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
