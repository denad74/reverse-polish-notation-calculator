import React, { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Form from "./components/Form";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState("");

  const numberOfOperators =
    "Something went wrong! check the number of OPERATORS!";
  const numberOfOperands =
    "Something went wrong! check the number of OPERANDS!";

  const calculateHandler = (enteredNum) => {
    let stack = [];
    let enteredValue = enteredNum.split(",");
    console.log(enteredValue);
    for (let i = 0; i < enteredValue.length; i++) {
      if (!isNaN(enteredValue[i]) && isFinite(enteredValue[i])) {
        console.log(typeof enteredValue[i]);
        stack.push(+enteredValue[i]);
      } else {
        let x = stack.pop();
        let y = stack.pop();
        console.log(x, y);
        if (y === undefined) {
          setErrorMessage(numberOfOperators);
          return;
        } else {
          let z = "";
          if (enteredValue[i] === "+") {
            z = (+x * 100 + +y * 100).toFixed(2);
            stack.push(z / 100);
          } else if (enteredValue[i] === "-") {
            z = (+x * 100 - +y * 100).toFixed(2);
            stack.push(z / 100);
          } else if (enteredValue[i] === "*") {
            z = (+x * 100 * +y * 100).toFixed(2);
            stack.push(z / 100);
          } else if (enteredValue[i] === "/") {
            z = (((+x * 100) / +y) * 100).toFixed(2);
            stack.push(z / 100);
          }
        }
        console.log(stack);
      }
    }
    if (stack.length > 1) {
      return setErrorMessage(numberOfOperands);
    }
    let calculateResult = stack.pop();
    return setResult(`${enteredNum} = ${calculateResult / 100}`);
  };

  const onErrorMessage = (message) => {
    setErrorMessage(message);
  };

  const ClearResultHandler = () => {
    setResult();
  };

  return (
    <div className="container">
      <Header />
      <div className="section-form">
        <Form
          onClaculate={calculateHandler}
          message={onErrorMessage}
          result={result}
          onClearResult={ClearResultHandler}
        />
        <div className="error-message clear">
          <p>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
