import clsx from "clsx"

type ConsoleCardProps = {
  name: string
  totalGames: number
  icon: string
  selected?: boolean
  color1?: string 
  color2?: string 
  color3?: string 
}

export function ConsoleCard({
  name,
  totalGames,
  icon,
  selected,
  color1 = "#f472b6", 
  color2 = "#06b6d4", 
  color3,
}: ConsoleCardProps) {
  const verticalGradient = color3
    ? `linear-gradient(to bottom, ${color1}, ${color3}, ${color2})`
    : `linear-gradient(to bottom, ${color1}, ${color2})`

  const boxGradient = color3
    ? `linear-gradient(to right, ${color1}, ${color3}, ${color2})`
    : `linear-gradient(to right, ${color1}, ${color2})`

  return (
    <div
      className={clsx(
        "relative flex items-center gap-6 p-4 rounded-lg transition-transform duration-200",
        selected ? "scale-105" : "scale-95"
      )}
    >

      <div
        className="absolute left-0 top-0 h-full w-2 rounded-l-lg"
        style={{ background: selected ? verticalGradient : "transparent" }}
      />

  
      <div
        className="relative w-60 h-60 rounded-lg p-[2px] shadow-lg"
        style={{ background: verticalGradient }}
      >
        <div className="w-full h-full rounded-lg bg-white flex items-center justify-center relative overflow-hidden">
     
          <img
            src={icon}
            alt={name}
            className="object-cover opacity-20 absolute"
          />


          <div className="flex flex-col gap-2 z-10">
            <div
              className="w-20 h-12 rounded-sm p-[2px]"
              style={{ background: boxGradient }}
            >
              <div className="w-full h-full bg-transparent rounded-sm"></div>
            </div>
            <div
              className="w-20 h-12 rounded-sm p-[2px]"
              style={{ background: boxGradient }}
            >
              <div className="w-full h-full bg-transparent rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>

     
      <div>
        <h2 className="text-3xl font-bold text-gray-700">{name}</h2>
        <div className="mt-3 inline-flex items-center px-4 py-1 bg-gray-100 rounded-full border border-gray-300 shadow-sm">
          <span className="text-sm font-medium text-gray-600 mr-2">
            Total Games:
          </span>
          <span className="px-2 py-0.5 bg-white rounded-full text-gray-700 font-semibold shadow-inner">
            {totalGames}
          </span>
        </div>
      </div>
    </div>
  )
}
