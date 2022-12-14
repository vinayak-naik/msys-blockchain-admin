import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import TextError from "../reusable/textError";
import style from "../../styles/components/dialog/dialog.module.css";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
// import { callSetGameesApi } from "../../utils/api/cache";

const UpdateGameDialog = (props: any) => {
  const { game, open, handleClose, refreshPage } = props;
  const { gameContract, signer } = useSelector(
    (state: RootState) => state.contract
  );
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    gameId: game?.gameId,
    name: game?.name,
    route: game?.route,
    externalUrl: game?.externalUrl,
    active: game?.active === true ? 1 : 0,
    visibility: game?.visibility === true ? 1 : 0,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    route: Yup.string().required("Please enter route"),
    externalUrl: Yup.string().required("Please enter external URL"),
  });

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      const res = await gameContract
        .connect(signer)
        .updateGame(
          values.gameId,
          values.name,
          values.route,
          values.externalUrl,
          Boolean(values.active),
          Boolean(values.visibility)
        );
      await res.wait();
      refreshPage();
      setLoading(false);
      handleClose();
      // callSetGameesApi();
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
      handleClose();
    }
  };
  return (
    <Dialog open={open} onClose={!loading ? handleClose : false}>
      <DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form method="post" style={{ width: "30vw" }}>
                <div className={style.inputBox}>
                  <Typography variant="h5">Update Game</Typography>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="name"
                    label="Enter name"
                    variant="outlined"
                    {...formik.getFieldProps("name")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="name" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Redirect to
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Redirect to"
                      {...formik.getFieldProps("route")}
                    >
                      <MenuItem className={style.menuItem} value="betting">
                        Betting
                      </MenuItem>
                      <MenuItem className={style.menuItem} value="lottery">
                        Lottery
                      </MenuItem>
                      <MenuItem className={style.menuItem} value="nft">
                        NFT
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="route" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="externalUrl"
                    label="Enter external image URL"
                    variant="outlined"
                    {...formik.getFieldProps("externalUrl")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="externalUrl" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Status"
                      {...formik.getFieldProps("active")}
                    >
                      <MenuItem className={style.menuItem} value={1}>
                        Active
                      </MenuItem>
                      <MenuItem className={style.menuItem} value={0}>
                        Disable
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="active" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Visibility
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Visibility"
                      {...formik.getFieldProps("visibility")}
                    >
                      <MenuItem className={style.menuItem} value={1}>
                        Visible
                      </MenuItem>
                      <MenuItem className={style.menuItem} value={0}>
                        Hidden
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="visibility" />
                  </div>
                </div>

                <div className={style.inputButtonBox}>
                  <Button
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    color="success"
                    endIcon={
                      loading ? (
                        <CircularProgress size={16} color="inherit" />
                      ) : null
                    }
                  >
                    {loading ? "Processing " : "Submit"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </DialogTitle>
    </Dialog>
  );
};

export default UpdateGameDialog;
