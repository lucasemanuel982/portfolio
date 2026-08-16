"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.05,
  staggerDelay = 0.025,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDelay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const reduceMotion = usePrefersReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (reduceMotion) {
      animate(
        "span",
        { opacity: 1, filter: "none" },
        { duration: 0 }
      );
      return;
    }

    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 0.25,
        delay: stagger(staggerDelay),
      }
    );
  }, [animate, duration, filter, staggerDelay, words, reduceMotion]);

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-white text-2xl leading-snug tracking-wide">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={`word-${idx}`}
                className="text-white opacity-0"
                style={{
                  filter: filter ? "blur(10px)" : "none",
                }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
