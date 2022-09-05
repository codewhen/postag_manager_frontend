import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import userImage from "../../assets/images/rome.jpg";
import { baseUrl } from "../../core/config/config";
import styles from "./AdminUserList.module.css";

export default function AdminUserList() {
  useEffect(() => {
    getAllUsers();
  }, []);

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${baseUrl}users/all`);
      console.log(response);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      setUsers(response.data.users);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.user}>
      {users.map((e) => {
        return (
          <div className={styles["user-item"]}>
            <div className={styles.card}>
              <img className={styles["card-img"]} src={userImage} alt="User" />
              <div className={styles["card-content"]}>
                <p>{e.name}</p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 400,
                    color: "grey",
                    paddingTop: 0,
                  }}
                >
                  {e.email}
                </p>
                <p></p>
                {/* <button className={styles["card-btn"]}>
                  View <span>&rarr;</span>
                </button> */}
                <button className={styles["card-btn"]}>
                  Edit <span>&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className={styles["user-item"]}>
        <div className={styles.card}>
          <img className={styles["card-img"]} src={userImage} alt="User" />
          <div className={styles["card-content"]}>
            <button
              onClick={() => navigate("new")}
              className={styles["card-btn"]}
            >
              Add user <span>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
