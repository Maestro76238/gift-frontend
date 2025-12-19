import { useState } from "react";
import { motion } from "framer-motion";
import { getGift, makeGift } from "../api";
import "./CheckGiftPage.css";

const downloadGift = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();

  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "gift";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(blobUrl);
};

function CheckGiftPage() {
  const [code, setCode] = useState("");
  const [gift, setGift] = useState(null);
  const [message, setMessage] = useState("");
  const [opening, setOpening] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleCheck = async () => {
    if (checking || !code.trim()) return;

    setChecking(true);
    setMessage("");
    setGift(null);
    setOpening(false);

    try {
      const res = await getGift(code.trim().toUpperCase());

      if (res?.gift?.file_url) {
        setGift(res.gift);
        setMessage("🎉 Код верный! Нажмите на подарок 🎁");
      } else {
        setMessage("❌ Неверный или уже использованный код");
      }
    } catch {
      setMessage("❌ Неверный или уже использованный код");
    } finally {
      setChecking(false);
    }
  };

  const handleGiftClick = async () => {
    if (!gift || opening) return;

    setOpening(true);

    setTimeout(async () => {
      await downloadGift(gift.file_url);
      await makeGift(gift.code);
    }, 1200);
  };

  return (
    <div className="check-page">
      <motion.div
        className={`gift ${gift ? "active" : ""}`}
        onClick={handleGiftClick}
        animate={
          gift
            ? opening
              ? {
                  scale: [1, 1.3, 0.6],
                  rotate: [0, 10, -10, 0],
                  opacity: [1, 1, 0],
                }
              : { scale: [1, 1.08, 1] }
            : {}
        }
        transition={
          opening
            ? { duration: 1.2, ease: "easeInOut" }
            : gift
            ? { duration: 1.4, repeat: Infinity }
            : {}
        }
      >
        🎁
      </motion.div>

      {!gift && (
        <div className="code-box">
          <input
            placeholder="Введите секретный код"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <button onClick={handleCheck} disabled={checking}>
            {checking ? "Проверка..." : "Проверить код"}
          </button>
        </div>
      )}

      {message && <div className="hint">{message}</div>}
    </div>
  );
}

export default CheckGiftPage;