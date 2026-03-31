import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopNavbar from "@/components/builder/TopNavbar.jsx";
import ElementsPanel from "@/components/builder/ElementsPanel.jsx";
import BuilderCanvas from "@/components/builder/BuilderCanvas.jsx";
import PropertiesPanel from "@/components/builder/PropertiesPanel.jsx";
import LayersPanel from "@/components/builder/LayersPanel.jsx";

const pageTransition = {
  initial: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  transition: { duration: 0.6, ease: "easeOut" },
};

const BuilderPage = () => {
  const [deviceMode, setDeviceMode] = useState("desktop");
  const [selectedElement, setSelectedElement] = useState("hero");

  return (
    <motion.div
      className="h-screen flex flex-col overflow-hidden"
      {...pageTransition}
    >
      <TopNavbar deviceMode={deviceMode} onDeviceChange={setDeviceMode} />

      <div className="flex flex-1 pt-14 overflow-hidden">
        {/* Left Panel */}
        <div className="flex flex-col p-2 pr-0 gap-0">
          <ElementsPanel />
          <LayersPanel selectedElement={selectedElement} onSelectElement={setSelectedElement} />
        </div>

        {/* Canvas */}
        <BuilderCanvas
          deviceMode={deviceMode}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
        />

        {/* Right Panel */}
        <div className="p-2 pl-0">
          <PropertiesPanel selectedElement={selectedElement} />
        </div>
      </div>
    </motion.div>
  );
};

export default BuilderPage;
