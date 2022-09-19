import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import style from "../../styles/components/reusable/circularProgress.module.css";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip } from "@mui/material";

interface CircularProgressBarIF {
  percent: number;
  pathColor: string;
  label: string;
  tooltip: string;
}

const CircularProgressBar = (props: CircularProgressBarIF) => {
  const { percent, pathColor, label, tooltip } = props;
  return (
    <div className={style.container}>
      <CircularProgressbar
        value={percent > 0 ? percent : 0}
        text={`${percent > 0 ? percent : 0}%`}
        styles={buildStyles({
          strokeLinecap: "butt",
          textSize: "20px",
          pathTransitionDuration: 0.5,
          pathColor: pathColor,
          textColor: "blue",
          trailColor: "#d6d6d6",
          backgroundColor: "red",
        })}
      />
      <Tooltip title={tooltip} placement="top">
        <div className={style.label}>{label}</div>
      </Tooltip>
    </div>
  );
};

export default CircularProgressBar;
