import { motion } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";

const BlurText = ({
  text = "",
  delay = 75,
  className = "",
  animateBy = "words",
  direction = "top",
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const from = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -30 }
        : { filter: "blur(10px)", opacity: 0, y: 30 },
    [direction]
  );

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((segment, index) => (
        <motion.span
          key={index}
          initial={from}
          animate={
            inView
              ? { filter: "blur(0px)", opacity: 1, y: 0 }
              : from
          }
          transition={{
            duration: 0.5,
            delay: (index * delay) / 1000,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="inline-block will-change-[filter,opacity,transform]"
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </p>
  );
};

export default BlurText;
