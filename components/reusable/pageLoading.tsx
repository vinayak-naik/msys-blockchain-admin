import { CircularProgress } from "@mui/material";
import style from "../../styles/components/reusable/pageLoading.module.css";

export const PageLoadingComponent = (props: any) => {
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
