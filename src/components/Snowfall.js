import { motion } from "framer-motion";

const Snowflake = ({ left, delay, size }) => (
  <motion.div
    style={{
      position: "absolute",
      left,
      top: -20,
      fontSize: size,
      color: "white",
      pointerEvents: "none"
    }}
    animate={{ y: "110vh" }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "linear"
    }}
  >
    ❄
  </motion.div>
);

export default function Snowfall() {
  return (
    <>
      {Array.from({ length: 40 }).map((_, i) => (
        <Snowflake
          key={i}
          left={`${Math.random() * 100}%`}
          delay={Math.random() * 10}
          size={Math.random() * 14 + 10}
        />
      ))}
    </>
  );
}
