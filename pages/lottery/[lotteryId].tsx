import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LotteryWinnersDialog } from "../../components/dialogs/lotteryWinnersDialog";
import UpdateLotteryDialog from "../../components/dialogs/updateLotteryDialog";
import {
  setLottery,
  setParticipants,
} from "../../redux/redux-toolkit/lotteriesSlice";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/matchDetails.module.css";
import { convertStatus, convertTimestamp } from "../../utils/convertion";

const sx = {
  tableCell: {
    textTransform: "capitalize",
    cursor: "pointer",
    textAlign: "center",
  },
};

const LotteryDetails = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { contract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const { lottery, participants } = useSelector(
    (state: RootState) => state.lotteries
  );

  const [statusDialog, setStatusDialog] = useState(false);
  const [openWinners, setOpenWinners] = useState(false);
  const [lotteryWinners, setLotteryWinners] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshPage = () => {
    setTimeout(() => {
      getLottery();
    }, 15000);
    setTimeout(() => {
      getLottery();
    }, 20000);
    setTimeout(() => {
      getLottery();
    }, 25000);
    setTimeout(() => {
      getLottery();
    }, 40000);
  };

  const getLottery = async () => {
    const res = await contract.lotteries(query.lotteryId);
    const amount = Number(res.amount.toString()) * 0.99;
    const fees = Number(res.amount.toString()) * 0.01;
    const lottery = {
      date: convertTimestamp(Number(res.date)),
      lotteryId: Number(res.lotteryId),
      lotteryName: res.lotteryName,
      wholeAmount: Number(res.amount),
      amount,
      fees,
      statusCode: Number(res.statusCode),
      statusString: convertStatus(Number(res.statusCode)),
      totalAmount: Math.round(amount * participants.length),
      totalFees: Math.round(fees * participants.length),
    };
    dispatch(setLottery(lottery));
    setLoading(false);
    if (Number(res.statusCode) === 3) {
      const winners = await contract.lotteryWinners(query.lotteryId);
      setLotteryWinners(winners);
    }
  };
  const getParticipants = async () => {
    const res = await contract.getLotteryParticipants(query.lotteryId);
    const totalParticipants = res.length;
    const arr: any = [];
    res.forEach((item: any) => {
      const index = arr.findIndex((e: any) => e.address === item);
      if (index >= 0) {
        arr[index].repeat = arr[index].repeat + 1;
      } else {
        arr.push({ address: item, repeat: 1, totalParticipants });
      }
    });
    dispatch(setParticipants(arr));
  };

  const announceResult = async () => {
    await contract.connect(signer).announceLotteryResult(query.lotteryId);
    refreshPage();
  };

  useEffect(() => {
    setLoading(true);
    if (contract && Number(query?.lotteryId) >= 0) {
      getParticipants();
      getLottery();
    }
  }, [contract, query?.lotteryId]); //eslint-disable-line

  return (
    <>
      {loading ? (
        <div className={style.loadingBox}>
          <CircularProgress color="success" />
        </div>
      ) : (
        <div className={style.container}>
          <Paper>
            <div className={style.lotteryNamePaper}>
              <h3>{lottery.lotteryName}</h3>
            </div>
          </Paper>
          <Paper className={style.matchDetails}>
            <div className={style.textBox}>
              <div className={style.textContainer}>
                <div className={style.textHead}>Status:</div>
                <div className={style.text}>{lottery.statusString}</div>
              </div>
              <div className={style.textContainer}>
                <div className={style.textHead}>Date:</div>
                <div className={style.text}>{lottery.date}</div>
              </div>
            </div>
            <div className={style.textBox}>
              <div className={style.textContainer}>
                <div className={style.textHead}>Lottery Id:</div>
                <div className={style.text}>{query.lotteryId}</div>
              </div>
              <div className={style.textContainer}>
                <div className={style.textHead}>Total Participants:</div>
                <div className={style.text}>{participants.length}</div>
              </div>
            </div>
            <div className={style.textBox}>
              <div className={style.textContainer}>
                <div className={style.textHead}>Total Amount:</div>
                <div className={style.text}>
                  {lottery.totalAmount}&nbsp;MSCN
                </div>
              </div>
              <div className={style.textContainer}>
                <div className={style.textHead}>Total Fees:</div>
                <div className={style.text}>{lottery.totalFees}&nbsp;MSCN</div>
              </div>
            </div>
            <div className={style.textBox}>
              <div className={style.textContainer}>
                <button
                  onClick={() => setStatusDialog(true)}
                  className={style.statusButton}
                >
                  Update&nbsp;Status
                </button>
              </div>
              {lottery.statusCode === 2 && (
                <div className={style.textContainer}>
                  <button
                    onClick={announceResult}
                    className={style.statusButton}
                  >
                    Announce&nbsp;Result
                  </button>
                </div>
              )}
            </div>
            {/* ------------------------------- */}
            <div className={style.textBox}>
              {lottery.statusCode === 3 && (
                <div className={style.textContainer}>
                  <button
                    onClick={() => setOpenWinners(true)}
                    className={style.statusButton}
                  >
                    Lottery Winners
                  </button>
                </div>
              )}
            </div>
          </Paper>

          <div className={style.innerContainer}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={sx.tableCell}>Sl No.</TableCell>
                    <TableCell sx={sx.tableCell}>Wallet Address</TableCell>
                    <TableCell sx={sx.tableCell}>Count</TableCell>
                    <TableCell sx={sx.tableCell}>Paid Amount</TableCell>
                    <TableCell sx={sx.tableCell}>Lottery Amount</TableCell>
                    <TableCell sx={sx.tableCell}>Fees</TableCell>
                    <TableCell sx={sx.tableCell}>% Total Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {participants.map((item: any, index: number) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={sx.tableCell}>{index + 1}</TableCell>
                      <TableCell sx={sx.tableCell}>{item.address}</TableCell>
                      <TableCell sx={sx.tableCell}>{item.repeat}</TableCell>
                      <TableCell sx={sx.tableCell}>
                        {(lottery.wholeAmount * item.repeat).toFixed(2)}
                        &nbsp;MSCN
                      </TableCell>
                      <TableCell sx={sx.tableCell}>
                        {(lottery.amount * item.repeat).toFixed(2)}&nbsp;MSCN
                      </TableCell>
                      <TableCell sx={sx.tableCell}>
                        {(lottery.fees * item.repeat).toFixed(2)}&nbsp;MSCN
                      </TableCell>
                      <TableCell sx={sx.tableCell}>
                        {((item.repeat / item.totalParticipants) * 100).toFixed(
                          2
                        )}
                        %
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <UpdateLotteryDialog
            open={statusDialog}
            handleClose={() => setStatusDialog(false)}
            lotteryId={query.lotteryId}
            refreshPage={refreshPage}
          />
          <LotteryWinnersDialog
            openWinners={openWinners}
            handleClose={() => setOpenWinners(false)}
            lotteryWinners={lotteryWinners}
            lottery={lottery}
          />
        </div>
      )}
    </>
  );
};

export default LotteryDetails;
