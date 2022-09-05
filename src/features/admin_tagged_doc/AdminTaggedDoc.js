import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../core/config/config";

export default function AdminTaggedDoc(props) {
  const [possedDoc, setPossedDoc] = useState([]);

  const { id } = useParams();

  const getPossed = useCallback(async () => {
    try {
      const response = await axios.post(`${baseUrl}doc/rearrange/${id}`);
      console.log(response);
      if (response.data.message) {
        toast.error(response.data.message);
        return;
      }

      setPossedDoc([response.data]);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  useEffect(() => {
    getPossed();
  }, [getPossed]);

  return (
    <>
      {possedDoc.map((e) => {
        return (
          <>
            <h2>{e.doc.docName}</h2>
            <span>input</span>
            <p>{e.inputStr}</p>
            <span>output</span>
            <p>{e.outputStr}</p>
          </>
        );
      })}
    </>
  );
}
