import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Eye, EyeOff,
  RectangleHorizontal, Type, MousePointer2, Image, Layers
} from "lucide-react";

const layerTree = [
  {
    id: "page", label: "Page", icon: Layers,
    children: [
      {
        id: "hero", label: "Hero Section", icon: RectangleHorizontal,
        children: [
          { id: "heading", label: "Heading", icon: Type },
          { id: "subtext", label: "Paragraph", icon: Type },
          { id: "cta-btn", label: "CTA Button", icon: MousePointer2 },
        ],
      },
      {
        id: "text-block", label: "Text Block", icon: Type,
        children: [
          { id: "h2", label: "Subheading", icon: Type },
          { id: "desc", label: "Description", icon: Type },
        ],
      },
      {
        id: "cards", label: "Cards Grid", icon: RectangleHorizontal,
        children: [
          { id: "card-1", label: "Card — Fast", icon: Image },
          { id: "card-2", label: "Card — Beautiful", icon: Image },
          { id: "card-3", label: "Card — Responsive", icon: Image },
        ],
      },
    ],
  },
];

const LayerNode = ({
  item, depth, selectedId, onSelect,
}) => {
  const [open, setOpen] = useState(depth < 2);
  const [visible, setVisible] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isSelected = selectedId === item.id;

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
        onClick={() => onSelect(item.id)}
        whileTap={{ scale: 0.98 }}
      >
        {hasChildren ? (
          <motion.button
            onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
            animate={{ rotate: open ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="p-0.5"
          >
            <ChevronRight className="w-3 h-3" />
          </motion.button>
        ) : (
          <div className="w-4" />
        )}
        <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="flex-1 truncate font-medium">{item.label}</span>
        <motion.button
          onClick={(e) => { e.stopPropagation(); setVisible(!visible); }}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
          whileHover={{ scale: 1.2 }}
        >
          {visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3 text-destructive/60" />}
        </motion.button>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            {/* Indent line */}
            <div className="relative">
              <div
                className="absolute top-0 bottom-0 w-px bg-border/15"
                style={{ left: `${depth * 14 + 18}px` }}
              />
              {item.children.map((child, i) => (
                <motion.div
                  key={child.id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <LayerNode item={child} depth={depth + 1} selectedId={selectedId} onSelect={onSelect} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LayersPanel = ({
  selectedElement, onSelectElement,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="glass mt-2"
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
              {layerTree.map((item) => (
                <LayerNode
                   key={item.id}
                   item={item}
                   depth={0}
                   selectedId={selectedElement}
                   onSelect={onSelectElement}
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
