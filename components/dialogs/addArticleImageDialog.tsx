import { Dialog, DialogTitle } from "@mui/material";
import React, { useState } from "react";
import CropImage from "./cropImageDialog";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Crop } from "react-image-crop";
import style from "../../styles/components/dialog/addNftDialog.module.css";
import {
  NftDialogBackButton,
  NftDialogNextButton,
  NftFileInput,
} from "../../molecules/components/addNftDialog.atoms";

const steps = ["Select Image", "Crop Image"];

const AddArticleImageDialog = (props: any) => {
  const { open, handleClose, setImageData } = props;
  const [imgSrc, setImgSrc] = useState("");
  const [uploadImageMessage, setUploadImageMessage] = useState<any>({});
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<any>();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const closeDialog = () => {
    setLoading(false);
    setActiveStep(0);
    setUploadImageMessage("");
    handleClose();
  };

  const handleNext = () => {
    if (activeStep === 1 && croppedImage.crop && croppedImage.canvas) {
      setImageData(croppedImage.canvas);
      closeDialog();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setUploadImageMessage("");
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

              <NftDialogNextButton
                loading={loading}
                activeStep={activeStep}
                croppedImage={croppedImage}
                imgSrc={imgSrc}
                handleNext={handleNext}
              />
            </Box>
          </React.Fragment>
        </Box>
        {uploadImageMessage.message && (
          <div
            className={`${style.upldMessage} ${
              uploadImageMessage.uploadSuccess
                ? style.successMessage
                : style.errorMessage
            }`}
          >
            {uploadImageMessage.message}
          </div>
        )}
      </DialogTitle>
    </Dialog>
  );
};

export default AddArticleImageDialog;
