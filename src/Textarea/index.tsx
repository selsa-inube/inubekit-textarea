import { useState, useContext } from "react";
import { MdOutlineError } from "react-icons/md";

import { Icon } from "@inubekit/icon";
import { Label } from "@inubekit/label";
import { Stack } from "@inubekit/stack";
import { ITextAppearance, Text } from "@inubekit/text";

import { ITextareaStatus } from "./props";
import {
  StyledContainer,
  StyledTextarea,
  StyledMessageContainer,
  StyledLabelContainer,
} from "./styles";

import { ThemeContext } from "styled-components";
import { InputTokens } from "@inubekit/input";

interface ICounter {
  maxLength: number;
  currentLength: number;
  minLength?: number;
}

interface ITextarea {
  label?: string;
  name?: string;
  id: string;
  placeholder?: string;
  disabled?: boolean;
  focused?: boolean;
  status?: ITextareaStatus;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  message?: string;
  fullwidth?: boolean;
  onFocus?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const getCounterAppearance = (
  maxLength: number,
  valueLength: number,
  minLength?: number,
) => {
  if (minLength && valueLength < minLength) {
    return "danger";
  }

  const lengthThreshold = Math.floor(maxLength * 0.1);
  if (maxLength - valueLength <= lengthThreshold && valueLength <= maxLength) {
    return "warning";
  } else if (valueLength > maxLength) {
    return "danger";
  }
  return "gray";
};

const Counter = ({ maxLength, currentLength, minLength }: ICounter) => {
  const appearance = getCounterAppearance(maxLength, currentLength, minLength);

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
    minLength = 0,
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
    try {
      onFocus && onFocus(e);
    } catch (error) {
      console.error(`Error executing focus callback. ${error}`);
    }
  };

  const interceptBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocused(false);
    try {
      onBlur && onBlur(e);
    } catch (error) {
      console.error(`Error executing blur callback. ${error}`);
    }
  };

  const interceptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onChange && onChange(e);
    } catch (error) {
      console.error(`Error when changing value using callback. ${error}`);
    }
  };

  const theme = useContext(ThemeContext) as { input: typeof InputTokens };
  const requiredAppearance =
    (theme?.input?.required?.appearance as ITextAppearance) ||
    InputTokens.required.appearance;
  const messageAppearance =
    (theme?.input?.message?.appearance as ITextAppearance) ||
    InputTokens.message.appearance;

  return (
    <StyledContainer $fullwidth={fullwidth} $disabled={disabled}>
      <Stack width="100%" margin="0 0 4px 0">
        {(label || required) && (
          <Stack alignItems="center" padding="0 0 0 16px" height="15px">
            {label && (
              <StyledLabelContainer>
                <Label
                  htmlFor={id}
                  disabled={disabled}
                  focused={focused}
                  invalid={status === "invalid" ? true : false}
                >
                  {label}
                </Label>
              </StyledLabelContainer>
            )}

            {required && !disabled && (
              <Text
                type="body"
                size="small"
                appearance={requiredAppearance}
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
              maxLength={maxLength}
              minLength={minLength}
              currentLength={value.length}
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
        onChange={interceptChange}
        onFocus={interceptFocus}
        onBlur={interceptBlur}
        value={value}
      />

      {status === "invalid" && !disabled && message && (
        <StyledMessageContainer>
          <Icon appearance={messageAppearance} icon={<MdOutlineError />} />
          <Text
            type="body"
            size="small"
            textAlign="start"
            margin="8px 0px 0px 4px"
            appearance={messageAppearance}
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
