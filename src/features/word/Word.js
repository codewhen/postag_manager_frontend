import React from "react";
import { useLocation } from "react-router-dom";
import WordTile from "./components/WordTile";

export default function Word() {
  const { state } = useLocation();
  const output = state;
  const punctuation = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  return (
    <div className="bs">
      {output.map((e) => {
        if (punctuation.includes(e)) {
          return <></>;
        }
        return <WordTile label={e} />;
      })}
    </div>
  );
}
