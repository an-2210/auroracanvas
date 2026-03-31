import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Bold, Italic, Underline, Pipette, MousePointer
} from "lucide-react";
import SpotlightCard from "@/components/reactbits/SpotlightCard.jsx";

const tabs = ["Content", "Style", "Layout"];

const ColorSwatch = ({ color, active, label }) => (
  <motion.button
    whileTap={{ scale: 0.85 }}
    whileHover={{ scale: 1.15, y: -2 }}
    className="flex flex-col items-center gap-1"
    title={label}
  >
    <div
      className={`w-7 h-7 rounded-lg border-2 transition-all duration-300 ${
        active ? "border-primary glow-purple" : "border-border/20 hover:border-border/40"
      }`}
      style={{ backgroundColor: color === "transparent" ? "transparent" : color }}
    />
  </motion.button>
);

const SliderControl = ({ label, value, max = 100, unit = "px" }) => (
  <div>
    <div className="flex justify-between mb-2">
      <span className="prop-label mb-0">{label}</span>
      <span className="text-[11px] font-mono text-muted-foreground/60">{value}{unit}</span>
    </div>
    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(var(--glass-bg) / 0.6)" }}>
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: "linear-gradient(90deg, hsl(260 100% 68%), hsl(330 90% 62%))" }}
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground border-2 border-background cursor-pointer"
        style={{ left: `calc(${(value / max) * 100}% - 8px)`, boxShadow: "0 0 6px hsl(260 100% 68% / 0.3)" }}
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
      />
    </div>
  </div>
);

