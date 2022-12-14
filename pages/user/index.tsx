import {
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/pages/user.module.css";
import AddUserDialog from "../../components/dialogs/addUserDialog";
import { GroupAddOutlined, Refresh } from "@mui/icons-material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import UsersTable from "../../components/tables/usersTable";

const Users = () => {
  const { userContract } = useSelector((state: RootState) => state.contract);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState<any>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const count = 7;
  let ignore = false;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getAllUsers = async () => {
    const length = await userContract.getUsersLength();
    const pageNo = Math.ceil(Number(length) / count);
    setTotalPages(pageNo);
    const from = (page - 1) * count;
    const to = from + count;
    const usersArr = [];

    for (let i = from; i < to; i++) {
      if (i < Number(length)) {
        const res = await userContract.users(i);
        usersArr.push(res);
      }
    }
    const users = usersArr.map((item: any) => {
      return {
        id: Number(item.id),
        name: item.name,
        email: item.email,
        walletAddress: item.walletAddress,
        enabled: item.enabled,
      };
    });
    setUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    if (!ignore && userContract) getAllUsers();
    ignore = true; // eslint-disable-line
  }, [userContract]); // eslint-disable-line

  useEffect(() => {
    setLoading(true);
    if (!ignore && userContract) {
      getAllUsers();
    }
  }, [userContract]); //eslint-disable-line
  useEffect(() => {
    if (!ignore && userContract) {
      getAllUsers();
    }
  }, [userContract, page]); //eslint-disable-line

  return (
    <>
      {loading ? (
        <div className={style.loadingBox}>
          <CircularProgress color="success" />
        </div>
      ) : (
        <div style={{ padding: "30px 30px 0" }}>
          <Paper sx={{ marginBottom: "2px", padding: "10px" }}>
            <div className={style.titleBox}>
              <Typography variant="h5" textAlign="center"></Typography>
              <Typography variant="h5" textAlign="center">
                Users List
              </Typography>
              <Typography variant="h5" textAlign="center">
                <Tooltip title="Add User" placement="top">
                  <IconButton onClick={() => setOpen(true)}>
                    <GroupAddOutlined />
                  </IconButton>
                </Tooltip>
              </Typography>
            </div>
          </Paper>
          <UsersTable users={users} refreshPage={getAllUsers} />
          <Paper
            sx={{
              margin: "1px 0 0",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div></div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
            <Tooltip title="Refresh" placement="top">
              <IconButton onClick={getAllUsers}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Paper>
          <AddUserDialog
            open={open}
            handleClose={() => setOpen(false)}
            refreshPage={getAllUsers}
          />
        </div>
      )}
    </>
  );
};

export default Users;
