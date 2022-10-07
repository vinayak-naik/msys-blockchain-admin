import {
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/pages/user.module.css";
import AddGuideDialog from "../../components/dialogs/addGuideDialog";
import { LibraryAdd } from "@mui/icons-material";
import { getGuides } from "../../utils/api/next.api";
import GuidesTable from "../../components/tables/guidesTable";
import { setGuides } from "../../redux/redux-toolkit/guideSlice";
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

const Guides = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const getGuidesList = () => {
    setLoading(true);
    getGuides().then((data) => {
      const list = data.map((item: any) => {
        return {
          title: item.title,
          fileName: item.fileName,
          timestamp: convertTimestamp(Number(item.timestamp / 1000)),
        };
      });
      dispatch(setGuides(list));
      setLoading(false);
    });
  };

  useEffect(() => {
    getGuidesList();
  }, []); //eslint-disable-line

  // convertTimestamp

  return (
    <LotteryLoadingComponent loading={loading}>
      <div style={{ padding: "30px" }}>
        <Paper sx={{ marginBottom: "0.5px", padding: "10px" }}>
          <div className={style.titleBox}>
            <Typography variant="h5" textAlign="center"></Typography>
            <Typography variant="h5" textAlign="center">
              Guides
            </Typography>
            <Typography variant="h5" textAlign="center">
              <IconButton onClick={() => setOpen(true)}>
                <LibraryAdd />
              </IconButton>
            </Typography>
          </div>
        </Paper>
        <GuidesTable />
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
        <AddGuideDialog
          open={open}
          handleClose={() => setOpen(false)}
          refresh={getGuidesList}
        />
      </div>
    </LotteryLoadingComponent>
  );
};

export default Guides;
