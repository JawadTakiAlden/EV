import {
  Autocomplete,
  autocompleteClasses,
  Box,
  TextField,
} from "@mui/material";
import React from "react";

const SearchOrStartNewChat = () => {
  return (
    <Box
      sx={{
        mb: 2,
      }}
    >
      <Autocomplete
        options={[]}
        sx={{
          [`& .${autocompleteClasses.inputRoot}`]: {
            pt: 0,
          },
        }}
        renderInput={(props) => {
          return (
            <TextField
              placeholder="search or start a new chat"
              variant="filled"
              {...props}
            />
          );
        }}
      />
    </Box>
  );
};

export default SearchOrStartNewChat;
