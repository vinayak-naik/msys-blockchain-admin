import {
  CircularProgress,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import style from "../../styles/pages/matchDetails.module.css";

const sx = {
  tableCell: {
    textTransform: "capitalize",
    cursor: "pointer",
    textAlign: "center",
  },
};

export const LotteryName = ({ name }: any) => {
  return (
    <Paper>
      <div className={style.lotteryNamePaper}>
        <h3>{name}</h3>
      </div>
    </Paper>
  );
};
export const StatusAndDate = ({ status, date }: any) => {
  return (
    <div className={style.textBox}>
      <div className={style.textContainer}>
        <div className={style.textHead}>Status:</div>
        <div className={style.text}>{status}</div>
      </div>
      <div className={style.textContainer}>
        <div className={style.textHead}>Date:</div>
        <div className={style.text}>{date}</div>
      </div>
    </div>
  );
};
export const IdAndParticipantsLength = ({ id, length }: any) => {
  return (
    <div className={style.textBox}>
      <div className={style.textContainer}>
        <div className={style.textHead}>Lottery Id:</div>
        <div className={style.text}>{id}</div>
      </div>
      <div className={style.textContainer}>
        <div className={style.textHead}>Total Participants:</div>
        <div className={style.text}>{length}</div>
      </div>
    </div>
  );
};
export const TotalAmountAndTotalFees = ({ amount, fees }: any) => {
  return (
    <div className={style.textBox}>
      <div className={style.textContainer}>
        <div className={style.textHead}>Total Amount:</div>
        <div className={style.text}>{amount}&nbsp;MSCN</div>
      </div>
      <div className={style.textContainer}>
        <div className={style.textHead}>Total Fees:</div>
        <div className={style.text}>{fees}&nbsp;MSCN</div>
      </div>
    </div>
  );
};
export const UpdateStatusAndResultButtons = (props: any) => {
  const { statusCode, setStatusDialog, announceResult } = props;
  return (
    <div className={style.textBox}>
      <div className={style.textContainer}>
        <button onClick={setStatusDialog} className={style.statusButton}>
          Update&nbsp;Status
        </button>
      </div>
      {statusCode === 2 && (
        <div className={style.textContainer}>
          <button onClick={announceResult} className={style.statusButton}>
            Announce&nbsp;Result
          </button>
        </div>
      )}
    </div>
  );
};
export const LotteryWinnersButton = (props: any) => {
  const { statusCode, setOpenWinners } = props;
  return (
    <div className={style.textBox}>
      {statusCode === 3 && (
        <div className={style.textContainer}>
          <button onClick={setOpenWinners} className={style.statusButton}>
            Lottery Winners
          </button>
        </div>
      )}
    </div>
  );
};
export const LotteryTableHead = () => {
  return (
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
  );
};

export const LotteryTableBody = (props: any) => {
  const { participants, wholeAmount, amount, fees } = props;
  return (
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
            {(wholeAmount * item.repeat).toFixed(2)}
            &nbsp;MSCN
          </TableCell>
          <TableCell sx={sx.tableCell}>
            {(amount * item.repeat).toFixed(2)}&nbsp;MSCN
          </TableCell>
          <TableCell sx={sx.tableCell}>
            {(fees * item.repeat).toFixed(2)}&nbsp;MSCN
          </TableCell>
          <TableCell sx={sx.tableCell}>
            {((item.repeat / item.totalParticipants) * 100).toFixed(2)}%
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
export const LotteryLoadingComponent = (props: any) => {
  const { loading, children } = props;
  if (loading) {
    return (
      <div className={style.loadingBox}>
        <CircularProgress color="success" />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
