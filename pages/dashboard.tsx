import { Paper } from "@mui/material";
import React from "react";
import BarChart from "../components/atoms/barChart";
import style from "../styles/pages/dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={style.container}>
      <div className={style.bettingChart}>
        <Paper>
          <div className={style.chartName}>Participants</div>
        </Paper>
        <Paper>
          <BarChart />
        </Paper>
      </div>
      <div className={style.bettingChart}>
        <Paper>
          <div className={style.chartName}>Amount collected</div>
        </Paper>
        <Paper>
          <BarChart />
        </Paper>
      </div>
    </div>
  );
};

export default Dashboard;
