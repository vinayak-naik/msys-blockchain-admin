import React from "react";
import { Paper } from "@mui/material";
import style from "../../styles/pages/matchDetails.module.css";
import { useRouter } from "next/router";

export const MatchDetails = (props: any) => {
  const { setStatusDialog, setResultDialog, match, team1, team2 } = props;
  const { query } = useRouter();
  return (
    <Paper className={style.matchDetails}>
      <div className={style.textBox}>
        <div className={style.textContainer}>
          <div className={style.textHead}>Game:</div>
          <div className={style.text}>{match.game}</div>
        </div>
        <div className={style.textContainer}>
          <div className={style.textHead}>Status:</div>
          <div className={style.text}>{match.statusString}</div>
        </div>
      </div>
      <div className={style.textBox}>
        <div className={style.textContainer}>
          <div className={style.textHead}>Date:</div>
          <div className={style.text}>{match.date}</div>
        </div>
        <div className={style.textContainer}>
          <div className={style.textHead}>Time:</div>
          <div className={style.text}>{match.time}</div>
        </div>
      </div>
      <div className={style.textBox}>
        <div className={style.textContainer}>
          <div className={style.textHead}>Match Id:</div>
          <div className={style.text}>{query.matchId}</div>
        </div>
        <div className={style.textContainer}>
          <div className={style.textHead}>Total Participants:</div>
          <div className={style.text}>
            {team1.totalParticipants + team2.totalParticipants}
          </div>
        </div>
      </div>
      <div className={style.textBox}>
        <div className={style.textContainer}>
          <div className={style.textHead}>Total Amount:</div>
          <div className={style.text}>
            {team1.totalAmount + team2.totalAmount}&nbsp;MSCN
          </div>
        </div>
        <div className={style.textContainer}>
          <div className={style.textHead}>Total Fees:</div>
          <div className={style.text}>
            {Math.round((team1.totalAmount + team2.totalAmount) / 99)}
            &nbsp;MSCN
          </div>
        </div>
      </div>
      <div className={style.textBox}>
        {match.statusCode === 3 && (
          <div className={style.textContainer}>
            <div className={style.textHead}>Won:</div>
            <div className={style.text}>
              {match.won === 1
                ? match.team1
                : match.won === 2
                ? match.team2
                : "Draw"}
            </div>
          </div>
        )}
        <div className={style.textContainer}>
          <button
            onClick={() => setStatusDialog()}
            className={style.statusButton}
          >
            Update&nbsp;Status
          </button>
        </div>
        {match.statusCode === 2 && (
          <div className={style.textContainer}>
            <button
              onClick={() => setResultDialog()}
              className={style.statusButton}
            >
              Announce&nbsp;Result
            </button>
          </div>
        )}
      </div>
    </Paper>
  );
};
