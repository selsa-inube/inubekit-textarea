import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { typography } from "./typography";

export const StyledContainer = styled.div`
  cursor: ${({ $disabled }) => $disabled && "not-allowed"};
  width: ${({ $fullwidth }) => ($fullwidth ? "100%" : "fit-content")};
`;

export const StyledTextarea = styled.textarea`
  border-radius: 8px;
  padding: 8px 12px 8px 16px;
  font-family: ${typography.body.large.font};
  font-size: ${typography.body.large.size};
  font-weight: ${typography.body.large.weight};
  line-height: ${typography.body.large.lineHeight};
  letter-spacing: ${typography.body.large.tracking};
  width: ${({ $fullwidth }) => ($fullwidth ? "calc(100% - 32px)" : "452px")};
  height: 120px;
  color: ${({ disabled, theme }) =>
    disabled
      ? theme?.text?.gray?.content?.color?.disabled ||
        inube.text.gray.content.color.disabled
      : theme?.text?.dark?.content?.color?.regular ||
        inube.text.dark.content.color.regular};
  border: 2px solid
    ${({ $disabled, $status, $isFocused, theme }) => {
      if ($disabled) {
        return (
          theme?.text?.gray?.content?.color?.disabled ||
          inube.text.gray.content.color.disabled
        );
      }

      if ($status === "invalid") {
        return (
          theme?.text?.danger?.content?.color?.regular ||
          inube.text.danger.content.color.regular
        );
      }

      if ($isFocused) {
        return (
          theme?.text?.primary?.content?.color?.hover ||
          inube.text.primary.content.color.hover
        );
      }
      return (
        theme?.text?.gray?.content?.color?.regular ||
        inube.text.gray.content.color.regular
      );
    }};
  ${({ $disabled }) => $disabled && "pointer-events: none; opacity: 0.5;"}

  ::placeholder {
    color: ${({ theme }) =>
      theme?.text?.dark?.content?.color?.regular ||
      inube.text.dark.content.color.regular};
  }

  &:focus {
    outline: none;
    border-width: 2px;
  }

  &:-webkit-autofill {
    -webkit-background-clip: text;
  }
`;

export const StyledMessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  pointer-events: none;
  color: ${({ $disabled, $status, theme }) => {
    if ($disabled) {
      return (
        theme?.text?.dark?.content?.color?.disabled ||
        inube.text.dark.content.color.disabled
      );
    }

    if ($status === "valid") {
      return (
        theme?.text?.success?.content?.color?.regular ||
        inube.text.success.content.color.regular
      );
    }

    if ($status === "invalid") {
      return (
        theme?.text?.danger?.content?.color?.regular ||
        inube.text.danger.content.color.regular
      );
    }
  }};

  & svg {
    width: 14px;
    height: 14px;
    margin-top: 8px;
  }
`;
