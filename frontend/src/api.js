const API_URL = process.env.REACT_APP_API_URL;

// ✅ ПРОВЕРКА КОДА
export async function checkGift(code) {
  const res = await fetch(`${API_URL}/api/check-gift/${code}`);

  const data = await res.json();

  if (!res.ok || !data.ok || !data.gift) {
    throw new Error("INVALID_CODE");
  }

  return data.gift;
}

// ✅ ПОМЕТИТЬ КОД ИСПОЛЬЗОВАННЫМ
export async function markGiftUsed(code) {
  const res = await fetch(`${API_URL}/api/use-gift/${code}`, {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok || !data.ok) {
    throw new Error("USE_FAILED");
  }

  return true;
}