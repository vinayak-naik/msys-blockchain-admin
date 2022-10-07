import { CircularProgress, Paper } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArticle } from "../../redux/redux-toolkit/articleSlice";
import { RootState } from "../../redux/store";
import style from "../../styles/pages/articleDetails.module.css";
import { getArticle } from "../../utils/api/next.api";

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

const Article = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();

  const { article } = useSelector((state: RootState) => state.articles);
  const [loading, setLoading] = useState(false);

  const getArticleDetails = async () => {
    setLoading(true);
    const res = await getArticle(`${query.articleId}`);
    dispatch(setArticle(res));
    setLoading(false);
  };

  useEffect(() => {
    getArticleDetails();
  }, []); //eslint-disable-line

  return (
    <LotteryLoadingComponent loading={loading}>
      <div className={style.container}>
        <Paper>
          <div className={style.title}>{article.title}</div>
        </Paper>

        <Paper sx={{ marginTop: "1px", pt: 2, pb: 2 }}>
          <div className={style.bodyContainer}>
            {article.body &&
              article.body.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    {item.header && (
                      <div className={style.head}>{item.header}</div>
                    )}
                    {item.url && (
                      <div className={style.imageBox}>
                        <Image
                          alt="img"
                          loader={({ src }: any) => src}
                          src={item.url}
                          height={item.height ? item.height : "700px"}
                          width={item.width ? item.width : "700px"}
                        />
                      </div>
                    )}
                    {item.description && (
                      <div className={style.description}>
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

export default Article;
