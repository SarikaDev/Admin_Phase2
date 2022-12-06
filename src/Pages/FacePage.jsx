import React, { useState, useRef, useCallback, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cropper from "react-cropper";
import Webcam from "react-webcam";
import bg_image from "../assets/half-bg.png";
import { usePostFaceMutation } from "../services/url";
import { useSelector, useDispatch } from "react-redux";
import { setAccessToken } from "../rtk/slices/accessTokenSlice";
import { PATHS } from "../utils/constants";
const videoConstraints = {
  width: 519,
  height: 400,
  facingMode: "user",
};

const Face = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postFace, { isLoading, isError }] = usePostFaceMutation();
  const [croppedImage, setCroppedImage] = useState("");
  const [cropped, setCropped] = useState(false);
  const webcamRef = useRef(null);
  const [image, setImage] = useState("");

  const imgRef = useRef(null);
  const { identityNumber } = useSelector(
    setUserDetails => setUserDetails.userDetails,
  );

  //   ! Functionality

  const handleCropChange = useCallback(() => {
    const croppedImgData = imgRef.current.cropper
      .getCroppedCanvas()
      .toDataURL("image/jpeg", 0.5);
    setCroppedImage(croppedImgData);
  }, []);

  const cropImage = () => {
    setImage(croppedImage);
    setCropped(true);
  };

  const capture = useCallback(() => {
    setImage(webcamRef?.current?.getScreenshot());
  }, [webcamRef]);

  const handleNext = async () => {
    const response = await postFace({
      identityNumber,
      croppedImage,
    }).unwrap();
    dispatch(setAccessToken({ accessToken: response.data.accessToken }));
    navigate(PATHS.dashboard);
    return response;
  };

  const retake = () => {
    setCroppedImage("");
    setImage("");
    setCropped(false);
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
      {/* {isLoading && <CircularProgress />} */}
      {/* {isError === true ? ( */}
      {/* <h3> Something Went Wrong ...</h3> */}
      {/* ) : ( */}
      {/* <React.Fragment>
          
        </React.Fragment>
      )} */}
      {/* {data && ( */}

      {/* )} */}
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
        }}
      >
        <Stack
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          rowGap={2}
        >
          <Box
            display={"flex"}
            flexDirection={"row"}
            alignContent={"center"}
            justifyContent={"center"}
            height={"18.9rem"}
          >
            {/* //! image.length !== 0 ? "Activate WebCam " : cropper === true and cropperImage.length ? Show Image : <Cropper />   */}

            {!image?.length ? (
              <Webcam
                audio={false}
                height={300}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width={300}
                style={{ borderRadius: 5 }}
                videoConstraints={videoConstraints}
              />
            ) : (
              <Box marginTop={".5rem"}>
                {cropped && croppedImage?.length ? (
                  <Box
                    component={"img"}
                    alt="sda"
                    width={"20vw"}
                    height={"90%"}
                    src={croppedImage}
                  />
                ) : (
                  <Cropper
                    cropend={() => handleCropChange()}
                    ref={imgRef}
                    src={image}
                    zoomable={false}
                    autoCropArea={-0.01}
                    background={false}
                  />
                )}
              </Box>
            )}
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignContent={"center"}
            justifyContent={"center"}
          >
            {/* //! image.length !== 0 ? "Capture-btn" : "Retake-btn"   */}
            {!image?.length ? (
              <Button
                sx={{
                  width: 1,
                  fontWeight: "bold",
                  backgroundColor: "rgba(241, 171, 21, 1)",
                }}
                onClick={capture}
                variant={"contained"}
              >
                Capture
              </Button>
            ) : (
              <Box
                style={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant={"contained"}
                  style={{
                    background: "#F1AB15",
                    fontSize: "1.125rem",
                    boxShadow: "unset",
                    borderRadius: "16px",
                  }}
                  onClick={() => {
                    retake();
                  }}
                >
                  Re-take
                </Button>

                {/* //! cropper  === true ? "Continue-btn" : "Crop-btn"   */}

                {cropped ? (
                  <Button
                    variant={"contained"}
                    style={{
                      background: "#F1AB15",
                      fontSize: "1.125rem",
                      boxShadow: "unset",
                      borderRadius: "16px",
                    }}
                    onClick={() => {
                      handleNext();
                    }}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    variant={"contained"}
                    style={{
                      background: "#F1AB15",
                      fontSize: "1.125rem",
                      boxShadow: "unset",
                      borderRadius: "16px",
                    }}
                    onClick={() => {
                      cropImage();
                    }}
                  >
                    Crop
                  </Button>
                )}
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Face;
