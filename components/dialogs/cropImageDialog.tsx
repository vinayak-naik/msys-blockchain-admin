import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "../atoms/canvasPreview";
import { useDebounceEffect } from "../atoms/useDebounceEffect";
import style from "../../styles/components/dialog/crop.module.css";
import { Box } from "@mui/system";
import { Button, Slider } from "@mui/material";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const CropImage = (props: any) => {
  const { imgSrc, crop, setCrop, setCroppedImage, aspect } = props;
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState<any>(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    setCroppedImage({ canvas: previewCanvasRef.current, crop: completedCrop });
  }, [completedCrop]); //eslint-disable-line

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 1));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const generateDownload = async (canvas: any, crop: any) => {
    if (!crop || !canvas) {
      return;
    }
    canvas.toBlob(
      (blob: any) => {
        const previewUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.download = "cropPreview.png";
        anchor.href = URL.createObjectURL(blob);
        anchor.click();
        window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      1
    );
  };
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    if (ctx) {
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }
  }, [completedCrop]);

  return (
    <div className="App">
      <div className="Crop-Controls"></div>
      <div className={style.container}>
        <div className={style.leftBox}>
          <div className={style.preview}>
            {Boolean(completedCrop) && (
              <div className={style.canvasContainer}>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    height: "200px",
                    width: "200px",
                  }}
                />
                <Box>
                  <Button
                    type="button"
                    size="small"
                    variant="outlined"
                    color="primary"
                    disabled={!completedCrop?.width || !completedCrop?.height}
                    onClick={() =>
                      generateDownload(previewCanvasRef.current, completedCrop)
                    }
                  >
                    Download
                  </Button>
                </Box>
              </div>
            )}
          </div>
        </div>
        {Boolean(imgSrc) && (
          <div className={style.rightBox}>
            <div className={style.rightBox}>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{
                    transform: `scale(${scale}) rotate(${rotate}deg)`,
                    height: "300px",
                  }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <div
                className={style.sliderContainer}
                style={{ marginTop: "15px" }}
              >
                <Slider
                  size="small"
                  value={scale}
                  onChange={(e, val) => setScale(Number(val))}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={0.1}
                  max={1.9}
                  step={0.05}
                  sx={{ flex: "1" }}
                />
                <div className={style.sliderLabel}>Zoom</div>
              </div>
              <div className={style.sliderContainer}>
                <Slider
                  size="small"
                  value={rotate}
                  onChange={(e, val) => setRotate(Number(val))}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  min={0}
                  max={360}
                  sx={{ flex: "1" }}
                />
                <div className={style.sliderLabel}>Rotate</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropImage;
