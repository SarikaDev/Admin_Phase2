import { useState, useEffect, useCallback } from "react";
import { Paper, Stack, useTheme, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIdentity } from "../rtk/slices/authSlice";

const Sample = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [timer, setTimer] = useState(900);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);
    const resetTimeout = () => {
      setTimer(900);
    };
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }
    return () => {
      clearInterval(myInterval);
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
      }
    };
  });

  if (timer === 0) {
    localStorage.clear();
    navigate("/");
  }

  return (
    <Box
      component={Paper}
      elevation={5}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={"85vh"}
      width={1}
      sx={{
        marginX: 2,
        borderBottom: `3px solid ${theme.palette.primary.main}`,
        borderTop: `3px solid ${theme.palette.primary.main}`,
        borderLeft: `3px solid ${theme.palette.primary.main}`,
        borderRight: `3px solid ${theme.palette.primary.main}`,
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Typography
          variant="h5"
          component="h2"
          color={theme => theme.palette.primary.main}
          textTransform={"uppercase"}
          fontWeight={600}
          letterSpacing={3}
        >
          Welcome To Admin Dashboard
        </Typography>
      </Stack>
    </Box>
  );
};

export default Sample;
