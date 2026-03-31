import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Type, Trash2, Copy, Bold, Italic,
  AlignLeft, AlignCenter, AlignRight, Link, Move
} from "lucide-react";
import TiltCard from "@/components/reactbits/TiltCard.jsx";

const canvasWidths = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

const FloatingToolbar = ({ onClose }) => (
  <motion.div
    initial={{ y: 10, opacity: 0, scale: 0.9 }}
    animate={{ y: 0, opacity: 1, scale: 1 }}
    exit={{ y: 10, opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="absolute -top-12 left-1/2 -translate-x-1/2 glass-strong flex items-center gap-0.5 px-2 py-1.5 z-20 rounded-xl"
  >
    {[Bold, Italic].map((Icon, i) => (
      <motion.button key={i} className="icon-btn p-1.5" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
        <Icon className="w-3.5 h-3.5" />
      </motion.button>
    ))}
    <div className="w-px h-4 bg-border/30 mx-1" />
    {[AlignLeft, AlignCenter, AlignRight].map((Icon, i) => (
      <motion.button key={i} className={`icon-btn p-1.5 ${i === 1 ? "active" : ""}`} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
        <Icon className="w-3.5 h-3.5" />
      </motion.button>
    ))}
    <div className="w-px h-4 bg-border/30 mx-1" />
    <motion.button className="icon-btn p-1.5" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
      <Copy className="w-3.5 h-3.5" />
    </motion.button>
    <motion.button className="icon-btn p-1.5 text-destructive" onClick={onClose} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
      <Trash2 className="w-3.5 h-3.5" />
    </motion.button>
  </motion.div>
);

const ResizeHandle = ({ position }) => {
  const posClasses = {
    "top-left": "-top-1.5 -left-1.5 cursor-nw-resize",
    "top-right": "-top-1.5 -right-1.5 cursor-ne-resize",
    "bottom-left": "-bottom-1.5 -left-1.5 cursor-sw-resize",
    "bottom-right": "-bottom-1.5 -right-1.5 cursor-se-resize",
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      className={`absolute w-3 h-3 rounded-full bg-primary border-2 border-background ${posClasses[position]}`}
      style={{ boxShadow: "0 0 8px hsl(260 100% 68% / 0.5)" }}
      whileHover={{ scale: 1.5 }}
    />
  );
};

const BuilderCanvas = ({ deviceMode, selectedElement, onSelectElement }) => {
  const [hoveredElement, setHoveredElement] = useState(null);

  const elements = [
    {
      id: "hero",
      type: "Hero Section",
      content: (
        <div className="py-16 px-8 text-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-xl">
          <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-3">
            Welcome to our platform
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            Build Beautiful<br />Websites Visually
          </h1>
          <p className="text-lg text-slate-500 max-w-md mx-auto mb-8">
            Create stunning, responsive websites without writing a single line of code.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-sm shadow-lg shadow-blue-600/25 hover:bg-blue-700 transition-colors">
              Get Started
            </button>
            <button className="px-6 py-2.5 bg-white text-slate-700 rounded-lg font-medium text-sm border border-slate-200 hover:bg-slate-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "text-block",
      type: "Text Block",
      content: (
        <div className="py-8 px-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Our Features</h2>
          <p className="text-slate-500 leading-relaxed">
            Drag and drop components to build your perfect website.
            Customize every aspect with our intuitive property panel.
          </p>
        </div>
      ),
    },
    {
      id: "cards",
      type: "Cards Grid",
      content: (
        <div className="py-6 px-8 grid grid-cols-3 gap-4">
          {[
            { title: "Fast", desc: "Lightning quick performance", color: "blue" },
            { title: "Beautiful", desc: "Stunning visual design", color: "purple" },
            { title: "Responsive", desc: "Works on all devices", color: "pink" },
          ].map(({ title, desc, color }) => (
            <TiltCard key={title} tiltAmount={6}>
              <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                <div className={`w-10 h-10 rounded-lg mb-3 bg-${color}-100 flex items-center justify-center`}>
                  <Type className={`w-5 h-5 text-${color}-600`} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      className="flex-1 overflow-auto flex justify-center relative"
      style={{ background: "hsl(var(--canvas-bg))" }}
      onClick={() => onSelectElement(null)}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient glow orbs */}
      <motion.div
        className="absolute top-20 left-1/3 w-[500px] h-[300px] pointer-events-none rounded-full"
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ background: "radial-gradient(ellipse, hsl(260 100% 68% / 0.15), transparent 70%)" }}
      />
      <motion.div
        className="absolute bottom-20 right-1/4 w-[400px] h-[250px] pointer-events-none rounded-full"
        animate={{ opacity: [0.03, 0.06, 0.03] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ background: "radial-gradient(ellipse, hsl(210 100% 60% / 0.1), transparent 70%)" }}
      />

      {/* Canvas Area */}
      <div className="p-6 w-full flex justify-center">
        <motion.div
          animate={{ width: canvasWidths[deviceMode] }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-[1100px] w-full z-10"
        >
          {/* Canvas chrome label */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-3 px-1"
          >
            <span className="tooltip-tag">Live Preview</span>
            <span className="text-[10px] font-mono text-muted-foreground/40">
              {deviceMode === "desktop" ? "1200px" : deviceMode === "tablet" ? "768px" : "375px"} × auto
            </span>
          </motion.div>

          {/* Page */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="bg-canvas-page rounded-2xl overflow-hidden min-h-[550px]"
            style={{
              boxShadow: "0 25px 60px -12px hsl(230 25% 0% / 0.5), 0 0 0 1px hsl(0 0% 100% / 0.05)",
            }}
          >
            {elements.map((el, idx) => (
              <motion.div
                key={el.id}
                className={`canvas-element relative group ${selectedElement === el.id ? "selected" : ""}`}
                onClick={(e) => { e.stopPropagation(); onSelectElement(el.id); }}
                onMouseEnter={() => setHoveredElement(el.id)}
                onMouseLeave={() => setHoveredElement(null)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + idx * 0.12 }}
                layout
              >
                {/* Hover handle */}
                <AnimatePresence>
                  {(hoveredElement === el.id || selectedElement === el.id) && (
                    <motion.div
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 0.6, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      className="absolute -left-8 top-1/2 -translate-y-1/2"
                    >
                      <Move className="w-4 h-4 text-primary/60" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Type badge */}
                <AnimatePresence>
                  {selectedElement === el.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.9 }}
                      className="absolute -top-7 left-1 tooltip-tag"
                    >
                      {el.type}
                    </motion.div>
                  )}
                </AnimatePresence>

                {el.content}

                <AnimatePresence>
                  {selectedElement === el.id && (
                    <>
                      <FloatingToolbar onClose={() => onSelectElement(null)} />
                      <ResizeHandle position="top-left" />
                      <ResizeHandle position="top-right" />
                      <ResizeHandle position="bottom-left" />
                      <ResizeHandle position="bottom-right" />
                    </>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuilderCanvas;
