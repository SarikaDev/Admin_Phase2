import { useCallback } from "react";
import { Box, Stack, Typography } from "@mui/material";
import logo from "../assets/BoA logo.png";
import bg_image from "../assets/half-bg.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaceOutlined,
  FingerprintOutlined,
  PasswordOutlined,
} from "@mui/icons-material";
import { PATHS } from "../utils/constants";

const LoginTypes = () => {
  const credentials = useSelector(state => state.authentication.credentials);
  console.log("credentials", credentials);

  //   const Icons = [
  //     { label: "FingerPrint", icon: <FingerprintOutlined fontSize="large" /> },
  //     { label: "Face", icon: <FaceOutlined fontSize="large" /> },
  //     { label: "Password", icon: <PasswordOutlined fontSize="large" /> },
  //   ];

  //   Icons.map(({ label, icon }) => (
  //     <Box
  //       component={"div"}
  //       key={label}
  //       width={90}
  //       minHeight={90}
  //       display="flex"
  //       justifyContent="center"
  //       alignItems="center"
  //       borderRadius="50%"
  //       sx={{ cursor: "pointer" }}
  //       backgroundColor="rgba(241, 171, 21, 1)"
  //     >
  //       {icon}
  //     </Box>
  //   ));
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
          backgroundPositionY: "5%",
        }}
      >
        <Box sx={{ marginY: 15 }} />
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          rowGap={2}
        >
          <Typography
            variant="h6"
            color="rgba(241, 171, 21, 1)"
            fontWeight={700}
            letterSpacing={2}
          >
            Welcome
          </Typography>
          <Typography variant="body1" color="black" fontWeight={500}>
            Please select the mode of authentication
          </Typography>
          <Stack
            justifyContent="center"
            alignItems="center"
            flexDirection={"row"}
            columnGap={1}
          >
            {credentials.includes("FACE") ? (
              <Box
                component={Link}
                width={90}
                to={PATHS.face}
                minHeight={90}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                sx={{ cursor: "pointer" }}
                backgroundColor="rgba(241, 171, 21, 1)"
              >
                <FaceOutlined fontSize="large" />
              </Box>
            ) : null}
            {credentials.includes("FINGERPRINT") ? (
              <Box
                component={Link}
                width={90}
                to={PATHS.fingerPrint}
                minHeight={90}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                sx={{ cursor: "pointer" }}
                backgroundColor="rgba(241, 171, 21, 1)"
              >
                <FingerprintOutlined fontSize="large" />
              </Box>
            ) : null}
            {credentials.includes("PASSWORD") ? (
              <Box
                component={Link}
                width={90}
                to={PATHS.password}
                minHeight={90}
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderRadius="50%"
                sx={{ cursor: "pointer" }}
                backgroundColor="rgba(241, 171, 21, 1)"
              >
                <PasswordOutlined fontSize="large" />
              </Box>
            ) : null}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default LoginTypes;
