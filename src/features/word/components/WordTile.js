import React, { useState } from "react";

export default function WordTile({ label, posChange }) {
  const [isDropdownShown, setisDropdownShown] = useState(false);
  const [posTag, setPosTag] = useState(null);

  const onDropDownClick = async (e) => {
    const allWithClass = Array.from(
      document.getElementsByClassName("dropdown-content")
    );
    allWithClass.forEach((element) => {
      element.classList.remove("show");
    });
    setisDropdownShown((e) => !e);
  };

  const onButtonClick = async (posName) => {
    setPosTag(posName);
    setisDropdownShown(false);
    posChange(posName);
  };

  return (
    <div className="word-elements">
      <div className="word-left  word-card">
        <p>{label}</p>
      </div>
      <div className="dropdown word-drop">
        <button
          className={`dropbtn ${posTag == null ? "" : "added"}`}
          onClick={onDropDownClick}
        >
          {posTag == null && "Click to add POS Tag"}
          {posTag != null && `Click to edit (current: ${posTag})`}
        </button>
        <div className={`dropdown-content ${isDropdownShown ? "show" : ""}`}>
          {["N", "V", "NV"].map((e) => {
            return (
              <button key={e} onClick={() => onButtonClick(e)}>
                {e}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
