import { AccountCircle, Launch } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import Image from "next/image";
import React from "react";
import style from "../../styles/pages/nftDetails.module.css";

export const NftImage = ({ link }: any) => {
  return (
    <div className={style.imageContainer}>
      {link && (
        <Image
          alt="img"
          width="500px"
          height="500px"
          loader={({ src }: any) => src}
          src={link}
          style={{ borderRadius: "10px" }}
        />
      )}
    </div>
  );
};
export const NftDescription = ({ description }: any) => {
  return (
    <div className={style.nftDescription}>
      <div className={style.nftDescriptionHead}>Description</div>
      <div className={style.nftDescriptionBody}>{description}</div>
    </div>
  );
};
export const NftProperties = ({ properties }: any) => {
  return (
    <div className={style.nftProperties}>
      <div className={style.nftPropertiesHead}>Properties</div>
      <div className={style.nftPropertiesBody}>
        {properties &&
          properties.map((item: any, index: number) => (
            <div key={index} className={style.nftPropertyBox}>
              <div className={style.trait}>{item.trait_type}</div>
              <div className={style.value}>{item.value}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
export const OwnerContainer = (props: any) => {
  const { creator, currentOwner } = props;
  return (
    <div className={style.ownerContainer}>
      <div className={style.ownerWrap}>
        <div className={style.avatarBox}>
          <AccountCircle color="warning" sx={{ fontSize: "42px" }} />
        </div>
        <div className={style.owner}>
          <div className={style.ownerHead}>Creator</div>
          <div className={style.ownerBody}>{creator}</div>
        </div>
      </div>
      <div className={style.ownerWrap}>
        <div className={style.avatarBox}>
          <AccountCircle color="success" sx={{ fontSize: "42px" }} />
        </div>
        <div className={style.owner}>
          <div className={style.ownerHead}>Current Owner</div>
          <div className={style.ownerBody}>{currentOwner}</div>
        </div>
      </div>
    </div>
  );
};
export const NftPrice = (props: any) => {
  const { price, forSale } = props;
  return (
    <div className={style.nftPrice}>
      <div className={style.nftPriceHead}>Price:&nbsp;{price}&nbsp;MSCN</div>
      <div className={style.nftPriceBody}>
        <Button variant="contained">
          {forSale ? `Buy now for ${price} MSCN` : "Not for sale"}
        </Button>
      </div>
    </div>
  );
};
export const NftName = ({ name }: any) => {
  return <div className={style.nftName}>{name}</div>;
};
export const NftMetaData = ({ link }: any) => {
  return (
    <a
      target="blank"
      href={`https://gateway.pinata.cloud/ipfs/${link}`}
      className={style.metadataContainer}
    >
      <Launch sx={{ fontSize: "14px" }} /> metadata
    </a>
  );
};
export const NftImageLink = ({ link }: any) => {
  return (
    <a target="blank" href={link} className={style.imageLinkContainer}>
      <Launch sx={{ fontSize: "14px" }} /> Image Link
    </a>
  );
};
export const NftLoadingComponent = (props: any) => {
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
