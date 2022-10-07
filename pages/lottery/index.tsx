import {
  IconButton,
  Pagination,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/pages/user.module.css";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import AddLotteryDialog from "../../components/dialogs/addLotteryDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Refresh } from "@mui/icons-material";
import { convertStatus, convertTimestamp } from "../../utils/convertion";
import { setLotteries } from "../../redux/redux-toolkit/lotteriesSlice";
import LotteriesTable from "../../components/tables/lotteriesTable";
import { LotteryLoadingComponent } from "../../molecules/pages/lotteryDetails.atom";

const Lotteries = () => {
  const dispatch = useDispatch();
  const { contract } = useSelector((state: RootState) => state.contract);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const count = 8;

  const getAllLotteries = async () => {
    const length = await contract.getLotteriesLength();
    const pageNo = Math.ceil(Number(length) / count);
    setTotalPages(pageNo);
    const from = (page - 1) * count;
    const to = from + count;
    const lotteriesArr = [];

    for (let i = from; i < to; i++) {
      if (i < Number(length)) {
        const res = await contract.lotteries(i);
        lotteriesArr.push(res);
      }
    }
    const lotteries = lotteriesArr.map((item: any) => {
      return {
        date: convertTimestamp(Number(item.date)),
        lotteryId: Number(item.lotteryId),
        lotteryName: item.lotteryName,
        amount: Number(item.amount),
        statusCode: Number(item.statusCode),
        statusString: convertStatus(Number(item.statusCode)),
      };
    });
    dispatch(setLotteries(lotteries));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (contract) {
      getAllLotteries();
    }
  }, [contract]); //eslint-disable-line
  useEffect(() => {
    if (contract) {
      getAllLotteries();
    }
  }, [contract, page]); //eslint-disable-line

  const refreshPage = () => {
    setLoading(true);
    getAllLotteries();
  };
  return (
    <LotteryLoadingComponent loading={loading}>
      <div style={{ padding: "30px 30px 0" }}>
        <Paper sx={{ marginBottom: "0.5px", padding: "10px" }}>
          <div className={style.titleBox}>
            <Typography></Typography>
            <Typography variant="h5" textAlign="center">
              Lotteries
            </Typography>
            <Tooltip title="Add Lottery" placement="top">
              <IconButton onClick={() => setOpen(true)}>
                <LibraryAddIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
        <LotteriesTable />
        <Paper
          sx={{
            margin: "1px 0",
            padding: "10px 20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>&nbsp;&nbsp;</div>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
          <Tooltip title="Refresh" placement="top">
            <IconButton onClick={refreshPage}>
              <Refresh />
            </IconButton>
          </Tooltip>
        </Paper>
        <AddLotteryDialog
          open={open}
          handleClose={() => setOpen(false)}
          refreshPage={getAllLotteries}
        />
      </div>
    </LotteryLoadingComponent>
  );
};

export default Lotteries;
