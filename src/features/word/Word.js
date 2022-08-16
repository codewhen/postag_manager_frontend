import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import WordTile from "./components/WordTile";

export default function Word() {
  const { state } = useLocation();
  const navigator = useNavigate();
  const { sentences, data } = state;
  const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  let wordsPOS = data;

  const onDoneClick = (e) => {
    navigator("../sentence", { replace: true, state: sentences });
  };

  return (
    <div className="bs">
      {data.map((e, i) => {
        if (punctuation.includes(e)) {
          return <div key={i}></div>;
        }
        return (
          <WordTile
            key={i}
            label={e}
            posChange={(pos) => {
              wordsPOS[i] = wordsPOS[i].split("\\")[0] + "\\" + pos;
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
