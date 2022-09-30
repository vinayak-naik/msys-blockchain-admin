import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NftDescription,
  NftImage,
  NftImageLink,
  NftLoadingComponent,
  NftMetaData,
  NftName,
  NftPrice,
  NftProperties,
  OwnerContainer,
} from "../../molecules/pages/nftDetails.atom";
import { setNft } from "../../redux/redux-toolkit/nftSlice";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/nftDetails.module.css";
import { compressAddress } from "../../utils/convertion";

const NftDetails = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { nftContract } = useSelector((state: RootState) => state.contract);
  const { nft } = useSelector((state: RootState) => state.nfts);
  const [loading, setLoading] = useState(false);

  const getNft = async () => {
    const res = await nftContract.NFTs(query.tokenId);
    const owner = await nftContract.ownerOf(query.tokenId);
    if (!res.tokenUri && !owner) return;
    const promise = await fetch(
      `https://gateway.pinata.cloud/ipfs/${res.tokenUri}`
    );
    const data = await promise.json();
    const nft = {
      tokenUri: res.tokenUri,
      forSale: res.forSale,
      hide: res.hide,
      price: Number(res.price),
      tokenId: Number(res.tokenId),
      owner: compressAddress(owner || ""),
      name: data.name,
      image: data.image,
      description: data.description,
      creator: compressAddress(data.creator || ""),
      createdAt: data.createdAt,
      background_color: data.background_color,
      attributes: data.attributes,
    };
    dispatch(setNft(nft));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (nftContract && Number(query?.tokenId) >= 0) {
      getNft();
    }
  }, [nftContract, query?.tokenId]); //eslint-disable-line
  return (
    <NftLoadingComponent loading={loading}>
      <div className={style.container}>
        <div className={style.containerLeftBox}>
          <NftImage link={nft.image} />
          <NftImageLink link={nft.image} />
          <NftDescription description={nft.description} />
          <NftProperties properties={nft.attributes} />
        </div>
        <div className={style.containerRightBox}>
          <NftName name={nft.name} />
          <NftMetaData link={nft.tokenUri} />
          <OwnerContainer creator={nft.creator} currentOwner={nft.owner} />
          <NftPrice price={nft.price} forSale={nft.forSale} />
        </div>
      </div>
    </NftLoadingComponent>
  );
};

export default NftDetails;
