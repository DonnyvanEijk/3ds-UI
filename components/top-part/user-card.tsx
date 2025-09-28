import { BatteryFull, Clock } from "lucide-react"

export const UserCard = () => {
    return (
        <div className="fixed top-10 right-0 z-[1000]">
            <div className="relative bg-[#f3f4f6] border-gray-500 text-gray-500 border-3 py-5 pr-10 w-84 rounded-l-full border-r-0 flex flex-row gap-2 shadow-xl">
                <div className="flex flex-row gap-2 ml-5 items-center">
                    <Clock/>
                    <span className="font-bold text-lg drop-shadow-sm">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                    </span>
                </div>
                <span className="font-bold drop-shadow-sm">|</span>
                <div>
                    <span className="text-md text-lg font-bold drop-shadow-sm">
                        {`${new Date().getMonth() + 1}/${new Date().getDate()}`}
                    </span>
                </div>
                <div className="ml-2 flex justify-center">
                    <BatteryFull/>
                </div>
                <div
                    className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center absolute -right-0 top-1/2 -translate-y-1/2 bg-white z-10 overflow-hidden p-0 shadow-2xl"
                >
                    <img
                        src="https://www.startpage.com/av/proxy-image?piurl=https%3A%2F%2Ftse3.mm.bing.net%2Fth%2Fid%2FOIP.YDyoIafIwW1tILED3HgZRQHaHa%3Fpid%3DApi&sp=1759052172Tb69c8996b1069062635253649a89c5a8c90101ae9152cec6cbd85c3622241126"
                        alt="User"
                        className="w-full h-full rounded-full object-cover shadow"
                    />
                </div>
                <span
                    className="absolute -top-3 right-1 z-10 bg-gray-600 text-white text-xs font-bold px-2 py-0.5 rounded-full drop-shadow-md"
                    title="Press RB for more info"
                >
                    RB
                </span>
            </div>
        </div>
    )
}