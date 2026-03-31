import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

const RotatingText = forwardRef(
  (
    {
      texts,
      rotationInterval = 2500,
      className = "",
      splitBy = "characters",
      staggerDuration = 0.025,
      transition = { type: "spring", damping: 25, stiffness: 300 },
    },
    ref
  ) => {
    const [index, setIndex] = useState(0);

    const next = useCallback(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, [texts.length]);

    const previous = useCallback(() => {
      setIndex((i) => (i - 1 + texts.length) % texts.length);
    }, [texts.length]);

    useImperativeHandle(ref, () => ({ next, previous }), [next, previous]);

    useEffect(() => {
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval]);

    const elements = useMemo(() => {
      const text = texts[index];
      if (splitBy === "words") return text.split(" ");
      return text.split("");
    }, [texts, index, splitBy]);

    return (
      <span className={`inline-flex overflow-hidden ${className}`}>
        <span className="sr-only">{texts[index]}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={texts[index]}
            className="inline-flex"
            aria-hidden
          >
            {elements.map((char, i) => (
              <motion.span
                key={`${texts[index]}-${i}`}
                initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: "-110%", opacity: 0, filter: "blur(6px)" }}
                transition={{
                  ...transition,
                  delay: i * staggerDuration,
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;
