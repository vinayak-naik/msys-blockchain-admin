import { IconButton, Pagination, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import style from "../../styles/pages/user.module.css";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import AddNFTDialog from "../../components/dialogs/addNFTDialog";
import axios from "axios";
import Image from "next/image";

const Users = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [fileImg, setFileImg] = useState<any>();
  const [hash, setHash] = useState<any>();

  const sendFileToIPFS = async (e: any) => {
    e.preventDefault();
    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append("file", fileImg);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `763c88b00386bea1dbf7`,
            pinata_secret_api_key: `cdbc63c53584d623eaf42aea3d0aa8bf1b5549d9c8c44436d187415192127f4d`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = resFile.data.IpfsHash;
        setHash(ImgHash);
        console.log(ImgHash);
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

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
              <GroupAddOutlinedIcon />
            </IconButton>
          </Typography>
        </div>
      </Paper>
      <Paper
        sx={{
          margin: "1px 0",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination count={1} page={page} onChange={handleChange} />
      </Paper>
      <form onSubmit={sendFileToIPFS}>
        <input
          type="file"
          accept="image/*"
          onChange={(e: any) =>
            setFileImg(e?.target?.files[0] ? e.target?.files[0] : null)
          }
          required
        />
        <button type="submit">Mint NFT</button>
      </form>
      {hash && (
        <Image
          loader={(e) => e.src}
          src={`https://gateway.pinata.cloud/ipfs/${hash}`}
          alt="Picture of the author"
          width={304}
          height={156}
        />
      )}
      <AddNFTDialog open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Users;
