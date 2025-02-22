"use client";
import React, { useState } from "react";
import { Drawer, IconButton, List, Divider, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "./homeicon";
import NestedList from "./nestedlist";
import Link from "next/link";
import Image from "next/image";


const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: 250,
  },
}));

export default function TemporaryDrawer({ items }) {
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState({ left: open });
  };
  debugger;
  const drawerList = (
    <div role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        <Link href="/" passHref legacyBehavior>
          <ListItem button component="a">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>

        {items.map((menu_item, index) => (
          menu_item.name ? (
            <Link key={menu_item.id || index} href={menu_item.name} passHref legacyBehavior>
              <ListItem button component="a">
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={menu_item.text} />
              </ListItem>
            </Link>
          ) : (
            <NestedList key={menu_item.id || index} menu={menu_item} toggleDrawer={toggleDrawer} />
          )
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <>
      <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <StyledDrawer anchor="left" open={state.left} onClose={toggleDrawer(false)}>
        <List id="iiitt_sidetop">
          <ListItem>
            <ListItemIcon>
              <Image src="/images/logo-small.png" alt="IIITT Logo" width={40} height={40} priority />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" sx={{ color: "rgba(0, 0, 0, 0.75)" }}>
                IIITT
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        {drawerList}
      </StyledDrawer>
    </>
  );
}
