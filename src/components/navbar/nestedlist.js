import React, { useState } from "react";
import { 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Collapse 
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";
import { styled } from "@mui/material/styles";


const useStyles = styled((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function NestedList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  //let Icon = Icons[props.menu.icon];

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <Icon>{props.menu.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={props.menu.text} />
        {open ? (
          <ExpandLess />
        ) : (
          <ArrowForwardIosIcon style={{ fontSize: "14px" }} />
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {props.menu.submenu.map((item) => {
          if(props.menu.name)
          {
            return(
                <></>
              );
          } 
          return (
            <Link to={item.link} draggable="false" className="nav_routes">
              <List component="div" disablePadding>
                <ListItem
                  button
                  className={classes.nested}
                  onClick={props.toggleDrawer(props.anchor, false)}
                >
                  <ListItemText primary={item.text} />
                </ListItem>
              </List>
            </Link>
          );
        })}
      </Collapse>
    </>
  );
}
