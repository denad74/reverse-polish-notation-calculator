import React, { useState } from "react";
import Button from "./Button";
import "../style/Form.css";
import "../style/Button.css";
const Form = (props) => {
  const [enteredInput, setEnteredInput] = useState("");
  let isValid = true;

  const wrongInput = "Only numbers and arithmetic operators are valid!";
  const emptyInput = "You did not enter anything!";
  let isEmpty = enteredInput.length > 0;
  const keyPressHandler = (e) => {
    isValid = e.charCode >= 42 && e.charCode <= 57;
  };

  const onChangeHandler = (e) => {
    if (!isValid) {
      props.message(wrongInput);
      return;
    }

    setEnteredInput(e.target.value);
    props.message("");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isEmpty) {
      props.message(emptyInput);
      return;
    }

    props.onClaculate(enteredInput);

    setEnteredInput("");
  };

  const onClearHandler = () => {
    setEnteredInput("");
    props.onClearResult();
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmitHandler}>
        <input
          pattern="^\d*(\.\d{0,2})?$"
          className="form-input clear"
          onChange={onChangeHandler}
          onKeyPress={keyPressHandler}
          type="text"
          value={props.result ? props.result : enteredInput}
          placeholder="Enter the operand and operator: 2,6,5,5,4,*,-,+"
        ></input>
      </form>
      <div className="buttons">
        <Button onClick={onClearHandler}>Clear</Button>
        <Button type="submit" onClick={onSubmitHandler}>
          Compute
        </Button>
      </div>
    </div>
  );
};

export default Form;
