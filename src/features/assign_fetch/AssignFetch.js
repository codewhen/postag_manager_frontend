import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import { baseUrl } from "../../core/config/config";
import styles from "./AssignFetch.module.css";

export default function AssignFetch() {
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);

  const fetchAssigned = useCallback(async () => {
    try {
      if (!localStorage.getItem("token")) {
        navigate("login");
        return;
      }
      setIsEmpty(false);
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
      if (response.data.docs.length === 0) {
        setIsEmpty(true);
      } else {
        navigate("/sentence/", {
          state: response.data.docs.map((e) => {
            return e;
          }),
        });
      }
    } catch (err) {
      toast.error("Error fetching");
      console.log(err);
    }
  }, [navigate]);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      navigate("/admin");
      return;
    }
    fetchAssigned();
  }, [fetchAssigned, navigate]);

  return (
    <>
      {isEmpty && (
        <>
          <h3 className={styles["center-label"]}>No assigned task!!</h3>
          <button onClick={fetchAssigned} className={styles.refresh}>
            &#8634;
          </button>
        </>
      )}
      {!isEmpty && (
        <Portal node={document && document.getElementById("loader")}>
          <div className="loader-context">
            <BounceLoader color={"#ffffff"} loading={true} size={60} />
          </div>
        </Portal>
      )}
    </>
  );
}
