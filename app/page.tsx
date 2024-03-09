import ControlPanel from "@/components/control-panel";
import FlowEditor from "@/components/flow-editor";
import Header from "@/components/header";

export default function Home() {
  return (
    <div className="h-screen">
      <Header />
      <FlowEditor />

      <ControlPanel />
    </div>
  );
}
