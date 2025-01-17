"use client"

import { CustomButtonProps } from "../../types"

export default function CustomButton({title,containerStyles,handleClick} : CustomButtonProps) {
    return(
        <div className="">
            <button
            disabled={false}
            type={"button"}
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