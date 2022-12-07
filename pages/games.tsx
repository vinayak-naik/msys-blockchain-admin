import {
  CircularProgress,
  IconButton,
  Pagination,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../styles/pages/user.module.css";
import { Delete, LibraryAdd, Refresh } from "@mui/icons-material";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import GamesTable from "../components/tables/gamesTable";
import AddGameDialog from "../components/dialogs/addGameDialog";

const Games = () => {
  const { gameContract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [games, setGames] = useState<any>([]);

  const deleteAllGamesHandler = async () => {
    setDeleting(true);
    try {
      const res = await gameContract.connect(signer).removeAllGames();
      await res.wait();
      getAllGames();
      setDeleting(false);
    } catch (error) {
      console.log("error:", error);
      setDeleting(false);
    }
  };
  const getAllGames = async () => {
    const games = await gameContract.getAllGames();
    const gamesList = games.map((item: any) => {
      return {
        gameId: Number(item.id),
        name: item.name,
        route: item.route,
        internalUrl: item.internalUrl,
        externalUrl: item.externalUrl ? "https://..." : "--",
        active: item.active ? "true" : "false",
        visibility: item.visibility ? "true" : "false",
      };
    });
    setGames(gamesList);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (gameContract) {
      getAllGames();
    }
  }, [gameContract]); //eslint-disable-line
  useEffect(() => {
    if (gameContract) {
      getAllGames();
    }
  }, [gameContract]); //eslint-disable-line

  const refreshPage = () => {
    setLoading(true);
    getAllGames();
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
                MSys Games
              </Typography>
              <div>
                <Tooltip title="Add Game" placement="top">
                  <IconButton onClick={() => setOpen(true)}>
                    <LibraryAdd />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete All Games" placement="top">
                  <IconButton
                    disabled={deleting}
                    onClick={deleteAllGamesHandler}
                  >
                    {deleting ? (
                      <CircularProgress size={16} color="inherit" />
                    ) : (
                      <Delete />
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </Paper>
          <GamesTable games={games} refreshPage={getAllGames} />
          <Paper
            sx={{
              margin: "1px 0",
              padding: "10px 20px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>&nbsp;&nbsp;</div>
            <Pagination count={1} page={1} />
            <Tooltip title="Refresh" placement="top">
              <IconButton onClick={refreshPage}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Paper>
          <AddGameDialog
            open={open}
            handleClose={() => setOpen(false)}
            refreshPage={getAllGames}
          />
        </div>
      )}
    </>
  );
};

export default Games;