const PropertiesPanel = ({ selectedElement }) => {
  const [activeTab, setActiveTab] = useState("Style");

  return (
    <motion.aside
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.15 }}
      className="glass w-[280px] flex-shrink-0 flex flex-col overflow-hidden h-full"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/20">
        <div className="panel-header mb-3">
          <span>Properties</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-0.5 glass-inset p-1 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-[11px] font-semibold py-2 rounded-lg transition-all duration-300 relative ${
                activeTab === tab
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="prop-tab-bg"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "hsl(260 100% 68% / 0.1)",
                    border: "1px solid hsl(260 100% 68% / 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 pb-4">
        <AnimatePresence mode="wait">
          {!selectedElement ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <motion.div
                className="w-14 h-14 rounded-2xl glass-inset flex items-center justify-center mb-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <MousePointer className="w-6 h-6 text-muted-foreground/40" />
              </motion.div>
              <p className="text-sm text-muted-foreground/60 font-medium">Click an element</p>
              <p className="text-[11px] text-muted-foreground/40 mt-1">on the canvas to edit its properties</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-5 pt-4"
            >
              {activeTab === "Content" && (
                <>
                  <div>
                    <label className="prop-label">Text Content</label>
                    <textarea
                      className="prop-input resize-none h-24 text-xs leading-relaxed"
                      defaultValue="Build Beautiful Websites Visually"
                    />
                  </div>
                  <div>
                    <label className="prop-label">Link URL</label>
                    <input className="prop-input text-xs" placeholder="https://example.com" />
                  </div>
                  <div>
                    <label className="prop-label">Alt Text</label>
                    <input className="prop-input text-xs" placeholder="Describe the element..." />
                  </div>
                </>
              )}

              {activeTab === "Style" && (
                <>
                  {/* Typography */}
                  <SpotlightCard className="glass-inset p-3 rounded-xl" spotlightColor="rgba(139, 92, 246, 0.08)">
                    <label className="prop-label">Typography</label>
                    <select className="prop-input text-xs mb-2">
                      <option>Inter</option>
                      <option>Roboto</option>
                      <option>Playfair Display</option>
                      <option>Space Grotesk</option>
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">Size</span>
                        <input className="prop-input text-xs mt-1" defaultValue="36px" />
                      </div>
                      <div>
                        <span className="text-[9px] text-muted-foreground/50 uppercase tracking-wider">Weight</span>
                        <select className="prop-input text-xs mt-1">
                          <option>700 Bold</option>
                          <option>600 Semi</option>
                          <option>500 Medium</option>
                          <option>400 Regular</option>
                        </select>
                      </div>
                    </div>
                  </SpotlightCard>

                  {/* Formatting */}
                  <div>
                    <label className="prop-label">Text Formatting</label>
                    <div className="flex gap-1">
                      {[
                        { icon: Bold, active: true },
                        { icon: Italic, active: false },
                        { icon: Underline, active: false },
                      ].map(({ icon: Icon, active }, i) => (
                        <motion.button
                          key={i}
                          whileTap={{ scale: 0.88 }}
                          whileHover={{ scale: 1.08 }}
                          className={`icon-btn ${active ? "active" : ""}`}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.button>
                      ))}
                      <div className="w-px h-8 bg-border/20 mx-1" />
                      {[AlignLeft, AlignCenter, AlignRight, AlignJustify].map((Icon, i) => (
                        <motion.button
                          key={i}
                          whileTap={{ scale: 0.88 }}
                          whileHover={{ scale: 1.08 }}
                          className={`icon-btn ${i === 1 ? "active" : ""}`}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="prop-label mb-0">Text Color</span>
                      <motion.button className="icon-btn p-1" whileHover={{ scale: 1.2, rotate: 15 }} whileTap={{ scale: 0.9 }}>
                        <Pipette className="w-3 h-3" />
                      </motion.button>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[
                        { c: "#1e293b", l: "Dark" },
                        { c: "#3b82f6", l: "Blue" },
                        { c: "#8b5cf6", l: "Purple" },
                        { c: "#ec4899", l: "Pink" },
                        { c: "#ef4444", l: "Red" },
                        { c: "#f59e0b", l: "Amber" },
                        { c: "#10b981", l: "Green" },
                        { c: "#ffffff", l: "White" },
                      ].map(({ c, l }, i) => (
                        <ColorSwatch key={c} color={c} active={i === 0} label={l} />
                      ))}
                    </div>
                  </div>

                  <SliderControl label="Border Radius" value={12} max={50} />
                  <SliderControl label="Opacity" value={100} max={100} unit="%" />
                </>
              )}

              {activeTab === "Layout" && (
                <>
                  {/* Box Model Visual */}
                  <SpotlightCard className="glass-inset p-3 rounded-xl" spotlightColor="rgba(139, 92, 246, 0.08)">
                    <label className="prop-label">Box Model</label>
                    <div className="mt-2 relative border border-border/20 rounded-lg p-3 text-center">
                      <span className="text-[9px] font-mono text-muted-foreground/40 absolute top-1 left-2">margin</span>
                      <div className="border border-primary/20 rounded-md p-3 bg-primary/5">
                        <span className="text-[9px] font-mono text-primary/40 absolute top-8 left-5">padding</span>
                        <div className="border border-primary/30 rounded px-4 py-2 text-[11px] font-mono text-primary">
                          Content
                        </div>
                      </div>
                      {/* Values */}
                      <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground/50 bg-card px-1">0</span>
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[10px] font-mono text-muted-foreground/50 bg-card px-1">0</span>
                      <span className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary/60">64</span>
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary/60">64</span>
                    </div>
                  </SpotlightCard>

                  <SliderControl label="Padding" value={64} max={200} />
                  <SliderControl label="Margin Top" value={0} max={200} />
                  <SliderControl label="Margin Bottom" value={0} max={200} />

                  <div>
                    <label className="prop-label">Width</label>
                    <select className="prop-input text-xs">
                      <option>Full Width (100%)</option>
                      <option>Auto</option>
                      <option>Fixed Width</option>
                    </select>
                  </div>

                  <div>
                    <label className="prop-label">Display</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {["Block", "Flex", "Grid"].map((d, i) => (
                        <motion.button
                          key={d}
                          whileTap={{ scale: 0.92 }}
                          className={`text-[11px] font-medium py-2 rounded-xl transition-all duration-300 ${
                            i === 0
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          style={
                            i === 0
                              ? {
                                  background: "hsl(260 100% 68% / 0.1)",
                                  border: "1px solid hsl(260 100% 68% / 0.2)",
                                }
                              : {
                                  background: "hsl(var(--glass-bg) / 0.4)",
                                  border: "1px solid hsl(var(--glass-shine) / 0.06)",
                                }
                          }
                        >
                          {d}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default PropertiesPanel;
