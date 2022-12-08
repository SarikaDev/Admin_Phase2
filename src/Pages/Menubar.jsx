import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import MuiDrawer from "../components/navbar/sideNavbar/index";
import DrawList from "../components/navbar/sideNavbar/DrawerList";
import { useState } from "react";
import MenuAppBar from "../components/navbar/topNavbar";
const Menubar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Box
      component={Stack}
      gap={2}
      sx={{ backgroundColor: "secondary.main", height: "100vh" }}
    >
      <MenuAppBar setIsOpen={setIsOpen} />
      <Box component={Stack} flexDirection={"row"}>
        <MuiDrawer isOpen={isOpen}>
          <DrawList setIsOpen={setIsOpen} />
        </MuiDrawer>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Menubar;
