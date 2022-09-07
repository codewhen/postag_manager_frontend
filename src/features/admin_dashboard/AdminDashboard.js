import React, { useEffect } from "react";
import userImage from "../../assets/images/user.png";
import docImage from "../../assets/images/doc.png";
import analyticsImage from "../../assets/images/analytics.jpg";
import taggedDocImage from "../../assets/images/pos.png";
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import CardButton from "./components/CardButton/CardButton";
import { Box } from "@mui/system";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const onUserClick = (e) => {
    navigate("user");
  };
  const onDocClick = (e) => {
    navigate("doc");
  };
  const onTaggedClick = (e) => {
    navigate("tagged");
  };
  const onAnalyticsClick = (e) => {
    navigate("analytics");
  };
  const onLogout = (e) => {
    localStorage.clear();
    navigate("/login");
  };
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
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
      <Box
        sx={{
          height: 18,
        }}
      />
      <Grid container>
        <Grid item xs={12} sm={6} xl={4} lg={4} md={6}>
          <CardButton
            onTap={onUserClick}
            label="User"
            image={userImage}
            alt="user button"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={4} lg={4} md={6}>
          <CardButton
            onTap={onDocClick}
            label="Doc"
            image={docImage}
            alt="doc button"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={4} lg={4} md={6}>
          <CardButton
            onTap={onAnalyticsClick}
            label="Analytics"
            image={analyticsImage}
            alt="analytics button"
          />
        </Grid>
        <Grid item xs={12} sm={6} xl={12} lg={12} md={6}>
          <CardButton
            onTap={onTaggedClick}
            label="Tagged POS"
            image={taggedDocImage}
            alt="tagged pos doc button"
          />
        </Grid>
      </Grid>
    </>
  );
}
