import style from "../styles/components/header.module.css";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import {
  setContract,
  setNftContract,
  setSigner,
} from "../redux/redux-toolkit/contractSlice";
import { RootState } from "../redux/store";
import ABI from "../public/abi.json";
import nftABI from "../public/nftAbi.json";
import { compressAddress } from "../utils/convertion";
import { IconButton } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";

declare var window: any;

const HeaderComponent = () => {
  const { push, back } = useRouter();
  const dispatch = useDispatch();
  const { signer } = useSelector((state: RootState) => state.contract);

  const [walletAddr, setWalletAddr] = useState("");
  const [shortWalletAddr, setShortWalletAddr] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  const contractAddress = `${process.env.NEXT_PUBLIC_ERC20_CONTRACT}`;
  const nftContractAddress = `${process.env.NEXT_PUBLIC_NFT_CONTRACT}`;

  const setSign = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const sign = provider.getSigner();
    dispatch(setSigner(sign));
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    const nftContract = new ethers.Contract(
      nftContractAddress,
      nftABI,
      provider
    );
    dispatch(setContract(contract));
    dispatch(setNftContract(nftContract));
  };

  useEffect(() => {
    setSign();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (signer) {
      connectMeta();
    }
  }, [signer]); //eslint-disable-line

  const connectMeta = async () => {
    const addr = await signer.getAddress();
    if (addr !== walletAddr) {
      const shortAddress = compressAddress(addr);
      setWalletAddr(addr);
      setShortWalletAddr(shortAddress);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.logoContainer}>
        <IconButton onClick={() => back()}>
          <ArrowBackOutlined sx={{ color: "rgb(182, 185, 196)" }} />
        </IconButton>
        <div className={style.logo} onClick={() => push("/")}>
          MSys Blockchain Admin
        </div>
      </div>
      <div className={style.rightBox}>
        <div className={style.navContainer}>
          {/* <div className={style.navItem} onClick={() => router.push("/")}>
            Home
          </div> */}
        </div>
        <div className={style.walletAddrBox}>
          {showAddress &&
            (walletAddr === "0x45ff073F1EA0f6C3F1EF1c8Eb184fB1074884F96" ? (
              <div className={style.walletAddr}>{shortWalletAddr}</div>
            ) : (
              <div className={style.status}>Not Connected</div>
            ))}
        </div>

        <button
          onClick={connectMeta}
          onMouseOverCapture={() => {
            setShowAddress(true);
            connectMeta();
          }}
          onMouseOutCapture={() => setShowAddress(false)}
          className={style.connectButton}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default HeaderComponent;
