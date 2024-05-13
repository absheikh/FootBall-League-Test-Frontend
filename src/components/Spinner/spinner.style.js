import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 9999,
  },
  spinnerInner: {
    display: "inline-block",
    width: "30px",
    height: "30px",
    border: "4px solid transparent",
    borderTop: "4px solid  #333",
    borderRadius: "50%",
    animation: "$spinnerRotate 1s linear infinite",
  },
  "@keyframes spinnerRotate": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));
