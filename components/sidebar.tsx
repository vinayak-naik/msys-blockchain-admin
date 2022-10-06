import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React from "react";
import style from "../styles/components/sidebar.module.css";
import { useRouter } from "next/router";

const sx = {
  accordion: {
    backgroundColor: "rgb(31, 50, 71)",
    width: "100%",
    color: "white",
    textAlign: "center",
    borderBottom: "1px solid #ffffff69",
    marginTop: "4px",
    padding: "5px",
  },
  accordionDetails: { padding: "8px 0 16px" },
  accordionDetailsButton: {
    "&:hover": {
      backgroundColor: "rgb(28 76 128)",
    },
    color: "white",
    textTransform: "capitalize",
    borderRadius: 0,
  },
  expandMoreIcon: { color: "white" },
};

const Sidebar = () => {
  const { push } = useRouter();
  // const [param, setParam] = useState("");

  const navItems = [
    {
      name: "dashboard",
      route: "/",
    },
    {
      name: "users",
      route: "/user",
    },
    {
      name: "Betting",
      route: "/betting",
    },
    {
      name: "Lottery",
      route: "/lottery",
    },
    {
      name: "NFT",
      route: "/nft",
    },
    {
      name: "Article",
      route: "/article",
    },
    {
      name: "Guide",
      route: "/guide",
    },
  ];
  const clickHandler = (route: string) => {
    // setParam(route);
    // if (param !== route) {
    // }
    push(`${route}`);
  };
  return (
    <div className={style.container}>
      {navItems.map((item, index) => (
        <Accordion
          key={index}
          expanded={false}
          sx={sx.accordion}
          onClick={() => clickHandler(item.route)}
        >
          <AccordionSummary
            className={style.accordionSummary}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>{item.name}</Typography>
          </AccordionSummary>
        </Accordion>
      ))}
    </div>
  );
};

export default Sidebar;
