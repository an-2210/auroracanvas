import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  RectangleHorizontal, Type, MousePointer2, Image, Layers, Columns3, Layout
} from "lucide-react";
import { useBuilderStore } from "@/store/builderStore.js";
import { COMPONENT_REGISTRY } from "@/lib/registry.jsx";

const getIconForType = (type) => {
  switch (type) {
    case 'HeroSection': return RectangleHorizontal;
    case 'TextBlock': return Layout;
    case 'CardsGrid': return Columns3;
    case 'Heading': return Type;
    case 'Paragraph': return Type;
    case 'Button': return MousePointer2;
    case 'Image': return Image;
    default: return Layers;
  }
};

const LayerNode = ({ element, depth, selectedId, onSelect }) => {
  const isSelected = selectedId === element.id;
  const config = COMPONENT_REGISTRY[element.type];
  const Icon = getIconForType(element.type);

  return (
    <div>
      <motion.div
        className={`flex items-center gap-1.5 py-1.5 px-2 rounded-lg cursor-pointer text-xs transition-all duration-200 group ${
          isSelected
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        }`}
        style={{
          paddingLeft: `${depth * 14 + 8}px`,
          ...(isSelected
            ? {
                background: "hsl(260 100% 68% / 0.1)",
                boxShadow: "0 0 8px -3px hsl(260 100% 68% / 0.2)",
              }
            : {}),
        }}
        onClick={() => onSelect(element.id)}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-4" />
        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="flex-1 truncate font-medium">{config?.name || element.type}</span>
      </motion.div>
    </div>
  );
};

const LayersPanel = () => {
  const [collapsed, setCollapsed] = useState(false);
  const elements = useBuilderStore(state => state.elements);
  const selectedElementId = useBuilderStore(state => state.selectedElementId);
  const selectElement = useBuilderStore(state => state.selectElement);
  const previewMode = useBuilderStore(state => state.previewMode);

  if (previewMode) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass mt-2 z-10"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-between w-full px-4 py-3"
      >
        <div className="panel-header mb-0">
          <span>Layers</span>
        </div>
        <motion.div animate={{ rotate: collapsed ? -90 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight className="w-3 h-3 text-muted-foreground/40 rotate-90" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-2 pb-3 max-h-52 overflow-y-auto scrollbar-thin">
              {elements.length === 0 && (
                <div className="text-[10px] text-muted-foreground/50 px-3 py-2 text-center">Empty Canvas</div>
              )}
              {elements.map((item) => (
                <LayerNode
                   key={item.id}
                   element={item}
                   depth={0}
                   selectedId={selectedElementId}
                   onSelect={selectElement}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LayersPanel;
