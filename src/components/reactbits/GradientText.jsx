import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

const GradientText = ({
  children,
  className = "",
  colors = ["#8b5cf6", "#ec4899", "#3b82f6", "#8b5cf6"],
  animationSpeed = 8,
  showBorder = false,
}) => {
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const animationDuration = animationSpeed * 1000;

  useAnimationFrame((time) => {
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return; }
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += delta;
    const fullCycle = animationDuration * 2;
    const cycleTime = elapsedRef.current % fullCycle;
    if (cycleTime < animationDuration) {
      progress.set((cycleTime / animationDuration) * 100);
    } else {
      progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
    }
  });

  const backgroundPosition = useTransform(progress, (p) => `${p}% 50%`);
  const gradientColors = [...colors, colors[0]].join(", ");

  return (
    <span className={`relative inline-block ${className}`}>
      {showBorder && (
        <span className="absolute inset-0 rounded-lg p-[1px] overflow-hidden z-0">
          <motion.span
            className="absolute inset-[-200%] opacity-30"
            style={{
              backgroundImage: `linear-gradient(to right, ${gradientColors})`,
              backgroundSize: "300% 100%",
              backgroundPosition,
            }}
          />
        </span>
      )}
      <motion.span
        className="relative z-10 bg-clip-text text-transparent font-bold"
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientColors})`,
          backgroundSize: "300% 100%",
          backgroundPosition,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default GradientText;
