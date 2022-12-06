import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SM_WIDTH } from "../../../utils/constants";
const MuiDrawer = ({ isOpen, children }) => {
  const drawerWidth = 230;
  const isLarge = useMediaQuery(`(min-width:${SM_WIDTH}px)`);
  return (
    <Drawer
      style={{ zIndex: 0 }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      anchor="left"
      variant={isLarge ? "permanent" : "temporary"}
      open={isLarge || isOpen}
    >
      <Toolbar />
      <Divider />
      {children}
    </Drawer>
  );
};

export default MuiDrawer;
