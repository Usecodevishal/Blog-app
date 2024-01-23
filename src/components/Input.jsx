import React, { useId } from "react";

const Input = React.forwardRef(function Input({
  label,
  className = "",
  type = "text",
  ...props
}) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <lable className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </lable>
      )}
      <input
        id={id}
        ref={ref}
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black focus:bg-gray-50 duration-200 
        border border-gray-200 outline-none ${className} w-full`}
        {...props}
      ></input>
    </div>
  );
},
ref);

export default Input;
