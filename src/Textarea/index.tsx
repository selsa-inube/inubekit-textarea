import { useState } from "react";
import { MdOutlineError } from "react-icons/md";

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
    return "danger";
  }
  return "gray";
};

const Counter = (
  props: Omit<ITextarea, "id"> & {
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

const Textarea = (props: ITextarea) => {
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
    lengthThreshold = 0,
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
        $focused={focused}
        onChange={onChange}
        onFocus={interceptFocus}
        onBlur={interceptBlur}
        value={value}
      />

      {status === "invalid" && !disabled && (
        <StyledMessageContainer $disabled={disabled} $status={status}>
          <Icon
            appearance="danger"
            disabled={disabled}
            icon={<MdOutlineError />}
          />
          <Text
            type="body"
            size="small"
            textAlign="start"
            margin="8px 0px 0px 4px"
            appearance="danger"
            disabled={disabled}
          >
            {message && `${message}`}
          </Text>
        </StyledMessageContainer>
      )}
    </StyledContainer>
  );
};

export { Textarea };
export type { ITextarea };
