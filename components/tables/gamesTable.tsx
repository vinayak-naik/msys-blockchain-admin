import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Visibility, VisibilityOff } from "@mui/icons-material";
import UpdateGameDialog from "../dialogs/updateGamedialog";

const sx = {
  tableCell: {
    cursor: "pointer",
    padding: "12px",
  },
};

export default function GamesTable(props: any) {
  const { games, refreshPage } = props;
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState<any>(null);

  const updateHandler = (id: number) => {
    setGame(games[id]);
    setOpen(true);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={sx.tableCell}>Game Id</TableCell>
            <TableCell sx={sx.tableCell}>Name</TableCell>
            <TableCell sx={sx.tableCell}>Route</TableCell>
            <TableCell sx={sx.tableCell}>Internal Image Name</TableCell>
            <TableCell sx={sx.tableCell}>External URL</TableCell>
            <TableCell sx={sx.tableCell}>Active</TableCell>
            <TableCell sx={sx.tableCell}>Visibility</TableCell>
            <TableCell sx={sx.tableCell}>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((item: any) => (
            <TableRow
              key={item.matchId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.gameId}
              </TableCell>
              <TableCell sx={sx.tableCell}>{item.name}</TableCell>
              <TableCell sx={sx.tableCell}>{item.route}</TableCell>
              <TableCell sx={sx.tableCell}>{item.internalUrl}</TableCell>
              <TableCell sx={sx.tableCell}>{item.externalUrl}</TableCell>
              <TableCell sx={sx.tableCell}>{item.active}</TableCell>

              <TableCell sx={sx.tableCell}>
                {!item.visibility ? (
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
              <TableCell sx={sx.tableCell}>
                <Tooltip title="Edit" placement="right">
                  <IconButton
                    onClick={() => updateHandler(item.gameId)}
                    color="default"
                    sx={{ cursor: "default" }}
                  >
                    <Edit />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UpdateGameDialog
        open={open}
        handleClose={() => setOpen(false)}
        refreshPage={refreshPage}
        game={game}
      />
    </TableContainer>
  );
}
