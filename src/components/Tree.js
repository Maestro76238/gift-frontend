import { motion } from "framer-motion";

export default function Tree() {
  return (
    <motion.div
      initial={{ scale: 0.9 }}
      animate={{ scale: [0.95, 1, 0.95] }}
      transition={{ duration: 3, repeat: Infinity }}
      style={{
        fontSize: "120px",
        textAlign: "center",
        marginBottom: "20px"
      }}
    >
      🎄
    </motion.div>
  );
}
