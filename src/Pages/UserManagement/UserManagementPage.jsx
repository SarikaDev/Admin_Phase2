import React, { useCallback, useEffect, useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import "jspdf-autotable";
import jsPDF from "jspdf";
import logo from "../../assets/BoA logo.png";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Stack,
  useTheme,
  Box,
  Typography,
  TextField,
  TablePagination,
  TableCell,
  TableRow,
  Tooltip,
  Switch,
  Fade,
  IconButton,
  CircularProgress,
  TableBody,
  TableHead,
  Table,
  TableContainer,
  Button,
} from "@mui/material";
import OptionsDropdown from "../../components/common/OptionsDropDown";
import SearchBar, { SearchButton } from "../../components/common/SearchBar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import SearchBarByName from "../../components/common/SearchBarByName";
import BranchAutoComplete from "../../components/common/AutoComplete";
import { useGetBranchesQuery, useUsersQuery } from "../../services/url";

import { CSVLink } from "react-csv";
import EditIcon from "@mui/icons-material/Edit";
const columns = [
  {
    field: "displayName",
    headerName: "Name",
    width: 20,
  },
  { field: "mobileNumber", headerName: "Mobile Number", width: 50 },
  { field: "role", headerName: "Roles", width: 50 },
  { field: "branchName", headerName: "Branch Name", width: 50 },
  { field: "status", headerName: "Status", width: 50 },
  { field: "lastLogin", headerName: "Last Login", width: 50 },
  { field: "createdAt", headerName: "Created Date", width: 50 },
  { field: "createdBy", headerName: "Created By", width: 50 },
  { field: "updatedAt", headerName: "Last Modified Date", width: 50 },
  { field: "updatedBy", headerName: "Last Modified", width: 50 },
];

