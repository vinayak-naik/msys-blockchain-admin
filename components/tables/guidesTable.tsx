import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IconButton, Tooltip } from "@mui/material";
import { Delete, Visibility } from "@mui/icons-material";

const sx = {
  tableCell: {
    textTransform: "capitalize",
    cursor: "pointer",
    padding: "12px",
  },
};

export default function GuideTable() {
  const { push } = useRouter();
  const { guides } = useSelector((state: RootState) => state.guides);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={sx.tableCell}>S. No.</TableCell>
            <TableCell sx={sx.tableCell}>Date</TableCell>
            <TableCell sx={sx.tableCell}>Guide</TableCell>
            <TableCell sx={sx.tableCell}>Filename</TableCell>
            <TableCell sx={sx.tableCell}>Visibility</TableCell>
            <TableCell sx={sx.tableCell}>Delete</TableCell>
            <TableCell sx={sx.tableCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {guides.map((item: any, index: number) => (
            <TableRow
              key={item.guideId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              onClick={() => push(`/guide/${item.fileName}`)}
            >
              <TableCell sx={sx.tableCell}>{index + 1}</TableCell>
              <TableCell sx={sx.tableCell}>{item.timestamp}</TableCell>
              <TableCell sx={sx.tableCell}>{item.title}</TableCell>
              <TableCell>{item.fileName}</TableCell>
              <TableCell sx={sx.tableCell}>
                <Tooltip title="Visible" placement="top">
                  <IconButton
                    color="success"
                    sx={{ cursor: "default", marginLeft: "2px" }}
                  >
                    <Visibility sx={{ fontSize: "16px" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell sx={sx.tableCell}>
                <Tooltip title="Delete" placement="top">
                  <IconButton
                    // color="success"
                    sx={{ cursor: "default", marginLeft: "2px" }}
                  >
                    <Delete sx={{ fontSize: "16px" }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
