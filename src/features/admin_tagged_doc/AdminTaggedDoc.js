import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useNavigate, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import CustomAppBar from "../../core/components/appbar/AppBar";
import { baseUrl } from "../../core/config/config";

export default function AdminTaggedDoc(props) {
  const [possedDoc, setPossedDoc] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  const getPossed = useCallback(async () => {
    try {
      setisLoading(true);
      const response = await axios.post(`${baseUrl}doc/rearrange/${id}`);
      console.log(response);
      setisLoading(false);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }

      setPossedDoc([response.data]);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching");
      setisLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if (isAdmin !== "true") {
      navigate("/login");
    }
    getPossed();
  }, [getPossed, navigate]);

  return (
    <>
      <CustomAppBar />
      {possedDoc.map((e) => {
        return (
          <>
            <h2
              style={{
                margin: "8px 18px",
                textDecoration: "underline",
              }}
            >
              {e.doc.docName}
            </h2>
            <span
              style={{
                margin: "0px 18px",
              }}
            >
              input
            </span>
            <p>{e.inputStr}</p>
            <span
              style={{
                margin: "0px 18px",
              }}
            >
              output
            </span>
            <p>{e.outputStr}</p>
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
