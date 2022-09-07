import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomAppBar() {
  const navigate = useNavigate();
  const onLogout = (e) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Button onClick={onLogout} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
