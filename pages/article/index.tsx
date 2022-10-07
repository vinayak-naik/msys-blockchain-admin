import {
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/pages/user.module.css";
import AddArticleDialog from "../../components/dialogs/addArticleDialog";
import { LibraryAdd } from "@mui/icons-material";
import { getArticles } from "../../utils/api/next.api";
import ArticlesTable from "../../components/tables/articlesTable";
import { setArticles } from "../../redux/redux-toolkit/articleSlice";
import { useDispatch } from "react-redux";
import { convertTimestamp } from "../../utils/convertion";

const LotteryLoadingComponent = (props: any) => {
  const { loading, children } = props;
  const styleObj = {
    height: "90vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  if (loading) {
    return (
      <div style={styleObj}>
        <CircularProgress color="success" />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

const Articles = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const getArticlesList = () => {
    setLoading(true);
    getArticles().then((data) => {
      const list = data.map((item: any) => {
        return {
          title: item.title,
          fileName: item.fileName,
          timestamp: convertTimestamp(Number(item.timestamp / 1000)),
        };
      });
      dispatch(setArticles(list));
      setLoading(false);
    });
  };

  useEffect(() => {
    getArticlesList();
  }, []); //eslint-disable-line

  // convertTimestamp

  return (
    <LotteryLoadingComponent loading={loading}>
      <div style={{ padding: "30px" }}>
        <Paper sx={{ marginBottom: "0.5px", padding: "10px" }}>
          <div className={style.titleBox}>
            <Typography variant="h5" textAlign="center"></Typography>
            <Typography variant="h5" textAlign="center">
              Articles
            </Typography>
            <Typography variant="h5" textAlign="center">
              <IconButton onClick={() => setOpen(true)}>
                <LibraryAdd />
              </IconButton>
            </Typography>
          </div>
        </Paper>
        <ArticlesTable />
        <Paper
          sx={{
            margin: "0.5px 0",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination count={1} page={page} onChange={handleChange} />
        </Paper>
        <AddArticleDialog
          open={open}
          handleClose={() => setOpen(false)}
          refresh={getArticlesList}
        />
      </div>
    </LotteryLoadingComponent>
  );
};

export default Articles;
