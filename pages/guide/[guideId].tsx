import { CircularProgress, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGuide } from "../../redux/redux-toolkit/guideSlice";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/articleDetails.module.css";
import { getGuide } from "../../utils/api/next.api";

const LotteryLoadingComponent = (props: any) => {
  const { loading, children } = props;
  const styleObj = {
    height: "90vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  if (loading) {
    return (
      <div style={styleObj}>
        <CircularProgress color="success" />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};

const Guide = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const { guide } = useSelector((state: RootState) => state.guides);
  const [loading, setLoading] = useState(false);

  const getGuideDetails = async () => {
    setLoading(true);
    const res = await getGuide(`${query.guideId}`);
    dispatch(setGuide(res));
    setLoading(false);
  };

  useEffect(() => {
    getGuideDetails();
  }, []); //eslint-disable-line

  return (
    <LotteryLoadingComponent loading={loading}>
      <div className={style.container}>
        <Paper>
          <div className={style.title}>{guide.title}</div>
        </Paper>

        <Paper sx={{ marginTop: "1px", pt: 2, pb: 2 }}>
          <div className={style.bodyContainer}>
            {guide.body &&
              guide.body.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    {item.header && (
                      <div className={style.head}>{item.header}</div>
                    )}
                    {item.link && (
                      <div className={style.linkContainer}>
                        <span className={style.linkText}>Goto&nbsp;</span>
                        <a
                          className={style.link}
                          target="blank"
                          href={item.link}
                        >
                          {item.link}
                        </a>
                      </div>
                    )}
                    {item.url && (
                      <div className={style.imageBox}>
                        <Image
                          alt="img"
                          loader={({ src }: any) => src}
                          src={item.url}
                          height={item.height ? item.height : "400px"}
                          width={item.width ? item.width : "400px"}
                        />
                      </div>
                    )}
                    {item.description && (
                      <div className={style.description}>
                        {item.step && (
                          <span className={style.step}>
                            Step-{item.step}:&nbsp;
                          </span>
                        )}
                        {item.description}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </Paper>
      </div>
    </LotteryLoadingComponent>
  );
};

export default Guide;
