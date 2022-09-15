import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import CustomAppBar from "../../core/components/appbar/AppBar";
import { baseUrl } from "../../core/config/config";
import { posTag } from "../../shared/sharingVar";
import WordTile from "./components/WordTile";

export default function Word() {
  const { state } = useLocation();
  const navigator = useNavigate();
  const { sentences, data, index } =
    state == null ? { sentences: [], data: [], index: 0 } : state;
  const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  useEffect(() => {
    if (localStorage.getItem("isAdmin") === "true") {
      navigator("/admin");
      return;
    }
  }, [navigator]);

  let wordsPOS = data;
  let visited = data.map((e) => false);

  const onDoneClick = (e) => {
    console.log(visited);
    if (visited.includes(false)) {
      toast.error("Add POS for all the items!!");
      return;
    }
    posTag.set(index, wordsPOS);
    axios.post(
      `${baseUrl}doc/tag/${sentences[index]._id}`,
      {
        output: wordsPOS.join(" "),
      },
      {}
    );
    navigator("../sentence", { replace: true, state: sentences });
  };

  return (
    <div className="word-root">
      <CustomAppBar label="User Panel" />
      <Box sx={{ height: 8 }} />
      <div className="bs">
        {data.map((e, i) => {
          if (punctuation.includes(e)) {
            visited[i] = true;
            return <div key={i}></div>;
          }
          return (
            <WordTile
              key={i}
              label={e}
              posChange={(pos) => {
                wordsPOS[i] = wordsPOS[i].split("\\")[0] + pos;
                wordsPOS[i] = wordsPOS[i].split("\\null")[0];
                visited[i] = true;
                console.log(wordsPOS);
              }}
            />
          );
        })}
        <div className="submitBtn">
          <button className={`dropbtn`} onClick={onDoneClick}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
