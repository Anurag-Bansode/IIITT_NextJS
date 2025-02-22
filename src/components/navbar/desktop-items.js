"use client";
import React, { useState, useRef } from "react";
import { 
  Button, 
  ClickAwayListener, 
  Grow, 
  Paper, 
  Popper, 
  MenuItem, 
  MenuList, 
  Typography 
} from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/material/styles";

const useStyles = styled((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    if (document.getElementsByClassName("carousel-root").length != 0)
      document.getElementsByClassName("carousel-root")[0].style.zIndex = -10;
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  /*const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);*/

  return (
    <div className={classes.root}>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
        className="navlink_button"
      >
        <Typography variant="button">{props.nav_head}</Typography>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        onMouseEnter={handleToggle}
        onMouseLeave={handleToggle}
        style={{ zIndex: "10" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                {props.submenu.map((item) => {
                    return (
                      <Link
                        to={item.link}
                        draggable="false"
                        className="nav_routes"
                      >
                        <MenuItem onClick={handleClose}> {item.text}</MenuItem>
                      </Link>
                    );
                  })}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
