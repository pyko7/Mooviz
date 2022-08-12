import thor from "../public/assets/thor.jpg"
import Image from "next/image"
import { useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";

const MovieCard = () => {
    const [overlay, setOverlay] = useState(false)
    return (
        <article className="relative w-1/4 xl:min-w-[390px] lg:w-full lg:min-w-[auto] md:w-full" onMouseOver={() => setOverlay(true)} onMouseOut={() => setOverlay(false)}>
            <div className="relative w-full h-[300px] overflow-hidden rounded-xl xl:h-[400px] lg:h-[450px] md:h-80 sm:h-72 ">
                <Image src={thor} layout="fill" objectFit="cover" priority alt="" />
                <button>
                    <PlusIcon className="hidden md:block md:absolute md:bottom-4 md:right-4 md:w-12 md:h-12 md:bg-white md:rounded-[50%] md:border-black md:border-2" />
                </button>
            </div>
            {overlay ?
                <div className="absolute inset-0 w-full h-full p-4 bg-black/95 text-white rounded-xl lg:p-6">
                    <div className="w-11/12">
                        <h3 className=" text-3xl font-bold line-clamp-3 xl:w-4/5 lg:text-2xl md:w-11/12 md:text-lg sm:text-lg">Thor: Ragnarok</h3>
                        <p className="mt-2 mb-4 lg:text-md md:text-sm sm:w-5/6 sm:text-xs">Genre: Action-Adventure</p>
                        <p className="line-clamp-[6] lg:text-md md:text-sm sm:w-5/6 sm:text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique necessitatibus veritatis amet hic assumenda. Nesciunt natus a cum omnis labore impedit doloremque esse voluptas asperiores eveniet, quis atque unde consectetur magnam debitis quas totam delectus numquam assumenda tenetur in suscipit. Fugiat impedit consequuntur nemo similique!</p>
                    </div>
                </div>
                : null}
        </article>
    );
}

export default MovieCard;