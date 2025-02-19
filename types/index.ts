import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title : string;
    containerStyles? : string;
    handleClick ?: MouseEventHandler<HTMLButtonElement>;
    btnType? : "button" | "submit";
}

export interface SearchManufaturerProps {
    setManufacturer: (manufacturer : string) => void
    manufacturer: string
}