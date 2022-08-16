import React from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { posTag } from "../../shared/sharingVar";
import WordTile from "./components/WordTile";

export default function Word() {
  const { state } = useLocation();
  const navigator = useNavigate();
  const { sentences, data, index } = state;
  const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  let wordsPOS = data;
  let visited = data.map((e) => false);

  const onDoneClick = (e) => {
    console.log(visited);
    if (visited.includes(false)) {
      toast.error("Add POS for all the items!!");
      return;
    }
    posTag.set(index, wordsPOS);
    navigator("../sentence", { replace: true, state: sentences });
  };

  return (
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
              wordsPOS[i] = wordsPOS[i].split("\\")[0] + "\\" + pos;
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
  );
}
