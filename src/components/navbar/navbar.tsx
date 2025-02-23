"use client";

import { useState, useEffect, MouseEvent } from "react";
import Link from "next/link";
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
import nextConfig from "../../../next.config";

// Define types for navbar items
interface SubMenuItem {
  text: string;
  link: string;
}

interface NavItem {
  text: string;
  submenu?: SubMenuItem[];
}

const StyledHomeIcon = styled(HomeRoundedIcon)({
  color: "white",
  paddingLeft: "10px",
});

const StyledButton = styled(Button)({
  color: "white", 
});

const Navbar = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {/* Mobile Navbar */}
      <div id="mobile_navbar" className="MuiAppBar-root MuiToolbar-regular">
        <IconButton color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
        <div id="quick_nav" style={{ display: "flex", gap: "10px" }}>
          <Link href="/#announcements_marquee">
            <NotificationsIcon sx={{ color: "white" }} />
          </Link>
          <Link href="/#news_event_notice">
            <EventNoteIcon sx={{ color: "white" }} />
          </Link>
          <Link href="/#twitter_timeline">
            <TwitterIcon sx={{ color: "white" }} />
          </Link>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div id="desktop_menu" className="MuiAppBar-root MuiToolbar-regular">
        <div style={{ display: "flex", gap: "20px" , minHeight:"64px" }}>
        <Link href="/" id="home_button">
          <StyledHomeIcon />
        </Link>
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
              <Image
                src={`${nextConfig.env?.IMAGE}/iiitt-logo.png`}
                alt="IIITT Logo"
                priority
                width={40}
                height={80}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="h6" sx={{ color: "Black" }}>IIITT</Typography>
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

// Dropdown Menu Component with TypeScript
const DropdownMenu: React.FC<{ menu: NavItem }> = ({ menu }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StyledButton onClick={handleOpen}>{menu.text}</StyledButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {menu.submenu?.map((item, index) => (
          <MenuItem key={index} onClick={handleClose}>
            <Link href={item.link} style={{ color: "Black", textDecoration: "none" }}>
              {item.text}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Navbar;
