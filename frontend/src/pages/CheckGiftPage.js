import { useState } from "react";
import { checkGift, useGift } from "../api";

export default function CheckGiftPage() {
  const [code, setCode] = useState("");
  const [gift, setGift] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setError("");
    setGift(null);
    setLoading(true);

    try {
      const result = await checkGift(code.trim());

      // 🔴 ВАЖНО: проверяем result.ok, а НЕ response.ok
      if (!result.ok) {
        setError("Неверный или уже использованный код");
        return;
      }

      setGift(result.gift);
    } catch (e) {
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  const handleUse = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await useGift(code.trim());

      if (!result.ok) {
        setError("Код уже использован");
        return;
      }

      // после использования можно скрыть кнопку
      setGift((prev) => ({
        ...prev,
        is_used: true,
      }));
    } catch (e) {
      setError("Ошибка сервера");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h2>🎁 Проверка кода</h2>

      <input
        type="text"
        placeholder="Введите код"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button onClick={handleCheck} disabled={loading}>
        Проверить
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {gift && (
        <div style={{ marginTop: 20 }}>
          <p>🎉 Ваш подарок:</p>

          <img
            src={gift.file_url}
            alt="gift"
            style={{ width: "100%", borderRadius: 10 }}
          />

          {!gift.is_used && (
            <button
              onClick={handleUse}
              style={{ marginTop: 10 }}
              disabled={loading}
            >
              Забрать подарок
            </button>
          )}

          {gift.is_used && (
            <p style={{ color: "green", marginTop: 10 }}>
              ✅ Подарок получен
            </p>
          )}
        </div>
      )}
    </div>
  );
}