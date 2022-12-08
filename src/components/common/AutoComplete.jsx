import * as React from "react";
import { Autocomplete, Stack, Box, TextField } from "@mui/material";

const BranchAutoComplete = ({ options, onChange, label, label2 }) => {
  return (
    <Box component={Stack}>
      <Autocomplete
        clearOnBlur
        size="small"
        options={options}
        getOptionLabel={option => option.label}
        fullWidth
        onChange={(e, value) => {
          value === null ? onChange("") : onChange(value.value);
        }}
        renderInput={params => (
          <TextField
            {...params}
            label="Select Branch Name"
            sx={{
              "& .MuiAutocomplete-inputRoot": {
                borderRadius: 0,
                width: "240px",
                height: "45px",
              },
            }}
          />
        )}
      />
    </Box>
  );
};

export default BranchAutoComplete;
