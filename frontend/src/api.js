const API_URL = "https://gift-backend-tn9w.onrender.com";

/**
 * Проверка кода (перед показом подарка)
 * Используется на сайте при вводе кода
 */
export async function getGift(code) {
  const res = await fetch(`${API_URL}/api/check-gift`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Неверный или уже использованный код");
  }

  return data;
}

/**
 * Использование кода (после подтверждения на сайте)
 */
export async function useGift(code) {
  const res = await fetch(`${API_URL}/api/use-gift`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error(data.error || "Код уже использован или недействителен");
  }

  return data;
}