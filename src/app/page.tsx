import { ArrowLeft, Gamepad2 } from "lucide-react";
import { BottomControls } from "../../components/ui/bottom-menu/bottom-controls";
import ConsoleList from "../../components/ui/console/console-list";

export default function Home() {
  return (
    <div className="z-20 relative min-h-screen">
    <div className="absolute left-15 top-1/2 -translate-y-1/2">
    <div className="flex flex-row gap-10">
        <div className="flex flex-row gap-10 justify-center items-center">
          <Gamepad2 className="w-30 h-30 text-gray-700 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]" />
          <ArrowLeft className="w-8 h-8 text-gray-700"/>
        </div>
            <ConsoleList/>
        </div>
    </div>
      


      <footer>
        <BottomControls
          position="left"
          buttons={[
            { label: "Back", key: "B" },
            { label: "Details", key: "-" },
          ]}
        />
        <BottomControls
          position="right"
          buttons={[
            { label: "Select", key: "A" },
            { label: "Menu", key: "+" },
          ]}
        />
      </footer>
    </div>
  );
}
