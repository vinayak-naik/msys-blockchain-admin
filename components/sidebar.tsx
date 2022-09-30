import { Accordion, AccordionSummary, Typography } from "@mui/material";
import React, { useState } from "react";
import style from "../styles/components/sidebar.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
  const [expanded, setExpanded] = useState<number>(0);
  const { push } = useRouter();

  const handleChange =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : 0);
    };
  const navItems = [
    {
      name: "dashboard",
      subItems: [
        // { name: "Add User", route: "/addUser" },
        // { name: "All Users", route: "/users" },
      ],
      route: "/",
    },
    {
      name: "users",
      subItems: [
        // { name: "Add User", route: "/user/addUser" },
        // { name: "All Users", route: "/user" },
      ],
      route: "/user",
    },
    {
      name: "Betting",
      subItems: [
        // { name: "Add Match", route: "/betting/addMatch" },
        // { name: "All Matches", route: "/betting" },
      ],
      route: "/betting",
    },
    {
      name: "Lottery",
      subItems: [
        // { name: "Add Lottery", route: "/lottery/addLottery" },
        // { name: "All Lotteries", route: "/lottery" },
      ],
      route: "/lottery",
    },
    {
      name: "NFT",
      subItems: [
        // { name: "Add NFT", route: "/NFT/addNFT" },
        // { name: "All NFTs", route: "/NFT" },
      ],
      route: "/nft",
    },
    {
      name: "Articles",
      subItems: [
        // { name: "Add Article", route: "/article/addArticle" },
        // { name: "All Articles", route: "/article" },
      ],
      route: "/article",
    },
  ];
  return (
    <div className={style.container}>
      {navItems.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === index + 1}
          onChange={
            item.subItems.length ? handleChange(index + 1) : handleChange(0)
          }
          sx={sx.accordion}
          onClick={() => (item.subItems.length ? "" : push(`${item.route}`))}
        >
          <AccordionSummary
            className={style.accordionSummary}
            expandIcon={
              <ExpandMoreIcon
                sx={sx.expandMoreIcon}
                style={{
                  visibility: item.subItems.length ? "visible" : "hidden",
                }}
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>{item.name}</Typography>
          </AccordionSummary>
          {/* <AccordionDetails sx={sx.accordionDetails}>
            {item.subItems.map((subItem, i) => (
              <div key={i}>
                <Button
                  sx={{
                    backgroundColor:
                      subItem.route === asPath ? "rgb(28 76 128)" : null,
                    ...sx.accordionDetailsButton,
                  }}
                  fullWidth
                  onClick={() => push(`/${subItem.route}`)}
                >
                  {subItem.name}
                </Button>
                <Divider />
              </div>
            ))}
          </AccordionDetails> */}
        </Accordion>
      ))}
    </div>
  );
};

export default Sidebar;
