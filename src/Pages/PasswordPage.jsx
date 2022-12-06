import React, { useCallback, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Input,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { usePostPasswordMutation } from "../services/url";
import logo from "../assets/BoA logo.png";
import bg_image from "../assets/half-bg.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { PATHS } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { setAccessToken } from "../rtk/slices/accessTokenSlice";
import { setUserData } from "../rtk/slices/userSlice";
const PasswordPage = () => {
  const [postPassword, { isLoading, isError }] = usePostPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { identityNumber } = useSelector(
    setUserDetails => setUserDetails.userDetails,
  );
  const Password = btoa(password);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();
      const response = await postPassword({
        identityNumber,
        Password,
      }).unwrap();
      console.log(response?.data?.displayName);
      dispatch(setAccessToken({ accessToken: response.data.accessToken }));
      dispatch(
        setUserData({
          displayName: response.data.displayName,
          branchId: response.data.branchId,
          roleName: response.data.roleName,
          active: response.data.active,
        }),
      );

      navigate(PATHS.dashboard);
      return response;
    },
    [Password, dispatch, identityNumber, navigate, postPassword],
  );

  const handleChange = useCallback(e => {
    setPassword(e.target.value);
  }, []);

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
      {isError === true ? (
        <h3> Wrong Password ...</h3>
      ) : (
        <React.Fragment>
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
            <Box sx={{ marginTop: 20 }} />
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
              rowGap={2}
            >
              {isLoading ? (
                <Box
                  component="div"
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <CircularProgress />
                </Box>
              ) : (
                <React.Fragment>
                  <Box component="form">
                    <TextField
                      label="Password"
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      autoComplete="password password"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Button
                    sx={{
                      width: 1 / 2,
                      fontWeight: "bold",
                      backgroundColor: "rgba(241, 171, 21, 1)",
                      marginBlock: 2,
                    }}
                    variant={"contained"}
                    onClick={handleSubmit}
                  >
                    Sumbit
                  </Button>
                </React.Fragment>
              )}
            </Stack>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default PasswordPage;
