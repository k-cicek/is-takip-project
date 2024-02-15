import React, { useId } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: {
    type: string;
    message?: string;
  };
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, error, type, ...props }, ref) => {
    const id = useId();

    return (
      <div className="wrapper">
        <label htmlFor={id} className="label">
          {label}
        </label>
        <input id={id} className="input" type={type} {...props} ref={ref} />
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
