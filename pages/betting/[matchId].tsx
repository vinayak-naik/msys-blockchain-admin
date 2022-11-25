import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MatchDetails } from "../../components/atoms/matchDetails";
import { Team1Details, Team2Details } from "../../components/atoms/teamDetails";
import MatchResultDialog from "../../components/dialogs/matchResultDialog";
import { TeamParticipantsDialog } from "../../components/dialogs/teamParticipantsDialog";
import UpdateMatchDialog from "../../components/dialogs/updateMatchDialog";
import { setMatch } from "../../redux/redux-toolkit/matchesSlice";
import { setTeam1, setTeam2 } from "../../redux/redux-toolkit/matchesSlice";
// import { setMatch } from "../../redux/redux-toolkit/matchSlice";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/matchDetails.module.css";
import {
  convertStatus,
  convertTimestampToDate,
  convertTimestampToTime,
} from "../../utils/convertion";

const Match = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { match } = useSelector((state: RootState) => state.matches);
  const { contract } = useSelector((state: RootState) => state.contract);
  const [participantsDialog, setParticipantsDialog] = useState(0);
  const [statusDialog, setStatusDialog] = useState(false);
  const [resultDialog, setResultDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const getMatch = async () => {
    const res = await contract.matches(query.matchId);
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
    dispatch(setMatch(matchDetails));
  };

  const getAllParticipants = async () => {
    const team1 = await contract.getAllParticipants(query.matchId, 1);
    const team2 = await contract.getAllParticipants(query.matchId, 2);
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
    dispatch(setTeam1(team1Details));
    dispatch(setTeam2(team2Details));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (contract && Number(query?.matchId) >= 0) {
      getMatch();
      getAllParticipants();
    }
  }, [contract, query?.matchId]); //eslint-disable-line

  return (
    <>
      {loading ? (
        <div className={style.loadingBox}>
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className={style.container}>
          <MatchDetails
            setStatusDialog={() => setStatusDialog(true)}
            setResultDialog={() => setResultDialog(true)}
          />
          <div className={style.teamsContainer}>
            <div className={style.teamContainer}>
              <Team1Details
                setParticipantsDialog={() => setParticipantsDialog(1)}
              />
            </div>
            <div className={style.teamContainer}>
              <Team2Details
                setParticipantsDialog={() => setParticipantsDialog(2)}
              />
            </div>
          </div>
          <TeamParticipantsDialog
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
