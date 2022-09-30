import { Dialog, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import CropImage from "./cropImageDialog";
import AddNftForm from "../atoms/addNftForm";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Crop } from "react-image-crop";
import style from "../../styles/components/dialog/addNftDialog.module.css";
import {
  uploadImageToPinata,
  uploadJsonToPinata,
} from "../../utils/api/ipfs.api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  NftDialogBackButton,
  NftDialogMintButton,
  NftDialogNextButton,
  NftFileInput,
} from "../../molecules/components/addNftDialog.atoms";

const steps = ["Select Image", "Crop Image", "Add Details"];

const AddNFTDialog = (props: any) => {
  const { open, handleClose, refreshPage } = props;
  const { nftContract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<any>();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<any>({});

  const closeDialog = () => {
    setLoading(false);
    setFormValues({});
    setActiveStep(0);
    handleClose();
  };

  const checkEvents = () => {
    nftContract.on("Transfer", () => {
      refreshPage();
      setLoading(false);
      closeDialog();
    });
  };

  const uploadJsonToIpfs = async () => {
    setLoading(true);
    const metadata = {
      name: formValues.name,
      image: formValues.image,
      description: formValues.description,
      creator: formValues.creator,
      createdAt: formValues.createdAt,
      background_color: formValues.background_color,
      attributes: formValues.attributes,
    };
    uploadJsonToPinata(JSON.stringify(metadata)).then((jsonData) => {
      const { name, price, forSale } = formValues;
      nftContract
        .connect(signer)
        .safeMint(name, price, forSale, jsonData.IpfsHash)
        .then(() => checkEvents());
    });
  };

  const uploadImageToIpfs = async () => {
    if (!croppedImage.crop || !croppedImage.canvas) {
      return;
    }
    croppedImage.canvas.toBlob(
      (blob: any) => {
        const formData = new FormData();
        formData.append("file", blob);
        uploadImageToPinata(formData).then((imageData) => {
          setFormValues({
            ...formValues,
            image: `https://gateway.pinata.cloud/ipfs/${imageData.IpfsHash}`,
          });
          setLoading(false);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        });
      },
      "image/png",
      1
    );
  };

  const handleNext = () => {
    if (activeStep === 1) {
      setLoading(true);
      uploadImageToIpfs();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader?.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  // const NftFileInput = ({ onSelectFile }: any) => {
  //   return (
  //     <div className={style.fileInputBox}>
  //       <input type="file" accept="image/*" onChange={onSelectFile} />
  //     </div>
  //   );
  // };
  // const NftDialogBackButton = (props: any) => {
  //   const { activeStep, handleBack } = props;
  //   return (
  //     <Button
  //       color="inherit"
  //       disabled={activeStep === 0}
  //       onClick={handleBack}
  //       sx={{ mr: 1 }}
  //     >
  //       Back
  //     </Button>
  //   );
  // };
  // const NftDialogMintButton = (props: any) => {
  //   const { loading, formValues, uploadJsonToIpfs } = props;
  //   return (
  //     <Button
  //       onClick={uploadJsonToIpfs}
  //       disabled={!formValues.name || loading}
  //       variant="contained"
  //       endIcon={
  //         loading ? <CircularProgress size={16} color="inherit" /> : null
  //       }
  //     >
  //       {loading ? "Minting nft" : "mint nft"}
  //     </Button>
  //   );
  // };
  // const NftDialogNextButton = (props: any) => {
  //   const { loading, activeStep, croppedImage, imgSrc } = props;
  //   return (
  //     <Button
  //       variant="outlined"
  //       disabled={
  //         !imgSrc || loading || (activeStep === 1 ? !croppedImage?.crop : false)
  //       }
  //       onClick={handleNext}
  //       endIcon={
  //         loading ? <CircularProgress size={16} color="inherit" /> : null
  //       }
  //     >
  //       {loading ? "uploading" : "next"}
  //     </Button>
  //   );
  // };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
      <DialogTitle>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <React.Fragment>
            <div className={style.stepperBody}>
              {activeStep === 0 ? (
                <NftFileInput onSelectFile={onSelectFile} />
              ) : activeStep === 1 ? (
                <CropImage
                  imgSrc={imgSrc}
                  crop={crop}
                  setCrop={(e: any) => setCrop(e)}
                  setCroppedImage={(e: any) => setCroppedImage(e)}
                />
              ) : activeStep === 2 ? (
                <AddNftForm
                  setFormValues={(e: any) =>
                    setFormValues({ ...formValues, ...e })
                  }
                />
              ) : (
                <></>
              )}
            </div>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <NftDialogBackButton
                activeStep={activeStep}
                handleBack={handleBack}
              />
              <Box sx={{ flex: "1 1 auto" }} />
              {activeStep === steps.length - 1 ? (
                <NftDialogMintButton
                  loading={loading}
                  formValues={formValues}
                  uploadJsonToIpfs={uploadJsonToIpfs}
                />
              ) : (
                <NftDialogNextButton
                  loading={loading}
                  activeStep={activeStep}
                  croppedImage={croppedImage}
                  imgSrc={imgSrc}
                  handleNext={handleNext}
                />
              )}
            </Box>
          </React.Fragment>
        </Box>
      </DialogTitle>
    </Dialog>
  );
};

export default AddNFTDialog;
