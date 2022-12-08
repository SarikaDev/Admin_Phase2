import { useEffect, useCallback, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useCreateUserMutation,
  useGetBranchesQuery,
  useIsUserLoggedInMutation,
} from "../../services/url";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../rtk/slices/userSlice";
import { setIdentity } from "../../rtk/slices/authSlice";
const lstatus = ["ACTIVE", "INACTIVE"];

const roles = [
  "AGENT",
  "SELF_KYC_CLIENT",
  "LEVEL_ONE_ADJUDICATOR",
  "LEVEL_TWO_ADJUDICATOR",
  "USER_MANAGER",
  "LEVEL_ONE_BRANCH_ADJUDICATOR",
  "LEVEL_TWO_BRANCH_ADJUDICATOR",
];
const CreateUser = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [cmobile, setCmobile] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [branch, setBranch] = useState("");
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetBranchesQuery();
  const [isUserLoggedIn] = useIsUserLoggedInMutation();
  const [createUser] = useCreateUserMutation();

  const handleBranch = useCallback((e, value) => {
    setBranch(value.value);
  }, []);

  const { roleName } = useSelector(state => state.userDetails);

  const handleNumber = e => {
    const value = e.target.value.replace(/\D/g, "");

    setCmobile(value);
  };
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
  const handleKeyUp = useCallback(async () => {
    if (cmobile.length === 9) {
      const response = await isUserLoggedIn(cmobile).unwrap();
      dispatch(setUserDetails(response.data));
      setName(roleName);
      dispatch(setIdentity({ identityNumber: response.data.identityNumber }));
    }
  }, [cmobile, dispatch, isUserLoggedIn, roleName]);

  const UserCreation = useCallback(async () => {
    const response = await createUser({
      MobileNumber: cmobile,
      role,
      name,
      branch,
      status,
    }).unwrap();
    return response;
  }, [branch, cmobile, createUser, name, role, status]);
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
        backgroundColor: theme.palette.secondary.light,
      }}
    >
      {isLoading && <h3>Loading ...</h3>}
      <Stack justifyContent="center" alignItems={"center"} marginTop={3}>
        <Card
          sx={{
            maxWidth: 450,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
            borderTop: `3px solid ${theme.palette.primary.main}`,
            paddingX: 2,
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack justifyContent="center" alignItems="center">
                  <PersonAddAltOutlinedIcon
                    sx={{
                      fontSize: "4rem",
                      color: `${theme.palette.grey[500]}`,
                      borderRadius: "5%",
                      fontSizeAdjust: 4,
                    }}
                  />
                  <Typography
                    variant="h5"
                    color={theme => theme.palette.grey[500]}
                    component="h2"
                    guttertop="true"
                    textTransform={"uppercase"}
                    fontWeight={600}
                    letterSpacing={3}
                  >
                    Create User
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  size="small"
                  required
                  placeholder="Enter Mobile Number"
                  label="Mobile Number"
                  name="mnumber"
                  maxLength={9}
                  onKeyUp={handleKeyUp}
                  value={cmobile || ""}
                  pattern="^[0-9]*$"
                  fullWidth
                  autoFocus
                  onChange={handleNumber}
                  inputProps={{ maxLength: 9 }}
                />
              </Grid>
              <Grid xs={12} sm={12} item>
                <TextField
                  size="small"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  fullWidth
                  value={name}
                  name="Name"
                  label="Name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  size="small"
                  disablePortal
                  name="role"
                  onChange={(event, value) => setRole(value)}
                  options={roles}
                  renderInput={params => <TextField {...params} label="Role" />}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                {isSuccess && (
                  <Autocomplete
                    size="small"
                    disablePortal
                    value={branch}
                    options={data.data.labelValues}
                    onChange={handleBranch}
                    renderInput={params => (
                      <TextField {...params} label="Branch" />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12}>
                <Autocomplete
                  size="small"
                  disablePortal
                  name="status"
                  onChange={(event, value) => setStatus(value)}
                  options={lstatus}
                  renderInput={params => (
                    <TextField {...params} label="Status" />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Stack justifyContent="center" alignItems="center">
                  <Button
                    // fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={UserCreation}
                  >
                    Submit
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default CreateUser;
