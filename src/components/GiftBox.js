import { motion } from "framer-motion";

export default function GiftBox({ onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      style={{
        fontSize: "60px",
        cursor: "pointer",
        margin: "0 15px"
      }}
    >
      🎁
    </motion.div>
  );
}
