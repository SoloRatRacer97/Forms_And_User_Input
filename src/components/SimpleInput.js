import { getByDisplayValue } from "@testing-library/react";
import React, { useRef } from "react";

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
    // Here we can customize the input logic for the input variable. Here, we are doing a trim for the name input
  } = useInput((value) => value.trim() !== "");

  const nameInputRef = useRef();

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
    // Again, we want to validate the logic for the input for the email. Basically, just check if it has an @ right now
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmitionHandler = (event) => {
    // Dont forget to prevent default!
    event.preventDefault();

    // This will prevent the user from entering ampty data ON THE FONT END
    // Reacll from previous courses, I would also need to do form validation on the server so
    // the user couldn't injext code from the browser's source code as well.
    // setEnteredNameTouched(true);

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    // Recall that to get the value out of the ref, we need to do .current.value
    // Refs are useful when you only need to get the value once
    // Using the state method id better for instant validation. Like with a valid emial that is avalible.
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitionHandler}>
      {/* Two ways to get use input:
      1) Listening to keystrokes and store value in state
      2) Use a ref to fetch the value and store it in a value. */}
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        {/* Every keystroke method: onChange
          Using the useRef method: ref=""*/}
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameChangedHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
        />
        {nameInputHasError && (
          <p className="error-text">Please enter a valid name</p>
        )}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your Email</label>
        {/* Every keystroke method: onChange
          Using the useRef method: ref=""*/}
        <input
          ref={nameInputRef}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          value={enteredEmail}
          onBlur={emailBlurHandler}
        />
        {emailInputHasError && (
          <p className="error-text">Please enter a valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
