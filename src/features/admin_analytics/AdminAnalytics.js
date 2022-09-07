import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { BounceLoader } from "react-spinners";
import { baseUrl } from "../../core/config/config";
import styles from "./AdminAnalytics.module.css";

export default function AdminAnalytics() {
  const [isLoading, setisLoading] = useState(true);

  const getAnalyticsUserWise = async () => {
    try {
      setisLoading(true);
      const response = await axios.get(`${baseUrl}doc/analytics/userwise`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setisLoading(false);
      console.log(response);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      setanalytics(response.data.analytics);
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getAnalyticsUserWise();
  }, []);

  const [analytics, setanalytics] = useState([]);

  return (
    <div>
      {analytics.map((e) => {
        return (
          <>
            <h2 className={styles.name}>
              {e && e._id && e._id.user ? e._id.user.name : "Unknown user"} (
              {e.input.length})
            </h2>
            {e.input.map((e) => {
              return (
                <>
                  <p className={styles.labels} style={{ paddingTop: 12 }}>
                    Original
                  </p>
                  <p className={styles.main}>{e.input}</p>
                  <p className={styles.labels}>POS Tagged</p>
                  <p className={styles.main}>
                    {e.output ? e.output : "Yet to submit"}
                  </p>
                </>
              );
            })}
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
    </div>
  );
}
