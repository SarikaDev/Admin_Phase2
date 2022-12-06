import React, { useCallback, useState } from "react";
import { Box, Stack, Typography, Button, Input } from "@mui/material";
import logo from "../assets/BoA logo.png";
import bg_image from "../assets/half-bg.png";
import { useIsUserLoggedInMutation } from "../services/url";
import { CircularProgress } from "@mui/material";
import { setUserDetails } from "../rtk/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../utils/constants";
import { setIdentity } from "../rtk/slices/authSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [isUserLoggedIn, { isLoading }] = useIsUserLoggedInMutation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [mobileNumber, setMobileNumber] = useState("");

  const handleChange = useCallback(e => {
    setMobileNumber(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      if (!mobileNumber.length) {
        toast.error(`Please enter  Mobile Number`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (mobileNumber.length < 9) {
        toast.error(`Please enter valid Mobile Number`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const response = await isUserLoggedIn(mobileNumber).unwrap();
        console.log("response", response.data);

        dispatch(setUserDetails(response.data));
        dispatch(setIdentity({ identityNumber: response.data.identityNumber }));
        navigate(PATHS.loginTypes);
        return response;
      }
    },
    [dispatch, isUserLoggedIn, mobileNumber, navigate],
  );

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
          {isLoading ? (
            <Box component="div" justifyContent={"center"} alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <React.Fragment>
              <Typography
                variant="h6"
                color="rgba(241, 171, 21, 1)"
                fontWeight={700}
                letterSpacing={2}
              >
                Web Admin
              </Typography>
              <Typography variant="body1" color="black" fontWeight={500}>
                Please Enter Mobile Number
              </Typography>
              <Input
                type="text"
                onChange={handleChange}
                width={220}
                height={40}
              />
              <Button
                sx={{
                  width: 1 / 2,
                  fontWeight: "bold",
                  backgroundColor: "rgba(241, 171, 21, 1)",
                  marginBlock: 1,
                }}
                onClick={handleSubmit}
                variant={"contained"}
              >
                Sumbit
              </Button>
            </React.Fragment>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginPage;
