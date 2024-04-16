import React, { useId, useState } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: {
    type: string;
    message?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, error, type, value, onChange, ...props }, ref) => {
    const id = useId();
    const [innerValue, setInnerValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (newValue.length <= 255 && (newValue === "" || /^[a-z0-9]+$/i.test(newValue))) {
        setInnerValue(newValue);
        if (onChange) {
          onChange(e);
        }
      }
    }

    return (
      <div className="wrapper">
        <label htmlFor={id} className="label">
          {label}
        </label>
        <input id={id} className="input" type={type} value={value ?? innerValue} onChange={handleInputChange} {...props} ref={ref} />
        {error?.type && (
          <span className="mt-2 text-sm font-medium text-red-500">
            {error.message}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
