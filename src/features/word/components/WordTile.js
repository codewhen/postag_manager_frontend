import { Grid, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import styles from "./WordTile.module.css";

export default function WordTile({ label, posChange }) {
  const [posTag1, setPosTag1] = useState(null);
  const [posTag2, setPosTag2] = useState(null);
  const [posTag3, setPosTag3] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDropDownClick = async (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onButtonClick = async (posName) => {
    console.log(anchorEl.innerText[0]);
    switch (anchorEl.innerText[0]) {
      case "1":
        setPosTag1(posName);
        posChange("\\" + posName + "\\" + posTag2 + "\\" + posTag3);
        break;
      case "2":
        if (!posTag1) {
          toast.error("First add 1st layer");
          return;
        }
        setPosTag2(posName);
        posChange("\\" + posTag1 + "\\" + posName + "\\" + posTag3);
        break;
      case "3":
        if (!posTag1 || !posTag2) {
          toast.error("First add 1st and 2nd layer");
          return;
        }
        setPosTag3(posName);
        posChange("\\" + posTag1 + "\\" + posTag2 + "\\" + posName);
        break;
      default:
        break;
    }
    handleClose();
  };

  return (
    <div className={styles["word-tile"]}>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <div className="word-card">
            <p>{label}</p>
          </div>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <button
                className={`dropbtn ${posTag1 == null ? "" : "added"}`}
                onClick={onDropDownClick}
              >
                {posTag1 == null && "1st Layer"}
                {posTag1 != null &&
                  `1st layer Click to edit (current: ${posTag1})`}
              </button>
            </Grid>
            <Grid item>
              <button
                className={`dropbtn ${posTag2 == null ? "" : "added"}`}
                onClick={onDropDownClick}
              >
                {posTag2 == null && "2nd Layer"}
                {posTag2 != null &&
                  `2nd layer Click to edit (current: ${posTag2})`}
              </button>
            </Grid>
            <Grid item xs={12} sm="auto">
              <button
                className={`dropbtn ${posTag3 == null ? "" : "added"}`}
                onClick={onDropDownClick}
              >
                {posTag3 == null && "3rd Layer"}
                {posTag3 != null &&
                  `3rd layer Click to edit (current: ${posTag3})`}
              </button>
            </Grid>
          </Grid>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {["N", "V", "NV"].map((e) => {
              return (
                <MenuItem key={e} onClick={() => onButtonClick(e)}>
                  {e}
                </MenuItem>
              );
            })}
          </Menu>
        </Grid>
      </Grid>
    </div>
  );
}
