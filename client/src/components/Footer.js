import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { STORE_NAME } from "../constants";

function Footer() {
  return (
    <AppBar position="sticky" elevation={0} component="footer" color="default">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption">{`Copyright © 2022 - ${STORE_NAME}`}</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
