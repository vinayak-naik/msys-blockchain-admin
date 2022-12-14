import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MatchDetails } from "../../components/atoms/matchDetails";
import { Team1Details, Team2Details } from "../../components/atoms/teamDetails";
import MatchResultDialog from "../../components/dialogs/matchResultDialog";
import { TeamParticipantsDialog } from "../../components/dialogs/teamParticipantsDialog";
import UpdateMatchDialog from "../../components/dialogs/updateMatchDialog";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/matchDetails.module.css";
import {
  convertStatus,
  convertTimestampToDate,
  convertTimestampToTime,
} from "../../utils/convertion";

const Match = () => {
  const { query } = useRouter();
  const { bettingContract } = useSelector((state: RootState) => state.contract);
  const [participantsDialog, setParticipantsDialog] = useState(0);
  const [statusDialog, setStatusDialog] = useState(false);
  const [resultDialog, setResultDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<any>([]);
  const [team1, setTeam1] = useState<any>([]);
  const [team2, setTeam2] = useState<any>([]);

  const getMatch = async () => {
    const res = await bettingContract.matches(query.matchId);
    const matchDetails = {
      date: convertTimestampToDate(Number(res.timestamp)),
      time: convertTimestampToTime(Number(res.timestamp)),
      matchId: Number(res.matchId),
      game: res.game,
      team1: res.team1,
      team2: res.team2,
      statusCode: Number(res.statusCode),
      won: Number(res.won),
      statusString: convertStatus(Number(res.statusCode)),
    };
    setMatch(matchDetails);
  };

  const getAllParticipants = async () => {
    const team1 = await bettingContract.getAllParticipants(query.matchId, 1);
    const team2 = await bettingContract.getAllParticipants(query.matchId, 2);
    let team1Total = 0;
    let team2Total = 0;
    if (team1) {
      for (let i = 0; i < team1.length; i++) {
        team1Total += Number(team1[i].amount.toString());
      }
    }
    if (team2) {
      for (let i = 0; i < team2.length; i++) {
        team2Total += Number(team2[i].amount.toString());
      }
    }
    const team1AmountPercent = Math.round(
      (team1Total * 100) / (team1Total + team2Total)
    );
    const team2AmountPercent = Math.round(
      (team2Total * 100) / (team1Total + team2Total)
    );

    const team1ParticipantsPercent = Math.round(
      (team1.length * 100) / (team1.length + team2.length)
    );
    const team2ParticipantsPercent = Math.round(
      (team2.length * 100) / (team1.length + team2.length)
    );

    const team1Details = {
      users: team1,
      totalAmount: team1Total,
      totalParticipants: team1.length,
      amountPercent: team1AmountPercent,
      participantsPercent: team1ParticipantsPercent,
    };
    const team2Details = {
      users: team2,
      totalAmount: team2Total,
      totalParticipants: team2.length,
      amountPercent: team2AmountPercent,
      participantsPercent: team2ParticipantsPercent,
    };
    setTeam1(team1Details);
    setTeam2(team2Details);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (bettingContract && Number(query?.matchId) >= 0) {
      getMatch();
      getAllParticipants();
    }
  }, [bettingContract, query?.matchId]); //eslint-disable-line

  return (
    <>
      {loading ? (
        <div className={style.loadingBox}>
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className={style.container}>
          <MatchDetails
            match={match}
            team1={team1}
            team2={team2}
            setStatusDialog={() => setStatusDialog(true)}
            setResultDialog={() => setResultDialog(true)}
          />
          <div className={style.teamsContainer}>
            <div className={style.teamContainer}>
              <Team1Details
                match={match}
                team1={team1}
                setParticipantsDialog={() => setParticipantsDialog(1)}
              />
            </div>
            <div className={style.teamContainer}>
              <Team2Details
                match={match}
                team2={team2}
                setParticipantsDialog={() => setParticipantsDialog(2)}
              />
            </div>
          </div>
          <TeamParticipantsDialog
            match={match}
            team1={team1}
            team2={team2}
            participantsDialog={participantsDialog}
            handleClose={() => setParticipantsDialog(0)}
          />
          <UpdateMatchDialog
            open={statusDialog}
            handleClose={() => setStatusDialog(false)}
            matchId={query.matchId}
            refreshPage={getMatch}
          />
          <MatchResultDialog
            open={resultDialog}
            handleClose={() => setResultDialog(false)}
            matchId={query.matchId}
            refreshPage={getMatch}
            matchDetails={match}
          />
        </div>
      )}
    </>
  );
};

export default Match;
