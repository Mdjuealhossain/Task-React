import React from "react";

const Button = ({ children, className, onClick, disabled }) => {
    return (
        <button onClick={onClick} disabled={disabled} className={`${className} cursor-pointer px-[18px] py-2 leading-5 text-sm rounded border border-divider`}>
            {children}
        </button>
    );
};

export default Button;
