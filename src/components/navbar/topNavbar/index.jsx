import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import logo from "../../../assets/BoA logo.png";
import { Box, Stack, Toolbar, Tooltip, useTheme } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { PATHS, SM_WIDTH } from "../../../utils/constants";
import {
  setIdentity,
  setCredentials,
} from "../../../rtk/slices/authenticationSlice";
import { setAccessToken } from "../../../rtk/slices/authorizationSlice";
import { setUserDetails } from "../../../rtk/slices/userSlice";

export const MenuAppBar = ({ setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isLarge = useMediaQuery(`(min-width:${SM_WIDTH}px)`);
  const toggleNavbar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, [setIsOpen]);

  const handleClick = useCallback(() => {
    dispatch(setIdentity({ identityNumber: null }));
    dispatch(setCredentials({ credential: null }));
    dispatch(setAccessToken({ accessToken: null }));
    dispatch(
      setUserDetails({
        identityNumber: null,
        identityStatus: null,
        credentials: null,
        displayName: null,
        fingerPositions: null,
        roleName: null,
        userStatus: null,
      }),
    );
  }, [dispatch]);

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: 1,
        backgroundColor: theme.palette.secondary.secondary,
        boxShadow: `2px 2px ${theme.palette.primary.main}`,
      }}
    >
      <Toolbar>
        {!isLarge && (
          <Tooltip title="Open Navigation">
            <IconButton onClick={toggleNavbar}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
        )}
        <Box
          component={Stack}
          flexDirection="row"
          justifyContent={"space-between"}
          width={1}
          alignItems="center"
        >
          <Box
            component={"img"}
            src={logo}
            alt="Boa_logo"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate(PATHS.dashboard)}
          />
          <Link onClick={handleClick} to={"/"}>
            <LogoutOutlined fontSize="large" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default MenuAppBar;
