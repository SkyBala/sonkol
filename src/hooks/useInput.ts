import { useEffect, useState } from "react";
import { IValidResponse, IValidations, useValidation } from "./useValidation";

export interface IInput extends IValidResponse {
  value: string;
  onChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onChangeOther: (value: string) => void;
  onBlur: () => void;
  isDirty: boolean;
  errorMsg: string;
  handleIsDirty: (bool: boolean) => void;
}

export const useInput = (initialValue: string, validations: IValidations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    isDirty && setErrorMsg(valid.errorMsg);
  }, [valid.errorMsg, isDirty]);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    (validations.maxLength
      ? e.target.value.length < validations.maxLength
      : true) &&
      setValue(
        validations.isSWBL
          ? (e.target.value[0]?.toUpperCase() || "") + e.target.value.slice(1)
          : e.target.value
      );
  };

  const onChangeOther = (value: string) => {
    setValue(value);
  };

  const onBlur = () => {
    setDirty(true);
  };

  const handleIsDirty = (boolean: boolean) => {
    setDirty(boolean)
  }

  return {
    value,
    onChange,
    onChangeOther,
    onBlur,
    isDirty,
    ...valid,
    errorMsg,
    handleIsDirty,
  };
};
