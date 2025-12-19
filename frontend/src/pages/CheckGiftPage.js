import { useState } from "react";
import { motion } from "framer-motion";
import { getGift, markGiftUsed } from "../api";
import "./CheckGiftPage.css";

// 📥 гарантированное скачивание файла
async function downloadGift(url) {
  const res = await fetch(url);
  const blob = await res.blob();

  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = "gift.png";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(blobUrl);
}

export default function CheckGiftPage() {
  const [code, setCode] = useState("");
  const [giftUrl, setGiftUrl] = useState(null);
  const [message, setMessage] = useState("");
  const [opening, setOpening] = useState(false);
  const [checking, setChecking] = useState(false);

  async function handleCheck() {
    if (checking || !code.trim()) return;

    setChecking(true);
    setMessage("");
    setGiftUrl(null);
    setOpening(false);

    try {
      const res = await getGift(code.trim().toUpperCase());

      if (res?.gift?.file_url && !res.gift.is_used) {
        setGiftUrl(res.gift.file_url);
        setMessage("🎉 Код верный! Нажмите на подарок 🎁");
      } else {
        setMessage("❌ Код уже использован");
      }
    } catch {
      setMessage("❌ Неверный или уже использованный код");
    } finally {
      setChecking(false);
    }
  }

  async function handleGiftClick() {
    if (!giftUrl || opening) return;

    setOpening(true);

    setTimeout(async () => {
      await downloadGift(giftUrl);
      await markGiftUsed(code.trim().toUpperCase());
    }, 1200);
  }

  return (
    <div className="check-page">
      <motion.div
        className={`gift ${giftUrl ? "active" : ""}`}
        onClick={handleGiftClick}
        animate={
          giftUrl
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
            : giftUrl
            ? { duration: 1.4, repeat: Infinity }
            : {}
        }
      >
        🎁
      </motion.div>

      {!giftUrl && (
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