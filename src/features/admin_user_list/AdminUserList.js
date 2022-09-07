import { Button, Card, CardMedia, Fab, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import userImage from "../../assets/images/rome.jpg";
import CustomAppBar from "../../core/components/appbar/AppBar";
import { baseUrl } from "../../core/config/config";
import AddIcon from "@mui/icons-material/Add";

export default function AdminUserList() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if (isAdmin !== "true") {
      navigate("/login");
    }
    getAllUsers();
  }, [navigate]);

  const [users, setUsers] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(`${baseUrl}users/all`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      setisLoading(false);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      setUsers(response.data.users);
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      setisLoading(true);
      const response = await axios.delete(`${baseUrl}users/id/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response);
      setisLoading(false);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      setUsers((users) => {
        const newUsers = [...users];
        console.log(newUsers);
        var filteredArray = newUsers.filter((e) => e._id !== id);
        return filteredArray;
      });
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <CustomAppBar />
      <Fab
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
        color="primary"
        aria-label="add"
        onClick={() => navigate("new")}
      >
        <AddIcon />
      </Fab>
      <Grid container>
        {users.map((e) => {
          return (
            <Grid item lg={4} md={6} sm={12}>
              <Card sx={{ display: "flex", margin: "18px" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={userImage}
                  alt="user"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 2,
                    width: "100%",
                  }}
                >
                  <Typography variant="h6">{e.name}</Typography>
                  <Typography variant="subtitle1">{e.email}</Typography>
                  <Button
                    onClick={() => deleteUser(e._id)}
                    variant="outlined"
                    style={{
                      marginLeft: "auto",
                    }}
                  >
                    DELETE
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}

        {isLoading && (
          <Portal node={document && document.getElementById("loader")}>
            <div className="loader-context">
              <BounceLoader color={"#ffffff"} loading={true} size={60} />
            </div>
          </Portal>
        )}
      </Grid>
    </>
  );
}
