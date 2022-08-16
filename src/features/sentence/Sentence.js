import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl } from "../../core/config/config";
import { posTag } from "../../shared/sharingVar";

export default function Sentence() {
  const { state } = useLocation();
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();
  const output = state;

  const onSubmit = async (input, index) => {
    try {
      setisLoading(true);
      let headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Access-Control-Request-Headers", "*");
      const response = await axios.post(`${baseUrl}/word-tokenisation`, {
        header: headers,
        input: input,
      });
      console.log(response);

      if (response.data.message) {
        toast.error(response.data.message);
        setisLoading(false);
        return;
      }
      setisLoading(false);

      navigate("/word/", {
        state: { data: response.data.output, sentences: output, index: index },
      });
    } catch (err) {
      setisLoading(false);
      console.log(err);
    }
  };

  return (
    <div className="bs">
      <div className="elements">
        {output.map((e, i) => {
          return (
            <div key={i} className="card">
              <div className="left">
                <p>{e}</p>
              </div>
              <div className="right">
                <button
                  className={`btn-select ${posTag.has(i) ? "filled" : ""}`}
                  type="submit"
                  name="button"
                  onClick={() => onSubmit(e, i)}
                >
                  {posTag.has(i) && "Selected"}
                  {!posTag.has(i) && "Select"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="submitBtn">
        <button
          className={`dropbtn`}
          onClick={() => {
            console.log(posTag);
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
