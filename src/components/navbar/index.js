"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  MenuItem,
  Button,
  Drawer,
  IconButton,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EventNoteIcon from "@mui/icons-material/EventNote";
import TwitterIcon from "@mui/icons-material/Twitter";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import "./navbar.css";
import nextConfig from "../../../next.config";

const StyledHomeIcon = styled(HomeRoundedIcon)(({ theme }) => ({
  color: "white",
  paddingLeft: "10px",
}));

const Navbar = () => {
  const [navItems, setNavItems] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchNavItems = async () => {
      try {
        const res = await fetch("/json/navbar_data.json");
        const data = await res.json();
        if (isMounted) setNavItems(data.data);
      } catch (error) {
        console.error("Error loading navbar items:", error);
      }
    };

    fetchNavItems();
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      {/* Mobile Navbar */}
      <div id="mobile_navbar" className="MuiAppBar-root MuiToolbar-regular">
        <IconButton color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
        <div id="quick_nav" style={{ display: "flex", gap: "10px" }}>
          <Link href="/#announcements_marquee"><NotificationsIcon /></Link>
          <Link href="/#news_event_notice"><EventNoteIcon /></Link>
          <Link href="/#twitter_timeline"><TwitterIcon /></Link>
        </div>
      </div>
      
      {/* Desktop Navbar */}
      <div id="desktop_menu" className="MuiAppBar-root MuiToolbar-regular">
        <Link href="/" id="home_button"><StyledHomeIcon /></Link>
        <div className="navPanel" style={{ display: "flex", gap: "20px" }}>
          {navItems.map((menuItem, index) => (
            <DropdownMenu key={index} menu={menuItem} />
          ))}
        </div>
      </div>
      
      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Image src={`${nextConfig.env?.IMAGE}/iiitt-logo.png`} alt="IIITT Logo" priority width={40} height={80}/>
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6">IIITT</Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider />
        <List>
          {navItems.map((menuItem, index) => (
            <DropdownMenu key={index} menu={menuItem} />
          ))}
        </List>
      </Drawer>
    </>
  );
};

const DropdownMenu = ({ menu }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  return (
    <div>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>{menu.text}</Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {menu.submenu?.map((item, index) => (
          <MenuItem key={index} onClick={() => setAnchorEl(null)}>
            <Link href={item.link}>{item.text}</Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
