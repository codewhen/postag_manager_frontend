import React, { useEffect } from "react";
import styles from "./AdminDashboard.module.css";
import userImage from "../../assets/images/rome.jpg";
import docImage from "../../assets/images/grand-canyon.jpg";
import analyticsImage from "../../assets/images/maldives.jpg";
import taggedDocImage from "../../assets/images/camera.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const onUserClick = (e) => {
    navigate("user");
  };
  const onDocClick = (e) => {
    navigate("doc");
  };
  const onTaggedClick = (e) => {
    navigate("tagged");
  };
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.a}>
        <div className={styles.grid}>
          <div className={styles["grid-item"]}>
            <div className={styles.card}>
              <img className={styles["card-img"]} src={userImage} alt="User" />
              <div className={styles["card-content"]}>
                <button onClick={onUserClick} className={styles["card-btn"]}>
                  <Link to="user">User </Link>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles["grid-item"]}>
            <div className={styles.card}>
              <img
                className={styles["card-img"]}
                src={docImage}
                alt="Grand Canyon"
              />
              <div className={styles["card-content"]}>
                <button onClick={onDocClick} className={styles["card-btn"]}>
                  <Link to="doc">Doc </Link> <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
          <div className={styles["grid-item"]}>
            <div className={styles.card}>
              <img
                className={styles["card-img"]}
                src={analyticsImage}
                alt="Analytics"
              />
              <div className={styles["card-content"]}>
                <button className={styles["card-btn"]}>
                  <a href="analytics.html">Analytics </a> <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.b}>
        <div className={styles["grid-item"]}>
          <div className={styles.card}>
            <img
              className={styles["card-img"]}
              src={taggedDocImage}
              alt="Tagged docs"
            />
            <div className={styles["card-content"]}>
              <button onClick={onTaggedClick} className={styles["card-btn"]}>
                Tagged Doc <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
