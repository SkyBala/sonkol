import { useEffect, useState } from "react";

export interface IValidations {
  minLength: number;
  maxLength?: number;
  isEmpty?: boolean;
  isEmail?: boolean;
  confirmTo?: string;
  isSWBL?: boolean;
  isArray?: boolean;
}

export interface IValidResponse {
  isEmpty: boolean;
  minLengthError: boolean;
  errorMsg: string;
  emailError: boolean;
  inputValid: boolean;
}

export const useValidation = (value: string, validations: IValidations) => {
  const [emailError, setEmailError] = useState(false);
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputValid, setInputValid] = useState(false);

  useEffect(() => {
    outer: for (const validation in validations) {
      switch (validation) {
        case "minLength":
          if (value.length < validations[validation]) {
            setMinLengthError(true);
            setErrorMsg("Incorrect length!");
          } else {
            setMinLengthError(false);
          }
          break;
        case "isEmpty":
          if (value) {
            setEmpty(false);
          } else {
            setEmpty(true);
            setErrorMsg("The field cannot be empty!");
            break outer;
          }
          break;
        case "isEmail":
          const EMAIL_REGEXP =
            /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
          if (EMAIL_REGEXP.test(value)) {
            setEmailError(false);
          } else {
            setEmailError(true);
            setErrorMsg("Incorrect email!");
          }
          break;
        case "confirmTo":
          if (value !== validations[validation]) {
            setConfirmError(true);
            setErrorMsg("Incorrect password confirmation!");
          } else {
            setConfirmError(false);
          }
          break;
        default:
      }
    }
  }, [value, validations]);

  useEffect(() => {
    if (isEmpty || minLengthError || emailError || confirmError) {
      setInputValid(false);
    } else {
      setInputValid(true);
      setErrorMsg("");
    }
  }, [isEmpty, minLengthError, emailError, confirmError]);

  return {
    isEmpty,
    minLengthError,
    errorMsg,
    emailError,
    inputValid,
  };
};
