import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../core/config/config";
import styles from "./AdminDoc.module.css";

export default function AdminDoc() {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
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

      navigate("/admin", { replace: true });
    } catch (err) {
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
    const { name } = file;

    setFileName(name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return;
      }
      const { result } = evt.target;

      console.log(result);

      setFile(result);
    };
    reader.readAsText(file, "utf-8");
  };

  return (
    <div className={styles.out}>
      <div
        className={styles.in}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <label
          style={{
            padding: "8px 16px",
            background: "white",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          {!file && <>Upload file for POS Tag &rarr;</>}
          {file && `"${fileName}" is selected. Click to change`}
          <input type="file" accept=".txt" hidden onChange={handleFileChange} />
        </label>
      </div>
      <div className={styles["card-content"]}>
        <button onClick={publish} className={styles["doc-button"]}>
          Publish<span>&uarr;</span>
        </button>
      </div>
    </div>
  );
}
