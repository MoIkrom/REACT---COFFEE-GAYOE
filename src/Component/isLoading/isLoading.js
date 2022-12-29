import React from "react";
import styles from "./isLoading.module.css";

function IsLoading() {
  return (
    <>
      <div className={styles["lds-ring"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className={styles["loading-text"]}>Loading</p>
    </>
  );
}

export default IsLoading;
