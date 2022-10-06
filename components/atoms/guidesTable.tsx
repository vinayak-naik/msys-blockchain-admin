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
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const sx = {
  tableCell: {
    textTransform: "capitalize",
    cursor: "pointer",
    padding: "12px",
  },
};

export default function GuidesTable() {
  const { push } = useRouter();
  const { guides } = useSelector((state: RootState) => state.guides);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={sx.tableCell}>Sl. No.</TableCell>
            <TableCell sx={sx.tableCell}>Date</TableCell>
            <TableCell sx={sx.tableCell}>Guide</TableCell>
            <TableCell sx={sx.tableCell}>Filename</TableCell>
            <TableCell sx={sx.tableCell}>Delete</TableCell>
            <TableCell sx={sx.tableCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guides.map((item: any) => (
            <TableRow
              key={item.guideId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => push(`/betting/${item.guideId}`)}
            >
              <TableCell component="th" scope="row">
                {item.guideId}
              </TableCell>
              <TableCell sx={sx.tableCell}>{item.date}</TableCell>
              <TableCell sx={sx.tableCell}>{item.team1}</TableCell>
              <TableCell sx={sx.tableCell}>{item.team2}</TableCell>
              <TableCell sx={sx.tableCell}>{item.statusString}</TableCell>
              <TableCell sx={sx.tableCell}>
                {Number(item.won) === 1
                  ? item.team1
                  : Number(item.won) === 2
                  ? item.team2
                  : item.statusCode === 3
                  ? "Draw"
                  : "---"}
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