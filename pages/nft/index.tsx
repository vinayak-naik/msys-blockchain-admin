import {
  IconButton,
  Pagination,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/pages/user.module.css";
import AddNFTDialog from "../../components/dialogs/addNFTDialog";
import { LibraryAdd, Refresh } from "@mui/icons-material";
import NftsTable from "../../components/atoms/nftsTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setNfts } from "../../redux/redux-toolkit/nftSlice";

const NFTs = () => {
  const { nftContract } = useSelector((state: RootState) => state.contract);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false); //eslint-disable-line
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getAllNFTs = async () => {
    const res = await nftContract.getAllNfts();
    const nfts = res.map((item: any) => {
      return {
        name: item.name,
        price: Number(item.price),
        tokenId: Number(item.tokenId),
        tokenUri: item.tokenUri,
        forSale: item.forSale,
        hide: item.hide,
      };
    });
    dispatch(setNfts(nfts));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (nftContract) {
      getAllNFTs();
    }
  }, [nftContract]); //eslint-disable-line

  return (
    <div style={{ padding: "50px" }}>
      <Paper sx={{ marginBottom: "0.5px", padding: "10px" }}>
        <div className={style.titleBox}>
          <Typography variant="h5" textAlign="center"></Typography>
          <Typography variant="h5" textAlign="center">
            NFTs
          </Typography>
          <Typography variant="h5" textAlign="center">
            <IconButton onClick={() => setOpen(true)}>
              <LibraryAdd />
            </IconButton>
          </Typography>
        </div>
      </Paper>
      <NftsTable />
      <Paper
        sx={{
          margin: "1px 0",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <Pagination count={1} page={page} onChange={handleChange} />
        <Tooltip title="Refresh" placement="top">
          <IconButton onClick={getAllNFTs}>
            <Refresh />
          </IconButton>
        </Tooltip>
      </Paper>

      <AddNFTDialog
        open={open}
        handleClose={() => setOpen(false)}
        refreshPage={getAllNFTs}
      />
    </div>
  );
};

export default NFTs;
