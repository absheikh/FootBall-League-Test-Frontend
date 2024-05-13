import React from "react";
import { useStyles } from "./spinner.style";

const Spinner = () => {
  const styles = useStyles();
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerInner}></div>
    </div>
  );
};

export default Spinner;
