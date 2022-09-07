import React from "react";
import { Button, Card, CardMedia } from "@mui/material";
import styles from "./CardButton.module.css";

export default function CardButton({ image, alt, label, onTap }) {
  return (
    <Card onClick={onTap} className={styles.card}>
      <CardMedia
        component="img"
        height="200"
        style={{
          objectFit: "contain",
        }}
        image={image}
        alt={alt}
      />
      <Button className={styles["card-button"]} variant="contained" fullWidth>
        {label}
      </Button>
    </Card>
  );
}
