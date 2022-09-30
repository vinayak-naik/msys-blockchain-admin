import { CircularProgress } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import style from "../../styles/components/dialog/addNftDialog.module.css";

export const NftFileInput = ({ onSelectFile }: any) => {
  return (
    <div className={style.fileInputBox}>
      <input type="file" accept="image/*" onChange={onSelectFile} />
    </div>
  );
};
export const NftDialogBackButton = (props: any) => {
  const { activeStep, handleBack } = props;
  return (
    <Button
      color="inherit"
      disabled={activeStep === 0}
      onClick={handleBack}
      sx={{ mr: 1 }}
    >
      Back
    </Button>
  );
};
export const NftDialogMintButton = (props: any) => {
  const { loading, formValues, uploadJsonToIpfs } = props;
  return (
    <Button
      onClick={uploadJsonToIpfs}
      disabled={!formValues.name || loading}
      variant="contained"
      endIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
    >
      {loading ? "Minting nft" : "mint nft"}
    </Button>
  );
};
export const NftDialogNextButton = (props: any) => {
  const { loading, activeStep, croppedImage, imgSrc, handleNext } = props;
  return (
    <Button
      variant="outlined"
      disabled={
        !imgSrc || loading || (activeStep === 1 ? !croppedImage?.crop : false)
      }
      onClick={handleNext}
      endIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
    >
      {loading ? "uploading" : "next"}
    </Button>
  );
};