const headersCsv = [
  { label: "FullName", key: "displayName" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Roles", key: "role" },
  { label: "Branch Name", key: "branchName" },
  { label: "Status", key: "status" },
  { label: "Last Login", key: "lastLogin" },
  { label: "Created Date", key: "createdAt" },
  { label: "Created By", key: "createdBy" },
  { label: "Last Modified Date", key: "updatedAt" },
  { label: "Last Modified", key: "updatedBy" },
];

const PDFDate = [
  { label: "Name", key: "displayName" },
  { label: "Mobile Number", key: "mobileNumber" },
  { label: "Roles", key: "role" },
  { label: "Branch Name", key: "branchName" },
  { label: "Status", key: "status" },
  { label: "Last Login", key: "lastLogin" },
  { label: "Created Date", key: "createdAt" },
  { label: "Created By", key: "createdBy" },
  { label: "Last Modified Date", key: "updatedAt" },
  { label: "Last Modified", key: "updatedBy" },
  // { label: "passWordEnabled", key: "passwordEnabled" },
];
const UserManagementPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("mobileNumber");
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [branches, setBranches] = useState([]);
  const [districts, setDistricts] = useState([]);
  const handleClick = useCallback(() => {}, []);
  const [fromDate2, setFromDate2] = useState("");
  const [toDate2, setToDate2] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalSize, setTotalSize] = useState(0);

  const { data, isLoading } = useGetBranchesQuery();
  const allUsers = useUsersQuery({
    pageNumber,
    pageSize,
    fromDate,
    toDate,
    search,
    selectedFilter,
  });

  const handleChange = useCallback();
  // (index, passwordEnabled) => {
  //   setUserListData(prev => {
  //     const prevUserList = [...prev];
  //     prevUserList[index].passwordEnabled = !passwordEnabled;
  //     return prevUserList;
  //   });
  //   getSingleUser({
  //     accessToken,
  //     mobileNumber: userListData[index].mobileNumber,
  //   }).then(res => {
  //     const identityNumber = res.data?.data?.content[0]?.identityNumber;
  //     UpdateUserApi(identityNumber, {
  //       passwordEnabled: !passwordEnabled,
  //     });
  //   });
  // },
  // [UpdateUserApi, accessToken, getSingleUser, userListData],

  const handleChangePage = useCallback(async (e, newPage) => {
    setPageNumber(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(e => {
    setPageSize(parseInt(e.target.value, 10));
    setPageNumber(0);
  }, []);

  const json = allUsers?.data?.data?.content;
  const handleSubmit = e => {
    e.preventDefault();
    const pdf = new jsPDF("landscape");
    const columns = PDFDate.map((fields, index) => fields.label);
    var rows = [];
    pdf.addImage(logo, "PNG", 100, 15, 100, 20);
    for (let i = 0; i < json?.length; i++) {
      var temp = [
        json[i].displayName,
        json[i].mobileNumber,
        json[i].role,
        json[i].branchName,
        json[i].status,
        json[i].lastLogin,
        json[i].createdAt,
        json[i].updatedBy,
        json[i].updatedAt,
        json[i].updatedBy,
        // json[i].passwordEnabled,
      ];
      rows.push(temp);
    }
    pdf.autoTable(columns, rows, {
      startY: 50,
      margin: {
        right: 2,
      },

      columnStyles: {
        0: { cellWidth: 20 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 35 },
        4: { cellWidth: 20 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
        7: { cellWidth: 20 },
        8: { cellWidth: 30 },
        9: { cellWidth: 20 },
      },
      theme: "grid",
      styles: {
        font: "times",
        overflow: "linebreak",
        align: "left",
        cellPadding: 2,
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        textColor: [0, 0, 0],
      },
      headStyles: {
        textColor: [0, 0, 0],
        fontStyle: "normal",
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
        fillColor: [166, 204, 247],
      },
      alternateRowStyles: {
        fillColor: [212, 212, 212],
        textColor: [0, 0, 0],
        lineWidth: 0.5,
        lineColor: [0, 0, 0],
      },

      tableLineColor: [0, 0, 0],
    });
    pdf.save("pdf");
  };
  return (
    <Box
      component={"div"}
      display="flex"
      flexDirection={"column"}
      gap={2}
      sx={{
        marginX: 2,
      }}
    >
      {/* <Box component={Paper} elevation={5} height={"20vh"}>
        <Typography variant="h5" color={"primary.main"} margin={2}>
          User List
        </Typography>
        <Stack margin={2} flexDirection="row" justifyContent="space-between">
          <OptionsDropdown value={selectedFilter} onChange={handleChange}>
            {selectedFilter === "mobileNumber" && (
              <SearchBar onChange={setSearch} label="mobileNumber" />
            )}
            {selectedFilter === "name" && (
              <SearchBarByName onChange={setSearch} label="name" />
            )}
            {selectedFilter === "branchId" && (
              <BranchAutoComplete
                label={selectedFilter}
                options={data.data.labelValues}
                onChange={setSearch}
              />
            )}
          </OptionsDropdown>
          <Box component={"div"}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="From Date"
                value={fromDate2}
                disableFuture
                onChange={newValue => {
                  setFromDate2(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: 10,
                        // width: 85,
                        // width: "50%",
                      },
                    }}
                  />
                )}
              />
              <DatePicker
                inputFormat="DD/MM/YYYY"
                label="To Date"
                value={toDate2}
                disableFuture
                shouldDisableDate={date => moment(fromDate2).diff(date) > 0}
                onChange={newValue => {
                  setToDate2(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    sx={{
                      "& .MuiInputBase-input": {
                        height: 10,
                        // width: 85,
                      },
                    }}
                  />
                )}
              />
            </LocalizationProvider>

            <SearchButton
              variant="contained"
              sx={{ marginLeft: 1 }}
              onClick={handleClick}
            >
              Search
            </SearchButton>
          </Box>
        </Stack>
      </Box> */}
      <Box component={Paper} elevation={5} height={"65vh"} width={"95vw"}>
        <Stack
          alignItems="flex-end"
          justifyContent="flex-end"
          m={2}
          gap={2}
          direction="row"
        >
          <Typography variant="h6" color={theme.palette.primary.main}>
            EXPORT as
          </Typography>

          <Button
            sx={{ borderColor: "black", color: "black" }}
            variant="outlined"
            // disabled={active}
            onClick={handleSubmit}
          >
            PDF
          </Button>
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js">
            <div
              style={{
                alignItems: "center",
                backgroundColor: "#eeeeee",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
                display: "none",
                justifyContent: "center",
              }}
            ></div>
          </Worker>
          <CSVLink
            data={!allUsers.length ? [] : allUsers?.data?.data?.content}
            headers={headersCsv}
            filename={"Details.csv"}
          >
            <Button
              sx={{
                borderColor: "black",
                color: "black",
                fontFamily: "Source Sans Pro",
              }}
              variant="outlined"
            >
              CSV
            </Button>
          </CSVLink>
        </Stack>
        <Box component={"div"} m={2}>
          <TableContainer
            component={Paper}
            elevation={2}
            sx={{
              minWidth: 220,
              height: "50vh",
              width: "50%",
              overflowX: "auto",
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ height: "5%" }}>
                  <TableCell
                    align="left"
                    sx={{ backgroundColor: "#EFF2F7" }}
                    width="5%"
                  >
                    ACTIONS
                  </TableCell>
                  {columns.map(cell => (
                    <TableCell
                      key={cell.headerName}
                      align="left"
                      width="5%"
                      sx={{ backgroundColor: "#EFF2F7" }}
                    >
                      {cell.headerName}
                    </TableCell>
                  ))}

                  <TableCell
                    align="left"
                    sx={{ backgroundColor: "#EFF2F7" }}
                    width="5%"
                  >
                    PASSWORD
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns?.length + 2}>
                      <Typography p={5} textAlign="center">
                        <CircularProgress />
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : !!allUsers?.data?.data?.content ? (
                  allUsers?.data?.data?.content.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">
                        <Tooltip
                          title="EDIT"
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                        >
                          <IconButton
                            aria-label="edit"
                            size="small"
                            onClick={() => {
                              navigate(
                                `/userManagement/userLists/edit/${user.mobileNumber}`,
                              );
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      {columns.map(({ field, width }) => (
                        <TableCell
                          key={field}
                          component="th"
                          scope="row"
                          align="left"
                          width="10%"
                        >
                          {/* {field === "branchId"
                        ? branchesMap[user[field]]
                        : user[field]} */}
                          {user[field]}
                        </TableCell>
                      ))}

                      <TableCell align="center">
                        <Tooltip
                          title="Deactive-Active"
                          TransitionComponent={Fade}
                          TransitionProps={{ timeout: 600 }}
                        >
                          <Switch
                            checked={user.passwordEnabled}
                            // onChange={handlePassWordToggle}
                            onChange={() =>
                              handleChange(index, user.passwordEnabled)
                            }
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns?.length + 2}>
                      <Typography p={5} textAlign="center">
                        NO Data Available
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20]}
            component="div"
            count={totalSize}
            rowsPerPage={pageSize}
            page={pageNumber}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagementPage;
