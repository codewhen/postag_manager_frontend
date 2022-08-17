import React from "react";
import { useLocation } from "react-router-dom";
import { posTag } from "../../shared/sharingVar";

export default function Output() {
  const { state } = useLocation();
  const sentences = state;
  let outputList = sentences;
  posTag.forEach((value, key) => {
    outputList[key] = value.join(" ");
  });
  console.log(outputList);
  let output = outputList.join(" ");
  output = output.replaceAll(" .", " |");

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([output], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "postag.txt";
    document.body.appendChild(element);
    element.click();
  };
  return (
    <div className="bd">
      <div className="elements">
        <div className="pd-10">{output}</div>
        <div className="submitBtn">
          <button className={`dropbtn`} onClick={downloadTxtFile}>
            Save as txt file
          </button>
        </div>
      </div>
    </div>
  );
}
