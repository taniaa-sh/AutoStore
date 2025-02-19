"use client"

import { CustomButtonProps } from "../../types"

export default function CustomButton({title,containerStyles,handleClick,btnType} : CustomButtonProps) {
    return(
        <div className="">
            <button
            type={btnType || "button"}
            disabled={false}
            className={`custom-btn ${containerStyles}`}
            onClick={handleClick}
            >
                <span className={`flex-1`}>
                    {title}
                </span>
            </button>
        </div>
    )
}