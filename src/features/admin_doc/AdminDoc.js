import { Box, Button, Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../core/config/config";
import UploadIcon from "@mui/icons-material/Upload";
import CustomAppBar from "../../core/components/appbar/AppBar";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { Portal } from "react-portal";
import { BounceLoader } from "react-spinners";

export default function AdminDoc() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const publish = async (e) => {
    try {
      setisLoading(true);
      const response = await axios.post(
        `${baseUrl}doc/add`,
        {
          docName: fileName,
          input: file,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Saved the doc!!");

      toast.promise(
        axios.get(`${baseUrl}doc/assign/${response.data.doc._id}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          loading: "Assigning...",
          success: <b>Assinged!</b>,
          error: <b>Could not assign.</b>,
        }
      );

      setisLoading(false);

      navigate("/admin", { replace: true });
    } catch (err) {
      setisLoading(false);
      toast.error("Error publishing");
      console.log(err);
    }
  };

  const handleFileChange = (e) => {
    console.log("run");
    if (!e.target.files) {
      console.log("no file detected");
      toast.error("no file detected");
      return;
    }
    const file = e.target.files[0];

    console.log(file);
    const { name, type } = file;

    setFileName(name);

    const reader = new FileReader();

    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;
      if (type !== "text/plain") {
        var doc = new Docxtemplater(new PizZip(result), {
          delimiters: {
            start: "12op1j2po1j2poj1po",
            end: "op21j4po21jp4oj1op24j",
          },
        });
        var text = doc.getFullText();
        console.log(text);
        setFile(text);
      } else {
        console.log(result);
        setFile(result);
      }
    };
    if (type === "text/plain") {
      reader.readAsText(file, "utf-8");
    } else {
      reader.readAsBinaryString(file);
    }
  };

  return (
    <>
      <CustomAppBar />
      <Box
        sx={{
          height: 30,
        }}
      />
      <Container>
        <Box
          sx={{
            minHeight: 100,
            border: "1px dashed grey",
            paddingTop: 3,
            paddingBottom: 3,
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button component="label" startIcon={<UploadIcon />}>
            {file && `"${fileName}" is selected. Click to change`}
            {!file && "Upload file for POS Tag"}
            <input
              type="file"
              accept="text/plain, .docx, .doc"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          <span
            style={{
              fontSize: 14,
              color: "grey",
            }}
          >
            Each line will be automatically assigned to users
          </span>
        </Box>
        <Box
          sx={{
            height: 30,
          }}
        />
        <Button
          sx={{
            height: 50,
          }}
          onClick={publish}
          variant="contained"
          fullWidth
        >
          publish
        </Button>
      </Container>
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
