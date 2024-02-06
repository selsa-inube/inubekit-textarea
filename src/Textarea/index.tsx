import { useState } from "react";
import { MdOutlineError, MdCheckCircle } from "react-icons/md";

import { Icon } from "@inubekit/icon";
import { Label } from "@inubekit/label";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { Appearence, Status } from "./props";
import {
  StyledContainer,
  StyledTextarea,
  StyledMessageContainer,
} from "./styles";

interface ITextareaProps {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  isFocused?: boolean;
  status?: Status;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  required?: boolean;
  message?: string;
  fullwidth?: boolean;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  lengthThreshold?: number;
}

const defineAppearance = (
  maxLength: number,
  valueLength: number,
  lengthThreshold: number,
) => {
  if (maxLength - valueLength <= lengthThreshold && valueLength <= maxLength) {
    return "warning";
  } else if (valueLength > maxLength) {
    return "error";
  }
  return "gray";
};

const Counter = (
  props: Omit<ITextareaProps, "id"> & {
    valueLength: number;
    appearance: Appearence;
  },
) => {
  const { maxLength, appearance, disabled, valueLength } = props;

  return (
    <Text
      type="body"
      size="small"
      disabled={disabled}
      appearance={appearance}
      textAlign="start"
    >{`${valueLength}/${maxLength}`}</Text>
  );
};

const Message = (props: Omit<ITextareaProps, "id">) => {
  const { disabled, status, message } = props;

  return status !== "pending" ? (
    <StyledMessageContainer $disabled={disabled} $status={status}>
      <Icon
        appearance={status === "invalid" ? "error" : "success"}
        disabled={disabled}
        icon={status === "invalid" ? <MdOutlineError /> : <MdCheckCircle />}
      />
      <Text
        type="body"
        size="small"
        textAlign="start"
        margin="8px 0px 0px 4px"
        appearance={status === "invalid" ? "error" : "success"}
        disabled={disabled}
      >
        {message && `${message}`}
      </Text>
    </StyledMessageContainer>
  ) : (
    <></>
  );
};

export const Textarea = (props: ITextareaProps) => {
  const {
    label,
    name,
    id,
    placeholder,
    disabled,
    value = "",
    maxLength = 0,
    required,
    status = "pending",
    message,
    fullwidth,
    onChange,
    onFocus,
    onBlur,
    readOnly,
    lengthThreshold = 0,
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const interceptFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!readOnly) {
      setIsFocused(true);
    }
    if (typeof onFocus === "function") {
      onFocus(e);
    }
  };

  const interceptBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (typeof onBlur === "function") {
      onBlur(e);
    }
  };

  return (
    <StyledContainer $fullwidth={fullwidth} $disabled={disabled}>
      <Stack width="100%" margin="s0 s0 s050 s0">
        {(label || required) && (
          <Stack gap="4px" alignItems="center" padding="s0 s0 s0 s200">
            {label && (
              <Label
                htmlFor={id}
                disabled={disabled}
                focused={isFocused}
                invalid={status === "invalid" ? true : false}
              >
                {label}
              </Label>
            )}

            {required && !disabled && (
              <Text
                type="body"
                size="small"
                appearance="dark"
                textAlign="start"
              >
                (Requerido)
              </Text>
            )}
          </Stack>
        )}
        {!disabled && (
          <Stack justifyContent="flex-end" alignItems="center" width="100%">
            <Counter
              appearance={defineAppearance(
                maxLength,
                value.length,
                lengthThreshold,
              )}
              maxLength={maxLength}
              lengthThreshold={lengthThreshold}
              disabled={disabled}
              valueLength={value!.length}
            />
          </Stack>
        )}
      </Stack>

      <StyledTextarea
        name={name}
        id={id}
        placeholder={placeholder}
        $disabled={disabled}
        required={required}
        $status={status}
        $fullwidth={fullwidth}
        $isFocused={isFocused}
        onChange={onChange}
        onFocus={interceptFocus}
        onBlur={interceptBlur}
        readOnly={readOnly}
        value={value}
      />

      {status && (
        <Message disabled={disabled} status={status} message={message} />
      )}
    </StyledContainer>
  );
};