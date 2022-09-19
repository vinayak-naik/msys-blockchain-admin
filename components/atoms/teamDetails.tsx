import { Paper } from "@mui/material";
import React from "react";
import CircularProgressBar from "../reusable/circularProgressBar";
import style from "../../styles/pages/matchDetails.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

export const Team1Details = (props: any) => {
  const { setParticipantsDialog } = props;
  const { match, team1 } = useSelector((state: RootState) => state.matches);
  const titleBoxStyle =
    match.won === 1
      ? style.titleBoxWon
      : match.won === 2
      ? style.titleBoxDefeat
      : style.titleBoxNormal;
  return (
    <>
      <Paper>
        <div className={titleBoxStyle}>{match.team1}</div>
      </Paper>
      <Paper className={style.progressContainer}>
        <CircularProgressBar
          percent={team1.participantsPercent}
          pathColor={team1.participantsPercent > 50 ? "#1ec91e" : "#ff5b00"}
          label="Participants"
          tooltip={`Percentage of Total Participants of team ${match.team1}`}
        />
        <CircularProgressBar
          percent={team1.amountPercent}
          pathColor={team1.amountPercent > 50 ? "#1ec91e" : "#ff5b00"}
          label="Amount"
          tooltip={`Percentage of Total Amount Collected for team ${match.team1}`}
        />
      </Paper>
      <Paper className={style.teamDetails}>
        <div className={style.textContainer}>
          <div className={style.textHead}>Total Participants:</div>
          <div className={style.text}>{team1.totalParticipants}</div>
        </div>
        <div className={style.textContainer}>
          <div className={style.textHead}>Total Amount:</div>
          <div className={style.text}>{team1.totalAmount}&nbsp;MSCN</div>
        </div>
      </Paper>
      <Paper>
        <div
          onClick={() => setParticipantsDialog()}
          className={style.participantsLink}
        >
          Participants List
        </div>
      </Paper>
    </>
  );
};
export const Team2Details = (props: any) => {
  const { setParticipantsDialog } = props;
  const { match, team2 } = useSelector((state: RootState) => state.matches);
  const titleBoxStyle =
    match.won === 2
      ? style.titleBoxWon
      : match.won === 1
      ? style.titleBoxDefeat
      : style.titleBoxNormal;
  return (
    <>
      <Paper>
        <div className={titleBoxStyle}>{match.team2}</div>
      </Paper>
      <Paper className={style.progressContainer}>
        <CircularProgressBar
          percent={team2.participantsPercent}
          pathColor={team2.participantsPercent > 50 ? "#1ec91e" : "#ff5b00"}
          label="Participants"
          tooltip={`Percentage of Total Participants of team ${match.team2}`}
        />
        <CircularProgressBar
          percent={team2.amountPercent}
          pathColor={team2.amountPercent > 50 ? "#1ec91e" : "#ff5b00"}
          label="Amount"
          tooltip={`Percentage of Total Amount Collected for team ${match.team2}`}
        />
      </Paper>
      <Paper className={style.teamDetails}>
        <div className={style.textContainer}>
          <div className={style.textHead}>Total Participants:</div>
          <div className={style.text}>{team2.totalParticipants}</div>
        </div>
        <div className={style.textContainer}>
          <div className={style.textHead}>Total Amount:</div>
          <div className={style.text}>{team2.totalAmount}&nbsp;MSCN</div>
        </div>
      </Paper>
      <Paper>
        <div
          onClick={() => setParticipantsDialog()}
          className={style.participantsLink}
        >
          Participants List
        </div>
      </Paper>
    </>
  );
};
