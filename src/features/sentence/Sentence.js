import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useLocation, useNavigate } from "react-router-dom";
import { BounceLoader } from "react-spinners";
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
      const response = await axios.get(`${baseUrl}doc/word-tokenisation`, {
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
        state: {
          data: response.data[0].output,
          sentences: output,
          index: index,
        },
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
            navigate("../result", { state: output });
            console.log(posTag);
          }}
        >
          Done
        </button>
      </div>
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
