import { Paper, Table, TableContainer } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LotteryWinnersDialog } from "../../components/dialogs/lotteryWinnersDialog";
import UpdateLotteryDialog from "../../components/dialogs/updateLotteryDialog";
import {
  IdAndParticipantsLength,
  LotteryLoadingComponent,
  LotteryName,
  LotteryTableBody,
  LotteryTableHead,
  LotteryWinnersButton,
  StatusAndDate,
  TotalAmountAndTotalFees,
  UpdateStatusAndResultButtons,
} from "../../molecules/pages/lotteryDetails.atom";
import {
  setLottery,
  setParticipants,
} from "../../redux/redux-toolkit/lotteriesSlice";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/matchDetails.module.css";
import { convertStatus, convertTimestamp } from "../../utils/convertion";

// const sx = {
//   tableCell: {
//     textTransform: "capitalize",
//     cursor: "pointer",
//     textAlign: "center",
//   },
// };

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
    }
  }, [contract, query?.lotteryId]); //eslint-disable-line
  useEffect(() => {
    setLoading(true);
    if (contract && Number(query?.lotteryId) >= 0) {
      getLottery();
    }
  }, [contract, query?.lotteryId, participants]); //eslint-disable-line

  return (
    <LotteryLoadingComponent loading={loading}>
      <div className={style.container}>
        <LotteryName name={lottery.lotteryName} />
        <Paper className={style.matchDetails}>
          <StatusAndDate status={lottery.statusString} date={lottery.date} />
          <IdAndParticipantsLength
            id={query.lotteryId}
            length={participants.length}
          />
          <TotalAmountAndTotalFees
            amount={lottery.totalAmount}
            fees={lottery.totalFees}
          />
          <UpdateStatusAndResultButtons
            statusCode={lottery.statusCode}
            setStatusDialog={() => setStatusDialog(true)}
            announceResult={announceResult}
          />
          <LotteryWinnersButton
            statusCode={lottery.statusCode}
            setOpenWinners={() => setOpenWinners(true)}
          />
        </Paper>
        <div className={style.innerContainer}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <LotteryTableHead />
              <LotteryTableBody
                participants={participants}
                wholeAmount={lottery.wholeAmount}
                amount={lottery.amount}
                fees={lottery.fees}
              />
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
    </LotteryLoadingComponent>
  );
};

export default LotteryDetails;
