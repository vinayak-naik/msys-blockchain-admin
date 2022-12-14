import { FormControlLabel, Pagination, Paper, Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../components/atoms/barChart";
import { RootState } from "../redux/store";
import style from "../styles/pages/dashboard.module.css";

const Dashboard = () => {
  const { userContract, bettingContract, lotteryContract, nftContract } =
    useSelector((state: RootState) => state.contract);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState<any>({});
  const [participants, setParticipants] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [showStatistics, setShowStatistics] = useState(false);

  const count = 6;

  const handleChange = (value: number) => {
    setPage(value);
  };

  const getParticipantsArray = async () => {
    const bettingLength = await bettingContract.getMatchesLength();
    const lotteryLength = await lotteryContract.getLotteriesLength();
    const bettingArray = [];
    const lotteryArray = [];
    for (let i = 0; i < 5; i++) {
      if (bettingLength >= i) {
        const team1 = await bettingContract.getParticipantsLength(i, 1);
        const team2 = await bettingContract.getParticipantsLength(i, 2);
        bettingArray.push(Number(team1) + Number(team2));
      }
      if (lotteryLength >= i) {
        const length = await lotteryContract.getLotteryParticipantsLength(i);
        lotteryArray.push(Number(length));
      }
    }
    setParticipants({
      bettingArray,
      lotteryArray,
    });
  };

  const getAmountArray = async () => {
    const details: any = {};

    const bettingArr = await bettingContract.getBettingAmountArray();
    const lotteryArr = await lotteryContract.getLotteryAmountArray();
    const SC_bal = await userContract.getBalanceOfSM();
    const usersLength = await userContract.getUsersLength();
    const nftLength = await nftContract.countAllNfts();

    details.totalMatches = bettingArr.length;
    details.totalLotteries = lotteryArr.length;
    details.totalNfts = Number(nftLength);
    details.bettingPages = Math.ceil(bettingArr.length / count);
    details.lotteryPages = Math.ceil(lotteryArr.length / count);
    details.smBalance = Number(SC_bal);
    const arr1: any = [];
    bettingArr.forEach((e: any) => {
      arr1.push(Number(e));
    }, []);
    details.bettingAmountArray = arr1;
    const bettingTotalAmount = arr1.reduce((a: any, b: any) => a + b);
    const bettingProfit = bettingTotalAmount / 100 - bettingArr.length * 1000;
    details.bettingProfit = bettingProfit;

    const arr2: any = [];
    lotteryArr.forEach((e: any) => {
      arr2.push(Number(e));
    }, []);
    details.lotteryAmountArray = arr2;
    const lotteryTotalAmount = arr2.reduce((a: any, b: any) => a + b);
    const lotteryProfit = lotteryTotalAmount / 100 - lotteryArr.length * 1000;
    details.lotteryProfit = lotteryProfit;

    details.SCProfit =
      lotteryProfit + bettingProfit - Number(usersLength) * 5000;

    setInfo(details);
    setLoading(false);
  };

  useEffect(() => {
    if (nftContract && showStatistics) {
      setLoading(true);
      getParticipantsArray();
      getAmountArray();
    }
  }, [nftContract, showStatistics]); //eslint-disable-line

  return (
    <div className={style.container}>
      <div className={style.chartContainer}>
        <div className={style.bettingChart}>
          <Paper>
            <div className={style.chartName}>Participants</div>
            <BarChart
              array1={participants.bettingArray}
              array2={participants.lotteryArray}
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
              count={info.bettingPages}
              page={page}
              onChange={(e: any, val: number) => handleChange(val)}
            />
          </Paper>
        </div>
        <div className={style.bettingChart}>
          <Paper>
            <div className={style.chartName}>Amount collected</div>
            <BarChart
              array1={info.bettingAmountArray}
              array2={info.lotteryAmountArray}
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
              count={info.lotteryPages}
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
              <div className={style.cardBody}>
                Balance: {info.smBalance || 0} MSCN
              </div>
              <div className={style.cardBody}>
                {info.SCProfit >= 0 ? (
                  <span>Profit</span>
                ) : (
                  <span style={{ color: "red" }}>Loss</span>
                )}
                :&nbsp;
                {Math.abs(info.SCProfit || 0)} MSCN
              </div>
            </div>
          </Paper>
        </div>
        <div className={style.gridItem}>
          <Paper>
            <div className={style.card}>
              <div className={style.cardHead}>MSys Betting</div>
              <div className={style.cardBody}>
                Total Matches: {info.totalMatches}
              </div>
              <div className={style.cardBody}>
                {info.bettingProfit >= 0 ? (
                  <span>Profit</span>
                ) : (
                  <span style={{ color: "red" }}>Loss</span>
                )}
                :&nbsp;
                {Math.abs(info.bettingProfit || 0) || 0} MSCN
              </div>
            </div>
          </Paper>
        </div>
        <div className={style.gridItem}>
          <Paper>
            <div className={style.card}>
              <div className={style.cardHead}>MSys Lottery</div>
              <div className={style.cardBody}>
                Total Lotteries: {info.totalLotteries}
              </div>
              <div className={style.cardBody}>
                {info.lotteryProfit >= 0 ? (
                  <span>Profit</span>
                ) : (
                  <span style={{ color: "red" }}>Loss</span>
                )}
                :&nbsp;
                {Math.abs(info.lotteryProfit || 0)} MSCN
              </div>
            </div>
          </Paper>
        </div>
        <div className={style.gridItem}>
          <Paper>
            <div className={style.card}>
              <div className={style.cardHead}>MSys NFT</div>
              <div className={style.cardBody}>Total NFT: {info.totalNfts}</div>
              <div className={style.cardBody}>Profit: 0 MSCN</div>
            </div>
          </Paper>
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        <FormControlLabel
          control={
            <Switch
              onChange={(e: any) => setShowStatistics(e.target.checked)}
            />
          }
          label={loading ? "Loading..." : "Show Statistics"}
        />
      </div>
    </div>
  );
};

export default Dashboard;
