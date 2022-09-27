import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = enteredValue.trim() !== "";
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
      setEnteredValue(event.target.value);
    // Need to use event target value here becasue React has not had a chance to process the enteredName state yet and
    // we would be relying on an old state.
  };
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
      setEnteredValue("");
      setIsTouched(false)
  }

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
