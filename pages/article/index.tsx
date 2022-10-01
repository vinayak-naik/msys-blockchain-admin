import { IconButton, Pagination, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import style from "../../styles/pages/user.module.css";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AddArticleDialog from "../../components/dialogs/addArticleDialog";
import PrivatePage from "../../components/atoms/uploadImageTest";
const Users = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div style={{ padding: "50px" }}>
      <Paper sx={{ marginBottom: "0.5px", padding: "10px" }}>
        <div className={style.titleBox}>
          <Typography variant="h5" textAlign="center"></Typography>
          <Typography variant="h5" textAlign="center">
            Articles
          </Typography>
          <Typography variant="h5" textAlign="center">
            <IconButton onClick={() => setOpen(true)}>
              <GroupAddOutlinedIcon />
            </IconButton>
          </Typography>
        </div>
      </Paper>
      <Paper
        sx={{
          margin: "1px 0",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination count={1} page={page} onChange={handleChange} />
        <PrivatePage />
      </Paper>
      <AddArticleDialog open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Users;
