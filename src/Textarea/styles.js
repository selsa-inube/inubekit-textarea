import styled from "styled-components";
import { inube } from "@inubekit/foundations";

export const StyledContainer = styled.div`
  cursor: ${({ $disabled }) => $disabled && "not-allowed"};
  width: ${({ $fullwidth }) => ($fullwidth ? "100%" : "fit-content")};
`;

export const StyledTextarea = styled.textarea`
  border-radius: 8px;
  padding: 8px 12px 8px 16px;
  font-family: ${({ theme }) =>
    theme?.typography?.body?.large?.font || inube.typography.body.large.font};
  font-size: ${inube.typography.body.large.size};
  font-weight: ${inube.typography.body.large.weight};
  line-height: ${inube.typography.body.large.lineHeight};
  letter-spacing: ${inube.typography.body.large.tracking};
  width: ${({ $fullwidth }) => ($fullwidth ? "calc(100% - 32px)" : "452px")};
  height: 120px;
  color: ${({ disabled, theme }) =>
    disabled
      ? theme?.input?.content?.color?.disabled ||
        inube.input.content.color.disabled
      : theme?.input?.content?.color?.regular ||
        inube.input.content.color.regular};
  border: 1px solid
    ${({ $disabled, $status, $focused, theme }) => {
      if ($disabled) {
        return (
          theme?.input?.border?.color?.disabled ||
          inube.input.border.color.disabled
        );
      }

      if ($status === "invalid") {
        return (
          theme?.input?.border?.color?.invalid ||
          inube.input.border.color.invalid
        );
      }

      if ($focused) {
        return (
          theme?.input?.border?.color?.focus || inube.input.border.color.focus
        );
      }
      return (
        theme?.input?.border?.color?.regular || inube.input.border.color.regular
      );
    }};
  ${({ $disabled }) => $disabled && "pointer-events: none; opacity: 0.5;"}

  ::placeholder {
    color: ${({ theme }) =>
      theme?.input?.placeholder?.color?.regular ||
      inube.input.placeholder.color.regular};
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
  color: ${({ theme }) =>
    theme?.input?.message?.color?.invalid ||
    inube.input.message.color.invalid}};

  & svg {
    width: 14px;
    height: 14px;
    margin-top: 8px;
  }
`;
