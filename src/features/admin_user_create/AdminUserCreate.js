import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../core/config/config";
import styles from "./AdminUserCreate.module.css";

export default function AdminUserCreate() {
  const formRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const onCreate = async (e) => {
    try {
      e.preventDefault();
      if (isLoading) {
        return;
      }
      setisLoading(true);
      const name = formRef.current[0].value;
      const email = formRef.current[1].value;
      const password = formRef.current[2].value;
      const response = await axios.post(
        `${baseUrl}auth/signup`,
        {
          name: name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setisLoading(false);
      console.log(response);
      if (response.status !== 200 && response.data.message) {
        toast.error(response.data.message);
        return;
      }
      toast.success(`Successfully created new user`);
      navigate("../admin");
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };
  return (
    <section className={styles["contact-form"]}>
      <div className={styles["div-form"]}>
        <form ref={formRef} onSubmit={onCreate}>
          <label className={styles.label} htmlFor="fname">
            Full Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="fname"
            placeholder="Your name.."
          />

          <label className={styles.label} htmlFor="lname">
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Your email.."
          />

          <label className={styles.label} htmlFor="contact">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            placeholder="Enter the password.."
          />

          <button
            className={`${styles["form-button"]} ${styles.submit}`}
            type="submit"
            name="button"
            value="Submit"
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </section>
  );
}
