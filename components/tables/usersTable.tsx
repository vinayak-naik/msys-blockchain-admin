import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { IconButton, Tooltip } from "@mui/material";
import { PersonOffOutlined, PersonOutlined } from "@mui/icons-material";
import style from "../../styles/components/small/userTable.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const sx = {
  tableCell: {
    textTransform: "capitalize",
    padding: "12px",
  },
};

const UsersTable = (props: any) => {
  const { refreshPage } = props;
  const { users } = useSelector((state: RootState) => state.users);
  const { contract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [loading, setLoading] = useState(false);

  const disableUser = async (address: string) => {
    setLoading(true);
    const res = await contract.connect(signer).disableUser(address);
    await res.wait();
    refreshPage();
    setLoading(false);
  };
  const enableUser = async (address: string) => {
    setLoading(true);
    const res = await contract.connect(signer).enableUser(address);
    await res.wait();
    refreshPage();
    setLoading(false);
  };
  return (
    <div className={style.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>S. No.</TableCell>
              <TableCell>Wallet Address</TableCell>
              <TableCell sx={sx.tableCell}>Name</TableCell>
              <TableCell sx={sx.tableCell}>Email</TableCell>
              <TableCell sx={sx.tableCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item: any, index: number) => (
              <TableRow
                key={item.walletAddress}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell sx={sx.tableCell} component="th" scope="row">
                  {item.walletAddress}&nbsp;
                  <Tooltip title="Copy" placement="top">
                    <IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(`${item.walletAddress}`)
                      }
                    >
                      <ContentCopyRoundedIcon
                        style={{ fontSize: 12 }}
                        sx={{ marginBottom: "4px" }}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={sx.tableCell}>{item.name}</TableCell>
                <TableCell sx={sx.tableCell}>{item.email}</TableCell>
                <TableCell sx={sx.tableCell}>
                  {item.disabled ? (
                    <Tooltip title="Disabled" placement="top">
                      <IconButton
                        disabled={loading}
                        onClick={() => enableUser(item.walletAddress)}
                        color="error"
                      >
                        <PersonOffOutlined />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Active" placement="top">
                      <IconButton
                        disabled={loading}
                        onClick={() => disableUser(item.walletAddress)}
                        color="success"
                      >
                        <PersonOutlined />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersTable;
