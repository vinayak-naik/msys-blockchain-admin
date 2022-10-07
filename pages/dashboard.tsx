import { Pagination, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../components/atoms/barChart";
import { RootState } from "../redux/store";
import style from "../styles/pages/dashboard.module.css";

const Dashboard = () => {
  const { contract } = useSelector((state: RootState) => state.contract);
  const [page, setPage] = useState(1);
  const [bettingPages, setBettingPages] = useState(1); //eslint-disable-line
  const [lotteryPages, setLotteryPages] = useState(1); //eslint-disable-line
  const [bettingAmountArray, setBettingAmountArray] = useState<any>([]);
  const [lotteryAmountArray, setLotteryAmountArray] = useState<any>([]);
  const [balance, setBalance] = useState(0);

  const getBalanceOfSMRT = async () => {
    const bal = await contract.getBalanceOfSM();
    console.log(Number(bal));
    setBalance(Number(bal));
  };

  const handleChange = (value: number) => {
    setPage(value);
  };

  const getBettingAmountArray = async () => {
    const bettingArr = await contract.getBettingAmountArray();
    const lotteryArr = await contract.getLotteryAmountArray();
    setBettingPages(bettingArr.length);
    setLotteryPages(lotteryArr.length);
    const bettingArray = bettingArr.map((e: any) => Number(e) + 5);
    const lotteryArray = lotteryArr.map((e: any) => Number(e) + 8);
    setBettingAmountArray(bettingArray);
    setLotteryAmountArray(lotteryArray);
  };

  useEffect(() => {
    if (contract) {
      getBalanceOfSMRT();
      getBettingAmountArray();
    }
  }, []); //eslint-disable-line

  return (
    <div className={style.container}>
      <div className={style.chartContainer}>
        <div className={style.bettingChart}>
          <Paper>
            <div className={style.chartName}>Participants</div>
            <BarChart
              bettingAmountArray={bettingAmountArray}
              lotteryAmountArray={lotteryAmountArray}
            />
          </Paper>
          <Paper
            sx={{
              margin: "0.5px 0",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={bettingPages}
              page={page}
              onChange={(e: any, val: number) => handleChange(val)}
            />
          </Paper>
        </div>
        <div className={style.bettingChart}>
          <Paper>
            <div className={style.chartName}>Amount collected</div>
            <BarChart />
          </Paper>
          <Paper
            sx={{
              margin: "0.5px 0",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={bettingPages}
              page={page}
              onChange={(e: any, val: number) => handleChange(val)}
            />
          </Paper>
        </div>
      </div>
      <div className={style.cardContainerGrid}>
        <div className={style.gridItem}>
          <Paper>
            <div className={style.card}>
              <div className={style.cardHead}>Smart Contract</div>
              <div className={style.cardBody}>Balance: {balance} MSCN</div>
            </div>
          </Paper>
        </div>
        <div className={style.gridItem}>
          <Paper>
            <div className={style.card}>
              <div className={style.cardHead}>MSys Betting</div>
              <div className={style.cardBody}>Profit: 0 MSCN</div>
            </div>
          </Paper>
        </div>
        <div className={style.gridItem}>
          <Paper>
            <div className={style.card}>
              <div className={style.cardHead}>MSys Lottery</div>
              <div className={style.cardBody}>Profit: 0 MSCN</div>
            </div>
          </Paper>
        </div>
        <div className={style.gridItem}>
          <Paper>
            <div className={style.card}>
              <div className={style.cardHead}>MSys NFT</div>
              <div className={style.cardBody}>Profit: 0 MSCN</div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
