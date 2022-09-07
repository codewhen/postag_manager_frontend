import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";

export default function CustomAppBar({ shouldBack = true }) {
  const navigate = useNavigate();
  const onLogout = (e) => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <AppBar position="sticky">
      <Toolbar>
        {shouldBack && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <BackIcon />
          </IconButton>
        )}
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
