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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import PeopleIcon from '@mui/icons-material/People';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import CallIcon from '@mui/icons-material/Call';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WorkIcon from '@mui/icons-material/Work';
import FlagIcon from '@mui/icons-material/Flag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CodeIcon from '@mui/icons-material/Code';
import Image from "next/image";
import { styled } from "@mui/material/styles";
import nextConfig from "../../../next.config";

// Define types for navbar items
interface SubMenuItem {
  text: string;
  link: string;
  submenu?: SubMenuItem[];
  icon?: string;
}
const iconMap: { [key: string]: React.ComponentType } = {
  account_balance: AccountBalanceIcon,
  local_library: LocalLibraryIcon,
  people: PeopleIcon,
  note_add: NoteAddIcon,
  notification_important: NotificationsIcon,
  person: PersonIcon,
  school: SchoolIcon,
  call: CallIcon,
  workspace_premium: WorkspacePremiumIcon,
  work: WorkIcon,
  code: CodeIcon,
};

interface NavItem {
  text: string;
  link?: string;
  submenu?: SubMenuItem[];
  icon?: string;
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
        const res = await fetch("/json/navigation/navbar_data.json");
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
  <div id="quick_nav" style={{ display: "flex", gap: "10px", alignItems: "center" }}>
    {/* Menu Icon */}
    <IconButton color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
      <MenuIcon sx={{ color: "white", fontSize: { xs: 24, sm: 28 } }} />
    </IconButton>
    <Link href="/#announcements_marquee">
      <IconButton color="inherit">
        <NotificationsIcon sx={{ color: "white", fontSize: { xs: 24, sm: 28 } }} />
      </IconButton>
    </Link>
    <Link href="/#news_event_notice">
      <IconButton color="inherit">
        <EventNoteIcon sx={{ color: "white", fontSize: { xs: 24, sm: 28 } }} />
      </IconButton>
    </Link>
    <Link href="/#twitter_timeline">
      <IconButton color="inherit">
        <TwitterIcon sx={{ color: "white", fontSize: { xs: 24, sm: 28 } }} />
      </IconButton>
    </Link>
  </div>
</div>


      {/* Desktop Navbar */}
      <div id="desktop_menu" className="MuiAppBar-root MuiToolbar-regular">
        <div style={{ display: "flex", gap: "20px", minHeight: "64px" }}>
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
      <MobileMenuItem
        key={index}
        item={menuItem}
        onClose={() => setDrawerOpen(false)}
      />
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
      {menu.submenu ? (
        <>
          <StyledButton onClick={handleOpen}>{menu.text}</StyledButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {menu.submenu.map((item, index) => (
              <NestedDropdown key={index} menuItem={item} onClose={handleClose} />
            ))}
          </Menu>
        </>
      ) : (
        <Link href={menu.link || "#"} passHref>
          <StyledButton>{menu.text}</StyledButton>
        </Link>
      )}
    </div>
  );
};

// Nested Dropdown for handling deeper submenus
const NestedDropdown: React.FC<{ menuItem: SubMenuItem; onClose: () => void }> = ({ menuItem, onClose }) => {
  const [subAnchorEl, setSubAnchorEl] = useState<null | HTMLElement>(null);

  const handleSubOpen = (event: MouseEvent<HTMLLIElement>) => {
    setSubAnchorEl(event.currentTarget);
  };

  const handleSubClose = () => {
    setSubAnchorEl(null);
    onClose();
  };

  return (
    <div>
      {menuItem.submenu ? (
        <>
          <MenuItem onMouseEnter={handleSubOpen} onMouseLeave={handleSubClose}>
            {menuItem.text}
          </MenuItem>
          <Menu
            anchorEl={subAnchorEl}
            open={Boolean(subAnchorEl)}
            onClose={handleSubClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {menuItem.submenu.map((subItem, index) => (
              <MenuItem key={index} onClick={handleSubClose}>
                <Link href={subItem.link} style={{ color: "Black", textDecoration: "none" }}>
                  {subItem.text}
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <MenuItem onClick={onClose}>
          <Link href={menuItem.link} style={{ color: "Black", textDecoration: "none" }}>
            {menuItem.text}
          </Link>
        </MenuItem>
      )}
    </div>
  );
};

const MobileMenuItem = ({ item, depth = 0, onClose }: { item: NavItem | SubMenuItem; depth?: number; onClose: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const IconComponent = item.icon ? iconMap[item.icon] : null;

  return (
    <>
      {!hasSubmenu ? (
        <Link href={item.link || "#"} >
          <ListItem

            onClick={onClose}  // Close drawer when clicking a link
            sx={{ pl: depth * 2 }}
          >
            {IconComponent && (
              <ListItemIcon>
                <IconComponent />
              </ListItemIcon>
            )}
            <ListItemText primary={item.text} />
          </ListItem>
        </Link>
      ) : (
        <ListItem
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ pl: depth * 2 }}
        >
          {IconComponent && (
            <ListItemIcon>
              <IconComponent />
            </ListItemIcon>
          )}
          <ListItemText primary={item.text} />
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
      )}
      {hasSubmenu && isExpanded && item.submenu?.map((subItem, index) => (
        <MobileMenuItem
          key={index}
          item={subItem}
          depth={depth + 1}
          onClose={onClose}
        />
      ))}
    </>
  );
};
export default Navbar;
