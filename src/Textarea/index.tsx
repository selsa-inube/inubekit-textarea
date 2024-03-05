import { useState } from "react";
import { MdOutlineError } from "react-icons/md";

import { Icon } from "@inubekit/icon";
import { Label } from "@inubekit/label";
import { Stack } from "@inubekit/stack";
import { Text } from "@inubekit/text";

import { Status } from "./props";
import {
  StyledContainer,
  StyledTextarea,
  StyledMessageContainer,
} from "./styles";

interface ICounter {
  maxLength: number;
  currentLength: number;
}

interface ITextarea {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  focused?: boolean;
  status?: Status;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  required?: boolean;
  message?: string;
  fullwidth?: boolean;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const getCounterAppearance = (maxLength: number, valueLength: number) => {
  const lengthThreshold = Math.floor(maxLength * 0.1);
  if (maxLength - valueLength <= lengthThreshold && valueLength <= maxLength) {
    return "warning";
  } else if (valueLength > maxLength) {
    return "danger";
  }
  return "gray";
};

const Counter = ({ maxLength, currentLength }: ICounter) => {
  const appearance = getCounterAppearance(maxLength, currentLength);

  return (
    <Text
      type="body"
      size="small"
      appearance={appearance}
      textAlign="start"
    >{`${currentLength}/${maxLength}`}</Text>
  );
};

const Textarea = (props: ITextarea) => {
  const {
    label,
    name,
    id,
    placeholder,
    disabled,
    value = "",
    maxLength = 100,
    required,
    status = "pending",
    message,
    fullwidth,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const [focused, setFocused] = useState(false);

  const interceptFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(true);
    if (typeof onFocus === "function") {
      onFocus(e);
    }
  };

  const interceptBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(false);
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
                focused={focused}
                invalid={status === "invalid" ? true : false}
              >
                {label}
              </Label>
            )}

            {required && !disabled && (
              <Text
                type="body"
                size="small"
                appearance="danger"
                textAlign="start"
              >
                (Requerido)
              </Text>
            )}
          </Stack>
        )}
        {!disabled && (
          <Stack justifyContent="flex-end" alignItems="center" width="100%">
            <Counter maxLength={maxLength} currentLength={value.length} />
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
        $focused={focused}
        onChange={onChange}
        onFocus={interceptFocus}
        onBlur={interceptBlur}
        value={value}
      />

      {status === "invalid" && !disabled && message && (
        <StyledMessageContainer>
          <Icon appearance="danger" icon={<MdOutlineError />} />
          <Text
            type="body"
            size="small"
            textAlign="start"
            margin="8px 0px 0px 4px"
            appearance="danger"
          >
            {message}
          </Text>
        </StyledMessageContainer>
      )}
    </StyledContainer>
  );
};

export { Textarea };
export type { ITextarea };
