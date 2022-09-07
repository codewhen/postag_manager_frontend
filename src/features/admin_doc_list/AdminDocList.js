import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import CustomAppBar from "../../core/components/appbar/AppBar";
import { baseUrl } from "../../core/config/config";
import DocIcon from "@mui/icons-material/FilePresent";

export default function AdminDocList() {
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if (isAdmin !== "true") {
      navigate("/login");
    }
    getAllDocs();
  }, [navigate]);

  const [docs, setDocs] = useState([]);

  const getAllDocs = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(`${baseUrl}doc/tag`);
      console.log(response);
      setisLoading(false);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      setDocs(response.data.docs);
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };

  const buttonClick = (id) => {
    navigate(id);
  };

  return (
    <>
      <CustomAppBar />
      <Typography
        variant="h5"
        component="h2"
        style={{
          textDecoration: "underline",
          marginLeft: 18,
          marginTop: 18,
          marginBottom: 18,
        }}
      >
        Uploaded Docs List:{" "}
      </Typography>
      <List>
        {docs.map((e) => {
          return (
            <>
              <ListItem disablePadding>
                <ListItemButton onClick={() => buttonClick(e._id)}>
                  <ListItemIcon>
                    <DocIcon />
                  </ListItemIcon>
                  <ListItemText primary={e.docName} />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="li" />
            </>
          );
        })}
      </List>
      {isLoading && (
        <Portal node={document && document.getElementById("loader")}>
          <div className="loader-context">
            <BounceLoader color={"#ffffff"} loading={true} size={60} />
          </div>
        </Portal>
      )}
    </>
  );
}
