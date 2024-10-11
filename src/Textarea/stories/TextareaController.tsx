import { useState } from "react";
import { ITextarea, Textarea } from "..";

const TextareaController = (props: ITextarea) => {
  const {
    value = "",
    status = "pending",
    maxLength = 0,
    minLength = 0,
  } = props;
  const [form, setForm] = useState({ value, status });
  const [message, setMessage] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ value: e.target.value, status: "pending" });
    return;
  };

  const onFocus = () => {
    if (form.status === "invalid") {
      return setForm({ ...form, status: "invalid" });
    }
    setForm({ ...form, status: "pending" });
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueLength = e.target.value.length;

    if (valueLength > maxLength) {
      setForm({ ...form, status: "invalid" });
      setMessage(
        `The input exceeds the maximum length of ${maxLength} characters.`,
      );
    } else if (valueLength < minLength) {
      setForm({ ...form, status: "invalid" });
      setMessage(
        `The input is shorter than the minimum length of ${minLength} characters.`,
      );
    } else {
      setForm({ ...form, status: "pending" });
      setMessage("");
    }
  };

  return (
    <Textarea
      {...props}
      value={form.value}
      status={form.status}
      maxLength={maxLength}
      minLength={minLength}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      message={message}
    />
  );
};

export { TextareaController };
