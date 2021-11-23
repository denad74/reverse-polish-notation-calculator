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

    for (let i = 0; i < enteredValue.length; i++) {
      if (!isNaN(+enteredValue[i]) && isFinite(enteredValue[i])) {
        stack.push(enteredValue[i]);
      } else {
        let x = stack.pop();
        let y = stack.pop();
        if (y === undefined) {
          setErrorMessage(numberOfOperators);
          return;
        } else {
          if (enteredValue[i] === "+") {
            stack.push(+x + +y);
          } else if (enteredValue[i] === "-") {
            stack.push(+y - +x);
          } else if (enteredValue[i] === "*") {
            stack.push(+x * +y);
          } else if (enteredValue[i] === "/") {
            stack.push(+y / +x);
          }
        }
      }
    }
    if (stack.length > 1) {
      return setErrorMessage(numberOfOperands);
    }
    return setResult(`${enteredNum} = ${stack.pop()}`);
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
