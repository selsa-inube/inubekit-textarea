import styled from "styled-components";
import { inube } from "@inubekit/foundations";
import { InputTokens } from "@inubekit/input";

const StyledContainer = styled.div`
  cursor: ${({ $disabled }) => $disabled && "not-allowed"};
  width: ${({ $fullwidth }) => ($fullwidth ? "100%" : "fit-content")};
`;

const StyledTextarea = styled.textarea`
  border-radius: 8px;
  padding: 8px 12px 8px 16px;
  font-family: ${({ theme }) =>
    theme?.typography?.body?.large?.font || inube.typography.body.large.font};
  font-size: ${inube.typography.body.large.size};
  font-weight: 400;
  line-height: ${inube.typography.body.large.lineHeight};
  letter-spacing: ${inube.typography.body.large.tracking};
  width: ${({ $fullwidth }) => ($fullwidth ? "calc(100% - 32px)" : "452px")};
  height: 120px;
  color: ${({ disabled, theme }) =>
    disabled
      ? theme?.input?.content?.color?.disabled ||
        InputTokens.content.color.disabled
      : theme?.input?.content?.color?.regular ||
        InputTokens.content.color.regular};
  border: 1px solid
    ${({ $disabled, $status, $focused, theme }) => {
      if ($disabled) {
        return (
          theme?.input?.border?.color?.disabled ||
          InputTokens.border.color.disabled
        );
      }

      if ($status === "invalid") {
        return (
          theme?.input?.border?.color?.invalid ||
          InputTokens.border.color.invalid
        );
      }

      if ($focused) {
        return (
          theme?.input?.border?.color?.focus || InputTokens.border.color.focus
        );
      }
      return (
        theme?.input?.border?.color?.regular || InputTokens.border.color.regular
      );
    }};
  pointer-events: ${({ $disabled }) => $disabled && "none"};
  opacity: ${({ $disabled }) => $disabled && "0.5"};

  ::placeholder {
    color: ${({ theme }) =>
      theme?.input?.placeholder?.color?.regular ||
      InputTokens.placeholder.color.regular};
  }

  &:focus {
    outline: none;
    border-width: 2px;
  }

  &:-webkit-autofill {
    -webkit-background-clip: text;
  }
`;

const StyledMessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
  pointer-events: none;

  & > svg {
    width: 14px;
    height: 14px;
    margin-top: 8px;
  }
`;

const StyledLabelContainer = styled.p`
  text-wrap: nowrap;
`;
export {
  StyledContainer,
  StyledLabelContainer,
  StyledTextarea,
  StyledMessageContainer,
};
