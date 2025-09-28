
import { BottomControls } from "../../components/ui/bottom-menu/bottom-controls";
import ConsoleList from "../../components/ui/console/console-list";


export default function Home() {
  return (
    <div className="z-20 relative min-h-screen w-[100vw]">
    <div className="absolute  left-1/6 top-1/2 -translate-y-1/2">
            <ConsoleList/>
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
