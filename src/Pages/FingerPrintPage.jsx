import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import leftFinger from "../assets/leftIndex.png";
import logo from "../assets/BoA logo.png";
import bg_image from "../assets/half-bg.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { usePostFingerMutation } from "../services/url";
import finger from "../assets/finger.png";

import { PATHS } from "../utils/constants";
import { setAccessToken } from "../rtk/slices/accessTokenSlice";
import { Stack } from "@mui/system";

const FingerPrintPage = () => {
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
  const [fingerPosition, setFingerPosition] = useState("");
  const [fingerprint, setFinger] = useState("");
  const dispatch = useDispatch();
  const [postFinger, { isLoading, isError }] = usePostFingerMutation();

  const identityNumber = useSelector(
    state => state.authentication.identityNumber,
  );
  const { fingerPositions } = useSelector(state => state.userDetails);

  const handleNext = async () => {
    const response = await postFinger({
      identityNumber,
      fingerprint,
    }).unwrap();
    dispatch(setAccessToken({ accessToken: response.data.accessToken }));
    navigate(PATHS.dashboard);
  };

  const handleScan = () => {
    fetch("https://device.aptiway.com:9004", {
      method: "POST",
      body: JSON.stringify({
        cmd: 2,
        finger_index: 1,
        compression_type: 1,
        export_bmp: false,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setFinger(data.awmsosvc_response);
      });
  };

  const handleClear = () => {
    setFinger("");
  };

  return (
    <Box
      component={"div"}
      width={1}
      height={"100vh"}
      sx={{ backgroundColor: "grey" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        component={"div"}
        width={"33%"}
        height={1 / 2}
        borderRadius="5% 0% 0% 5%"
        sx={{
          borderRight: "none",
          backgroundColor: "rgba(241, 171, 21, 1)",
          backgroundImage: `url(${bg_image})`,
          backgroundSize: "cover",
        }}
      >
        <Stack pt={5}>
          <Typography
            color="white"
            align="center"
            fontSize={25}
            fontWeight={600}
          >
            Bank 24/7 with our virtual banking
          </Typography>
          <Typography
            color="white"
            align="center"
            fontSize={18}
            fontWeight={500}
          >
            Discover more ways to bank than ever
          </Typography>
        </Stack>
      </Box>
      <Box
        component={"div"}
        width={"33%"}
        height={1 / 2}
        borderRadius="0% 5% 5% 0%"
        sx={{
          borderLeft: "none",
          backgroundColor: "#ffffff",
          backgroundImage: `url(${logo})`,
          backgroundSize: "40% 15%",
          backgroundRepeat: "no-repeat",
          backgroundPositionX: "center",
          backgroundPositionY: "8%",
        }}
      >
        <Box sx={{ marginY: 15 }} />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          rowGap={2}
        >
          {fingerprint?.length ? (
            <React.Fragment>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <React.Fragment>
                  {fingerprint ? (
                    <img src={finger} alt={"finger-print"} />
                  ) : null}
                  <Button
                    sx={{
                      width: 1 / 2,
                      fontWeight: "bold",
                      backgroundColor: "rgba(241, 171, 21, 1)",
                      marginBlock: 1,
                    }}
                    onClick={() => {
                      handleNext();
                    }}
                    variant={"contained"}
                  >
                    Proceed
                  </Button>
                  <Button
                    sx={{
                      width: 1 / 2,
                      fontWeight: "bold",
                      backgroundColor: "rgba(241, 171, 21, 1)",
                      marginBlock: 1,
                    }}
                    onClick={() => {
                      handleClear();
                    }}
                    variant={"contained"}
                  >
                    Clear
                  </Button>
                </React.Fragment>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <TextField
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "2rem",
                  },
                }}
                select
                value={fingerPosition}
                onChange={event => {
                  setFingerPosition(event.target.value);
                }}
                SelectProps={{ native: true }}
                style={{ width: "60%" }}
              >
                <option value={""}>Select Finger Position</option>
                {fingerPositions?.map(position => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </TextField>
              <Button
                sx={{
                  width: 1 / 4,
                  fontWeight: "bold",
                  backgroundColor: "rgba(241, 171, 21, 1)",
                  marginBlock: 1,
                }}
                onClick={() => {
                  handleScan();
                }}
                variant={"contained"}
              >
                Scan
              </Button>
            </React.Fragment>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default FingerPrintPage;
