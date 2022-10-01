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
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../../redux/redux-toolkit/userSlice";
import UsersTable from "../../components/atoms/usersTable";

// interface changeUserStatusIF{
//   status:boolean;
//   address:string;

// }

const Users = () => {
  const dispatch = useDispatch();
  const { contract } = useSelector((state: RootState) => state.contract);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const count = 2;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getAllUsers = async () => {
    const length = await contract.getAllUsers();
    const pageNo = Math.ceil(Number(length.length) / count);
    setTotalPages(pageNo);
    const from = (page - 1) * count;
    const to = from + count;
    const usersArr = [];

    for (let i = from; i < to; i++) {
      if (i < length.length) {
        const res = await contract.users(i);
        usersArr.push(res);
      }
    }
    const users = usersArr.map((item: any) => {
      return {
        id: Number(item.id),
        name: item.name,
        email: item.email,
        walletAddress: item.walletAddress,
        disabled: item.disabled,
      };
    });
    dispatch(setUsers(users));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (contract) {
      getAllUsers();
    }
  }, [contract]); //eslint-disable-line
  useEffect(() => {
    if (contract) {
      getAllUsers();
    }
  }, [contract, page]); //eslint-disable-line

  const refreshPage = () => {
    getAllUsers();
  };

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
          <UsersTable refreshPage={refreshPage} />
          <Paper
            sx={{
              margin: "0.5px 0",
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
