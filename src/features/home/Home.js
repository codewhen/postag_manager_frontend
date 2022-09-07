import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../core/config/config";
import { BounceLoader } from "react-spinners";

export default function Home() {
  const inputRef = useRef();
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setisLoading(true);
      const input = inputRef.current.value;
      let headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Access-Control-Request-Headers", "*");
      const response = await axios.post(`${baseUrl}/sentence-tokenisation`, {
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

      navigate("/sentence/", { state: response.data.output });
    } catch (err) {
      toast.error("Error submitting");
      setisLoading(false);
      console.log(err);
    }
  };
  return (
    <>
      <div className="bd">
        <div className="tarea">
          <h1>Welcome page</h1>

          <textarea ref={inputRef} placeholder="Type here.."></textarea>

          <div className="btn">
            <button type="submit" name="button" onClick={onSubmit}>
              Submit
            </button>
          </div>
        </div>
        {isLoading && (
          <Portal node={document && document.getElementById("loader")}>
            <div className="loader-context">
              <BounceLoader color={"#ffffff"} loading={true} size={60} />
            </div>
          </Portal>
        )}
      </div>
    </>
  );
}
