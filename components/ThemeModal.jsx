import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { Menu } from '@headlessui/react'
import { SunIcon } from '@heroicons/react/outline';
import { MoonIcon } from '@heroicons/react/solid';
import { useLoaded } from "./useLoaded";

const ThemeModal = () => {
    const { theme, setTheme } = useContext(ThemeContext)
    const loaded = useLoaded();

    return (
        <Menu as="div" className="relative inline-block text-left text-black " >
            <Menu.Button aria-label="theme">{loaded && theme === "light" ? <SunIcon className="w-8 h-8" /> : <MoonIcon className="w-8 h-8 text-neutral-200" />} </Menu.Button>
            <Menu.Items className="absolute left-0 top-10 w-40 flex flex-col gap-y-1 rounded-md bg-white shadow-xl  dark:bg-neutral-200 lg:-left-32 lg:top-12 ">
                <Menu.Item className={`w-full h-full px-4 py-2 flex items-center gap-x-2 hover:bg-gray-100 hover:rounded-b-md ${theme === "light" ? "text-red-600" : ""} `} onClick={() => setTheme("light")}>
                    <button >
                        <SunIcon aria-hidden="true" className={`w-5 h-5  ${theme === "light" ? "text-red-500" : ""}`} />
                        Light
                    </button>
                </Menu.Item>
                <Menu.Item className={`w-full h-full px-4 py-2 flex items-center gap-x-2 hover:bg-gray-100 hover:rounded-b-md ${theme === "dark" ? "text-red-600" : ""}`} onClick={() => setTheme("dark")}>
                    <button>
                        <MoonIcon aria-hidden="true" className={`w-5 h-5 ${theme === "dark" ? "text-red-600" : ""}`} />
                        Dark
                    </button>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}

export default ThemeModal;
