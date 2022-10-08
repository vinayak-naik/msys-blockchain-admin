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
import { LibraryAdd, Refresh } from "@mui/icons-material";
import AddMatchDialog from "../../components/dialogs/addMatchDialog";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setMatches } from "../../redux/redux-toolkit/matchesSlice";
import { convertStatus, convertTimestamp } from "../../utils/convertion";
import MatchesTable from "../../components/tables/matchesTable";

const Matches = () => {
  const dispatch = useDispatch();
  const { contract } = useSelector((state: RootState) => state.contract);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const count = 8;
  const getAllMatches = async () => {
    const length = await contract.getMatchesLength();
    const pageCount = Math.ceil(Number(length) / count);
    setTotalPages(pageCount);
    const from = (page - 1) * count;
    const to = from + count;
    const matchesArr = [];

    for (let i = from; i < to; i++) {
      if (i < length) {
        const res = await contract.matches(i);
        matchesArr.push(res);
      }
    }
    const matches = matchesArr.map((item: any) => {
      return {
        date: convertTimestamp(Number(item.date)),
        matchId: Number(item.matchId),
        team1: item.team1,
        team2: item.team2,
        statusCode: Number(item.statusCode),
        won: Number(item.won),
        statusString: convertStatus(Number(item.statusCode)),
      };
    });
    dispatch(setMatches(matches));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (contract) {
      getAllMatches();
    }
  }, [contract]); //eslint-disable-line
  useEffect(() => {
    if (contract) {
      getAllMatches();
    }
  }, [contract, page]); //eslint-disable-line

  const refreshPage = () => {
    setLoading(true);
    getAllMatches();
  };
  return (
    <>
      {loading ? (
        <div className={style.loadingBox}>
          <CircularProgress color="success" />
        </div>
      ) : (
        <div style={{ padding: "30px 30px 0" }}>
          <Paper sx={{ marginBottom: "0.5px", padding: "10px" }}>
            <div className={style.titleBox}>
              <Typography variant="h5" textAlign="center"></Typography>
              <Typography variant="h5" textAlign="center">
                IPL Matches
              </Typography>
              <Typography variant="h5" textAlign="center">
                <Tooltip title="Add Match" placement="top">
                  <IconButton onClick={() => setOpen(true)}>
                    <LibraryAdd />
                  </IconButton>
                </Tooltip>
              </Typography>
            </div>
          </Paper>
          <MatchesTable />
          <Paper
            sx={{
              margin: "1px 0",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>&nbsp;&nbsp;</div>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
            />
            <Tooltip title="Refresh" placement="top">
              <IconButton onClick={refreshPage}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Paper>
          <AddMatchDialog
            open={open}
            handleClose={() => setOpen(false)}
            refreshPage={getAllMatches}
          />
        </div>
      )}
    </>
  );
};

export default Matches;
