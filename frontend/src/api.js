const API_URL = process.env.REACT_APP_API_URL;

export async function checkGift(code) {
  const res = await fetch(`${API_URL}/api/check-gift/${code}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Invalid code");
  }

  return data;
}

export async function markGiftUsed(code) {
  const res = await fetch(`${API_URL}/api/use-gift/${code}`, {
    method: "POST",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Use failed");
  }

  return data;
}