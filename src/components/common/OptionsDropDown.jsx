import React, { useState, useCallback } from "react";
import {
  MenuItem,
  InputBase,
  Select,
  Box,
  MenuList,
  Stack,
} from "@mui/material";
import { styled, useTheme } from "@mui/material";

const StyledInput = styled(Select)(({ theme }) => ({
  borderRadius: 0,
  color: theme.palette.grey[600],
  fontSize: 15,
  width: 180,
  textAlign: "center",
  fontWeight: 500,
  marginLeft: 0.5,
}));
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 0,
    position: "relative",
    border: `1px solid ${theme.palette.primary.main}`,
    // fontSize: 14,
    width: "100%",
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 0,
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
}));

const StyledOptions = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.secondary.main[200],
  borderRadius: 0,
  fontWeight: 500,
  textAlign: "left",
  fontSize: "small",
  zIndex: 1,
}));

const OptionsDropdown = ({ country, handleChange, children, ...other }) => {
  const options = [
    { value: "name", label: "Name " },
    { value: "mobileNumber", label: "Mobile Number" },
    { value: "branchId", label: "Branch" },
    // { value: "district", label: "District" },
  ];
  return (
    <Stack direction={"row"}>
      <StyledInput
        value={country}
        size="small"
        onChange={handleChange}
        {...other}
      >
        {options.map(({ value, label }) => (
          <StyledOptions key={value} value={value}>
            {label}
          </StyledOptions>
        ))}
      </StyledInput>
      {children}
    </Stack>
  );
};

export default OptionsDropdown;
