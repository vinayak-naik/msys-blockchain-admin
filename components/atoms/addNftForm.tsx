import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useState } from "react";
import TextError from "../reusable/textError";
import style from "../../styles/components/dialog/addNftDialog.module.css";
import * as Yup from "yup";
import colorCodes from "../../public/constants/JSON/colorCodes.json";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

const AddNftForm = (props: any) => {
  const { setFormValues } = props;
  const { signer } = useSelector((state: RootState) => state.contract);
  const NFT_EXTERNAL_URL = `${process.env.NEXT_PUBLIC_NFT_EXTERNAL_URL}`;

  const [trait, setTrait] = useState<any>("");
  const [val, setVal] = useState("");
  const [attributes, setAttributes] = useState<any>([]);
  const [check, setCheck] = useState(true);
  const initialValues = {
    name: "",
    description: "",
    price: 0,
    background_color: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Please enter name"),
    price: Yup.number()
      .required("Please enter any amount")
      .typeError("You must specify a number")
      .min(1, "Minimum bet amount is 1 MSCN"),
    description: Yup.string().required("Please enter description"),
  });

  const addAttribute = () => {
    if (trait && val) {
      setAttributes([...attributes, { trait_type: trait, value: val }]);
    }
    setTrait("");
    setVal("");
  };
  const onSubmit = async (values: any) => {
    const walletAddress = await signer.getAddress();
    const timeStampNow = Date.parse(`${new Date()}`) / 1000;
    values.createdAt = timeStampNow;
    values.creator = walletAddress;
    values.external_url = NFT_EXTERNAL_URL;
    values.attributes = attributes;
    values.forSale = check;

    setFormValues(values);
  };
  return (
    <div
      style={
        {
          // display: "flex",
          // alignItems: "center",
          // flexDirection: "column",
        }
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form
              method="post"
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <div className={style.addNftFormLeft}>
                {/* <div className={style.inputBox}>
                  <Typography variant="h5">Add Metadata</Typography>
                </div> */}
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="name"
                    label="Enter Name"
                    variant="outlined"
                    {...formik.getFieldProps("name")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="name" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="text"
                    id="description"
                    label="Enter Description"
                    variant="outlined"
                    {...formik.getFieldProps("description")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="description" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <TextField
                    fullWidth
                    type="number"
                    id="price"
                    label="Enter Price"
                    variant="outlined"
                    {...formik.getFieldProps("price")}
                  />
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="price" />
                  </div>
                </div>
                <div className={style.inputBox}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Select background color
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select background color"
                      {...formik.getFieldProps("background_color")}
                    >
                      {colorCodes.map((item: any, index: number) => (
                        <MenuItem
                          key={index}
                          className={style.menuItem}
                          value={item.code}
                        >
                          {item.color}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div className={style.errorBox}>
                    <ErrorMessage component={TextError} name="displayName" />
                  </div>
                </div>

                {/* <div className={style.inputButtonBox}>
                  <Button type="submit" variant="outlined" color="primary">
                    Submit
                  </Button>
                </div> */}
              </div>
              <div className={style.addNftFormMiddle}>
                <div className={style.addNftFormLeft}>
                  {/* <div className={style.inputBox}>
                    <Typography variant="h5">Add Attribute</Typography>
                  </div> */}
                  <div className={style.inputBox}>
                    <div className={style.checkBoxContainer}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(e) => setCheck(e.target.checked)}
                          />
                        }
                        label="I want to sell this NFT"
                      />
                    </div>
                  </div>
                  <div className={style.inputBox}>
                    <TextField
                      fullWidth
                      type="text"
                      id="trait"
                      label="Enter trait"
                      variant="outlined"
                      value={trait}
                      onChange={(e) => setTrait(e.target.value)}
                    />
                    <div className={style.errorBox}>
                      <ErrorMessage component={TextError} name="trait" />
                    </div>
                  </div>

                  <div className={style.inputBox}>
                    <TextField
                      fullWidth
                      type="text"
                      id="value"
                      label="Enter value"
                      variant="outlined"
                      value={val}
                      onChange={(e) => setVal(e.target.value)}
                    />
                    <div className={style.errorBox}>
                      <ErrorMessage component={TextError} name="value" />
                    </div>
                  </div>
                  <div
                    className={style.inputButtonBox}
                    style={{ marginTop: "12px" }}
                  >
                    <Button
                      onClick={addAttribute}
                      variant="outlined"
                      color="primary"
                    >
                      add attribute
                    </Button>
                    <Button
                      onClick={() => setAttributes([])}
                      variant="outlined"
                      color="primary"
                    >
                      clear
                    </Button>
                  </div>
                </div>
              </div>
              <div className={style.addNftFormRight}>
                <div className={style.attributeContainer}>
                  {attributes.map((item: any, index: number) => (
                    <div key={index} className={style.attribute}>
                      <div className={style.attributeTrait}>
                        {item.trait_type}
                      </div>
                      <div className={style.attributeVal}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div className={style.inputButtonBox}>
                  <Button type="submit" variant="outlined" color="primary">
                    Submit metadata
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddNftForm;
