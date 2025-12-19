import { useState } from "react";
import { motion } from "framer-motion";
import { checkGift, markGiftUsed } from "../api";
import "./CheckGiftPage.css";

async function downloadFile(url) {
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
}

function CheckGiftPage() {
  const [code, setCode] = useState("");
  const [gift, setGift] = useState(null);
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);
  const [opening, setOpening] = useState(false);

  const handleCheck = async () => {
    if (!code.trim() || checking) return;

    setChecking(true);
    setGift(null);
    setMessage("");

    try {
      const res = await checkGift(code.trim().toUpperCase());

      setGift(res.gift);
      setMessage("🎉 Код верный! Нажмите на подарок 🎁");
    } catch {
      setMessage("❌ Неверный или уже использованный код");
    } finally {
      setChecking(false);
    }
  };

  const handleOpenGift = async () => {
    if (!gift || opening) return;

    setOpening(true);

    try {
      await downloadFile(gift.file_url);
      await markGiftUsed(gift.code); // ✅ ТОЛЬКО ЗДЕСЬ
    } catch (e) {
      console.error("OPEN ERROR:", e);
    }
  };

  return (
    <div className="check-page">
      <motion.div
        className={`gift ${gift ? "active" : ""}`}
        onClick={handleOpenGift}
        animate={
          gift
            ? opening
              ? { scale: [1, 1.3, 0.6], opacity: [1, 1, 0] }
              : { scale: [1, 1.08, 1] }
            : {}
        }
        transition={
          opening
            ? { duration: 1.2 }
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