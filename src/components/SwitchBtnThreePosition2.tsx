'use client';

import Image from 'next/image';
import { useMemo } from 'react';

type ThemeMode = 'light' | 'system' | 'dark';
const modes: ThemeMode[] = ['light', 'system', 'dark'];

interface Props {
    modeNumber: number;
    disabled?: boolean;
    onChange: (modeNumber: number) => void;
}

const SwitchBtnThreePosition2 = (props: Props) => {
    const activeIndex = useMemo(() => {
        const idx = props.modeNumber - 1;
        if (idx < 0) return 0;
        if (idx > modes.length - 1) return modes.length - 1;
        return idx;
    }, [props.modeNumber]);

    const saveToLocalStorage = (key: string, value: ThemeMode) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

    const mapNumberToThemeMode = (num: number): ThemeMode => {
        switch (num) {
            case 1: return 'dark';
            case 2: return 'system';
            case 3: return 'light';
            default: return 'system';
        }
    };

    const nextMode = () => {
        let newModeNumber = props.modeNumber + 1;
        if (newModeNumber > modes.length) newModeNumber = 1;

        props.onChange(newModeNumber);
        const themeToSave = mapNumberToThemeMode(newModeNumber);
        saveToLocalStorage('theme', themeToSave);
    };

    return (
        <button
            onClick={nextMode}
            disabled={props.disabled}
            className={`relative flex 
        w-[120px] h-10 sm:w-[110px] sm:h-12 lg:w-[130px] lg:h-14 
        items-center justify-between 
        bg-gray-200 p-1 rounded-full border border-gray-300 
        transition-all duration-300
        ${props.disabled ? 'opacity-50' : 'cursor-pointer'}
        shadow-md hover:shadow-lg`}
            aria-label="Toggle theme"
            type="button"
        >
            <div
                className={`absolute top-1 left-1 
          w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12
          rounded-full bg-blue-500 shadow-md 
          transition-transform duration-300 ease-in-out`}
                style={{
                    transform: `translateX(${activeIndex * (window.innerWidth >= 1024 ? 58 : window.innerWidth >= 640 ? 50 : 38)}px)`
                }}
            />

            {modes.map((item, index) => (
                <div
                    key={item}
                    className={`relative z-10 
            w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 
            flex items-center justify-center select-none
            ${activeIndex === index ? 'text-white' : 'text-gray-500'}
            transition-colors duration-300`}
                >
                    <Image
                        src={
                            item === 'system'
                                ? '/system.svg'
                                : item === 'dark'
                                    ? '/moon.svg'
                                    : '/sun.svg'
                        }
                        alt={item}
                        width={activeIndex === index ? 18 : 16}
                        height={activeIndex === index ? 18 : 16}
                    />
                </div>
            ))}
        </button>
    );
};

export default SwitchBtnThreePosition2;
