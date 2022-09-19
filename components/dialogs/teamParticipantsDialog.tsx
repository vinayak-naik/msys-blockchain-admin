import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import style from "../../styles/components/dialog/dialog.module.css";
import { Dialog, DialogTitle, Pagination, Typography } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const sx = {
  tableCell: {
    textTransform: "capitalize",
    cursor: "pointer",
    textAlign: "center",
  },
};

export const TeamParticipantsDialog = (props: any) => {
  const { match, team1, team2 } = useSelector(
    (state: RootState) => state.matches
  );
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { participantsDialog, handleClose } = props;
  const [team, setTeam] = useState({ users: [], totalAmount: 0 });
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    if (participantsDialog === 1) {
      setTeam(team1);
      setTeamName(match.team1);
    } else if (participantsDialog === 2) {
      setTeam(team2);
      setTeamName(match.team2);
    }
  }, [participantsDialog]); // eslint-disable-line

  return (
    <Dialog
      open={Boolean(participantsDialog)}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>
        <div
          style={{ width: "100%", textAlign: "center", paddingBottom: "10px" }}
        >
          <Typography variant="h5" textTransform="capitalize">
            {teamName}
          </Typography>
        </div>
        <TableContainer style={{ border: "1px solid lightgrey" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={sx.tableCell}>Sl No.</TableCell>
                <TableCell sx={sx.tableCell}>Wallet Address</TableCell>
                <TableCell sx={sx.tableCell}>Bet Amount</TableCell>
                <TableCell sx={sx.tableCell}>Fees</TableCell>
                <TableCell sx={sx.tableCell}>
                  {match.statusCode === 3 ? "Profit" : "Expected Profit"}
                </TableCell>
                <TableCell sx={sx.tableCell}>% Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {team.users.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell sx={sx.tableCell}>{index + 1}</TableCell>
                  <TableCell sx={sx.tableCell}>
                    {item.participantAddress}
                  </TableCell>
                  <TableCell sx={sx.tableCell}>
                    {Number(item.amount)}&nbsp;MSCN
                  </TableCell>
                  <TableCell sx={sx.tableCell}>
                    {(Number(item.amount) / 99).toFixed(2)}&nbsp;MSCN
                  </TableCell>

                  {match.statusCode === 3 ? (
                    <TableCell sx={sx.tableCell}>
                      {match.won === participantsDialog
                        ? (
                            ((team1.totalAmount + team2.totalAmount + 1000) *
                              ((Number(item.amount) * 100) / 99)) /
                            team.totalAmount
                          ).toFixed(2)
                        : 0}
                      &nbsp;MSCN
                    </TableCell>
                  ) : (
                    <TableCell sx={sx.tableCell}>
                      {(
                        ((team1.totalAmount + team2.totalAmount + 1000) *
                          ((Number(item.amount) * 100) / 99)) /
                        team.totalAmount
                      ).toFixed(2)}
                      &nbsp;MSCN
                    </TableCell>
                  )}

                  <TableCell sx={sx.tableCell}>
                    {(
                      (Number(Number(item.amount)) * 100) /
                      (team1.totalAmount + team2.totalAmount)
                    ).toFixed(2)}
                    &nbsp;%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            margin: "0.5px 0",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination count={1} page={page} onChange={handleChange} />
        </div>
      </DialogTitle>
    </Dialog>
  );
};

export const MemoizedMovie = React.memo(TeamParticipantsDialog);
