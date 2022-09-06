import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { baseUrl } from "../../core/config/config";
import styles from "./AdminAnalytics.module.css";

export default function AdminAnalytics() {
  const getAnalyticsUserWise = async () => {
    try {
      const response = await axios.get(`${baseUrl}doc/analytics/userwise`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }

      toast.success("Saved the doc!!");
      setanalytics(response.data.analytics);
    } catch (err) {
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
              {e._id.user.name} ({e.input.length})
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
    </div>
  );
}
