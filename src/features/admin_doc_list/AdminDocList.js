import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { baseUrl } from "../../core/config/config";

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
      <h1>docs</h1>
      {docs.map((e) => {
        return (
          <>
            <button
              onClick={() => buttonClick(e._id)}
              style={{
                padding: 8,
                margin: 4,
              }}
            >
              {e.docName}
            </button>
          </>
        );
      })}
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
