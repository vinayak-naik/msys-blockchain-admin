import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { IconButton, Tooltip } from "@mui/material";
import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import style from "../../styles/components/small/userTable.module.css";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const sx = {
  tableCell: {
    textTransform: "capitalize",
    padding: "12px",
  },
};

export default function NftsTable() {
  const { push } = useRouter();
  const { nfts } = useSelector((state: RootState) => state.nfts);

  const nftDetails = (item: any) => {
    push(`/nft/${item.tokenId}`);
  };
  const parentClickHandler = (event: any, item: any) => {
    event.preventDefault();
    if (event.target === event.currentTarget) {
      push(`/nft/${item.tokenId}`);
    }
  };

  return (
    <div className={style.container}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sl. No.</TableCell>
              <TableCell>Token Id</TableCell>
              <TableCell sx={sx.tableCell}>Name</TableCell>
              <TableCell sx={sx.tableCell}>Token Uri</TableCell>
              <TableCell sx={sx.tableCell}>Price</TableCell>
              <TableCell sx={sx.tableCell}>Visibility</TableCell>
              <TableCell sx={sx.tableCell}>For Sale</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nfts.map((item: any, index: number) => (
              <TableRow
                key={item.tokenId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell onClick={() => nftDetails(item)} sx={sx.tableCell}>
                  {index + 1}
                </TableCell>
                <TableCell onClick={() => nftDetails(item)} sx={sx.tableCell}>
                  {item.tokenId}
                </TableCell>
                <TableCell onClick={() => nftDetails(item)} sx={sx.tableCell}>
                  {item.name}
                </TableCell>
                <TableCell
                  onClick={(e: any) => parentClickHandler(e, item)}
                  sx={sx.tableCell}
                  component="th"
                  scope="row"
                >
                  {item.tokenUri}&nbsp;
                  <Tooltip title="Copy" placement="top">
                    <IconButton
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `https://gateway.pinata.cloud/ipfs/${item.tokenUri}`
                        )
                      }
                    >
                      <ContentCopyRoundedIcon
                        style={{ fontSize: 12 }}
                        sx={{ marginBottom: "4px" }}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell onClick={() => nftDetails(item)} sx={sx.tableCell}>
                  {item.price}&nbsp;MSCN
                </TableCell>

                <TableCell sx={sx.tableCell}>
                  {item.hide ? (
                    <Tooltip title="Hidden" placement="top">
                      <IconButton
                        color="error"
                        sx={{ cursor: "default", marginLeft: "2px" }}
                      >
                        <VisibilityOff sx={{ fontSize: "16px" }} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Visible" placement="top">
                      <IconButton
                        color="success"
                        sx={{ cursor: "default", marginLeft: "2px" }}
                      >
                        <Visibility sx={{ fontSize: "16px" }} />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell onClick={() => nftDetails(item)} sx={sx.tableCell}>
                  {item.forSale ? (
                    <Check fontSize="small" style={{ marginLeft: "15px" }} />
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
