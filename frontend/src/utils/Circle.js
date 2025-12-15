import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  circle: {
    //defining circle
    height: "20px",
    width: "20px",
    borderRadius: "40%",
    //postion absolute helps to put
    //element relative to containing unit
    position: "absolute",
    //adjusting positon of circle
    bottom: "25px",
    left: "14px",
    fontWeight: "bold"
  }
});

const Circle = (props) => {
  const { totalQuantity, cartstyle } = props;
  const classes = useStyles();
  return (
    <div>
      <div
        //  In order to apply props received, we have used style property
        style={{
          backgroundColor: `${cartstyle.circleBg}`,
          color: `${cartstyle.color}`,
          paddingLeft: "5px",
          border: "1px solid #000",
          
        }}
        className={classes.circle}
      >
        <span>{totalQuantity}</span>
      </div>
    </div>
  );
};
export default Circle;