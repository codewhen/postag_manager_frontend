import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { baseUrl } from "../../core/config/config";

export default function AssignFetch() {
  useEffect(() => {
    fetchAssigned();
  }, []);

  const navigate = useNavigate();

  const fetchAssigned = async () => {
    try {
      const response = await axios.get(`${baseUrl}doc/assigned/self`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status !== 200 && response.data.message) {
        toast.error(response.data.message);
        return;
      }
      navigate("/sentence/", {
        state: response.data.docs.map((e) => {
          return e.input;
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Portal node={document && document.getElementById("loader")}>
        <div className="loader-context">
          <BounceLoader color={"#ffffff"} loading={true} size={60} />
        </div>
      </Portal>
    </>
  );
}
