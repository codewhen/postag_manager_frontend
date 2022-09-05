import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../core/config/config";

export default function AdminDocList() {
  useEffect(() => {
    getAllDocs();
  }, []);

  const navigate = useNavigate();

  const [docs, setDocs] = useState([]);

  const getAllDocs = async () => {
    try {
      const response = await axios.get(`${baseUrl}doc/tag`);
      console.log(response);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }
      setDocs(response.data.docs);
    } catch (err) {
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
          <button
            onClick={() => buttonClick(e._id)}
            style={{
              padding: 8,
              margin: 4,
            }}
          >
            {e.docName}
          </button>
        );
      })}
    </>
  );
}
