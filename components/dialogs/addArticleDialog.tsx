import { Button, Dialog, DialogTitle } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import style from "../../styles/components/dialog/addArticleDialog.module.css";
import { addArticle, uploadArticleImage } from "../../utils/api/next.api";
import AddArticleForm from "../atoms/addArticleForm";

const AddArticleDialog = (props: any) => {
  const { open, handleClose } = props;
  const [paragraph, setParagraph] = useState<any>([]);
  const [title, setTitle] = useState("");
  const [uploaded, setUploaded] = useState<any>();

  const uploadImageHandler = () => {
    const filtered = paragraph.filter((item: any) => item.imageData);
    if (filtered.length === 0) {
      return setUploaded({});
    }
    const uploadedImages: any = {};
    paragraph.forEach((item: any, index: number) => {
      if (item.imageData) {
        item.imageData.toBlob((blob: any) => {
          const formData = new FormData();
          formData.append("file", blob);
          uploadArticleImage(formData).then((imageData) => {
            console.log(imageData.url);
            uploadedImages[index] = imageData.url;
          });
        });
        setTimeout(() => {
          if (Object.keys(uploadedImages).length === filtered.length) {
            setUploaded(uploadedImages);
          } else {
            console.log("failed to upload");
          }
        }, 4000);
      }
    });
  };

  const submitArticle = () => {
    let obj: any = {
      title: "",
      body: [],
    };
    paragraph.map((item: any, index: number) => {
      obj.title = title;
      obj.body.push({
        header: item.header,
        description: item.description,
        height: item.height,
        width: item.width,
        url: uploaded[index] ? uploaded[index] : "",
      });
    });
    addArticle(JSON.stringify(obj));
  };

  const closeDialog = () => {
    setUploaded({});
    setParagraph([]);
    setTitle("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth maxWidth="md">
      <DialogTitle>
        <div className={style.dialogHead}>Add Article</div>
        <div className={style.container}>
          <div className={style.containerLeftBox}>
            <AddArticleForm
              setParagraph={(values: any) =>
                setParagraph([...paragraph, values])
              }
              setTitle={(e: any) => setTitle(e)}
              title={title}
            />
          </div>
          <div className={style.containerRightBox}>
            <div className={style.previewTitle}>{title}</div>
            {paragraph &&
              paragraph.map((item: any, index: number) => {
                if (item.imageData) {
                  var dataURL = item.imageData.toDataURL();
                }
                return (
                  <div key={index}>
                    {item.header && (
                      <div className={style.previewHead}>{item.header}</div>
                    )}
                    {item.imageData && (
                      <Image
                        alt="img"
                        src={dataURL}
                        height={item.height ? item.height / 5 : "100px"}
                        width={item.width ? item.width / 5 : "100px"}
                      />
                    )}
                    {item.description && (
                      <div
                        style={{ fontSize: "12px" }}
                        className={style.previewDescription}
                      >
                        {item.description}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className={style.dialogAction}>
          <div></div>
          <div></div>
          <div></div>
          <Button
            onClick={uploadImageHandler}
            variant="contained"
            disabled={!paragraph[0]}
            color="success"
          >
            Upload Images
          </Button>
          <Button
            onClick={submitArticle}
            variant="contained"
            disabled={!uploaded}
            color="success"
          >
            Submit Article
          </Button>
        </div>
      </DialogTitle>
    </Dialog>
  );
};

export default AddArticleDialog;
