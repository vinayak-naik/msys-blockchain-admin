import {
  IconButton,
  Pagination,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/pages/user.module.css";
import AddNFTDialog from "../../components/dialogs/addNftDialog";
import { LibraryAdd, Refresh } from "@mui/icons-material";
import NftsTable from "../../components/tables/nftsTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setNfts } from "../../redux/redux-toolkit/nftSlice";
import { PageLoadingComponent } from "../../components/reusable/pageLoading";

const NFTs = () => {
  const { nftContract } = useSelector((state: RootState) => state.contract);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const count = 8;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getAllNFTs = async () => {
    const length = await nftContract.countAllNfts();
    const pageNo = Math.ceil(Number(length) / count);
    setTotalPages(pageNo);
    const from = (page - 1) * count;
    const to = from + count;
    const usersArr = [];

    for (let i = from; i < to; i++) {
      if (i < Number(length)) {
        const res = await nftContract.nfts(i);
        usersArr.push(res);
      }
    }
    const nfts = usersArr.map((item: any) => {
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
  useEffect(() => {
    if (nftContract) {
      getAllNFTs();
    }
  }, [page]); //eslint-disable-line

  return (
    <PageLoadingComponent loading={loading}>
      <div style={{ padding: "30px 30px 0" }}>
        <Paper sx={{ marginBottom: "0.5px", padding: "10px" }}>
          <div className={style.titleBox}>
            <Typography variant="h5" textAlign="center"></Typography>
            <Typography variant="h5" textAlign="center">
              MSys NFT
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
          <Pagination count={totalPages} page={page} onChange={handleChange} />
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
    </PageLoadingComponent>
  );
};

export default NFTs;
