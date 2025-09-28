import clsx from "clsx"

type GameCardProps = {
  name: string
  icon: string
  selected?: boolean
  color1?: string
  color2?: string
  color3?: string
}

export function GameCard({
  name,
  icon,
  selected,
  color1 = "#F97316",
  color2 = "#FCD34D",
  color3,
}: GameCardProps) {
  const verticalGradient = color3
    ? `linear-gradient(to bottom, ${color1}, ${color3}, ${color2})`
    : `linear-gradient(to bottom, ${color1}, ${color2})`

  return (
    <div
      className={clsx(
        "relative flex items-center gap-6 p-4 rounded-lg transition-transform duration-200",
        selected ? "scale-105" : "scale-95"
      )}
    >
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
              style={{ background: verticalGradient }}
            >
              <div className="w-full h-full bg-transparent rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold text-gray-700">{name}</h2>
      </div>
    </div>
  )
}
