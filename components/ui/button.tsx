// components/ui/button.tsx

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  );
};

type ColorButtonProps = ButtonProps & {
    colour: string;
};

export const ColorButton: React.FC<ColorButtonProps> = ({ children, colour, ...props }) => {
    return (
        <button
            className={`px-4 py-2 text-white rounded hover:brightness-90 transition`}
            style={{ backgroundColor: colour }}
            {...props}
        >
            {children}
        </button>
    );
};