import Image from "next/image";
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
  NftProperties,
  NftSellButton,
  OwnerContainer,
} from "../../molecules/pages/nftDetails.atom";
import { setNft } from "../../redux/redux-toolkit/nftSlice";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/nftDetails.module.css";
import { compressAddress } from "../../utils/convertion";
import opensea from "../../public/img/opensea.png";

const NftDetails = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { nftContract } = useSelector((state: RootState) => state.contract);
  const { nft } = useSelector((state: RootState) => state.nfts);
  const [loading, setLoading] = useState(false);
  const nftContractAddress = `${process.env.NEXT_PUBLIC_NFT_CONTRACT}`;

  const getNft = async () => {
    const res = await nftContract.nfts(query.tokenId);
    const owner = await nftContract.ownerOf(query.tokenId);
    if (!res.tokenUri && !owner) return;
    try {
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
    } catch (error) {
      console.log(error);
      const nft = {
        tokenUri: res.tokenUri,
        forSale: res.forSale,
        hide: res.hide,
        price: Number(res.price),
        tokenId: Number(res.tokenId),
        owner: compressAddress(owner || ""),
        name: res.name,
        image: res.imageUrl,
        description: "",
        creator: compressAddress(""),
        createdAt: 0,
        background_color: "",
        attributes: [],
      };
      dispatch(setNft(nft));
      setLoading(false);
    }
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
          <NftSellButton
            price={nft.price}
            forSale={nft.forSale}
            currentOwner={nft.owner}
            refreshPage={getNft}
          />
          <div className={style.openseaContainer}>
            <div className={style.openseaText}>Sell NFT</div>
            <a
              target="blank2"
              href={`https://testnets.opensea.io/assets/mumbai/${nftContractAddress}/${query.tokenId}`}
              className={style.imageBox}
            >
              <Image
                alt="img"
                loader={({ src }: any) => src}
                src={opensea}
                height="50px"
                width="50px"
              />
              <div className={style.label}>Opensea</div>
            </a>
            <a
              target="blank"
              href={`https://testnet.rarible.com/token/polygon/${nftContractAddress}:${query.tokenId}?tab=overview`}
              className={style.imageBox}
            >
              <Image
                alt="img"
                loader={({ src }: any) => src}
                src={opensea}
                height="50px"
                width="50px"
              />
              <div className={style.label}>Rarible</div>
            </a>
          </div>
        </div>
      </div>
    </NftLoadingComponent>
  );
};

export default NftDetails;
