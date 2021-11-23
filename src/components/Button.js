import React from "react";
import "../style/Button.css";

const Button = (props) => {
  return (
    <div>
      <button type={props.type} className="btn" onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  );
};

export default Button;
