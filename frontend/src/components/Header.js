import { Box } from "@mui/material";
import React from "react";
import "./Header.css";

const Header = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <img src="/Logo.png" alt="XFlix-icon" />
      </Box>
      {children}
    </Box>
  );  
};

export default Header;