import style from "../styles/components/header.module.css";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { useSelector, useDispatch } from "react-redux";
import { setContract, setSigner } from "../redux/redux-toolkit/contractSlice";
import { RootState } from "../redux/store";
import ABI from "../public/abi.json";
import { compressAddress } from "../utils/convertion";
import { IconButton } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";

declare var window: any;

const HeaderComponent = () => {
  const { push, back } = useRouter();
  const dispatch = useDispatch();
  const { signer } = useSelector((state: RootState) => state.contract);

  const [walletAddr, setWalletAddr] = useState("");
  const [showAddress, setShowAddress] = useState(false);

  const contractAddress = "0xe7f309b8cd388d1723b6ACe24E7b8000A3099283";

  const setSign = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const sign = provider.getSigner();
    dispatch(setSigner(sign));
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    dispatch(setContract(contract));
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
    const shortAddress = compressAddress(addr);
    setWalletAddr(shortAddress);
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
            (walletAddr ? (
              <div className={style.walletAddr}>{walletAddr}</div>
            ) : (
              <div className={style.status}>Not Connected</div>
            ))}
        </div>

        <button
          onClick={connectMeta}
          onMouseOverCapture={() => setShowAddress(true)}
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
