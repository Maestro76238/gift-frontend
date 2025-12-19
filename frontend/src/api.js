const API_URL = process.env.REACT_APP_API_URL || "";

export async function checkGift(code) {
  const res = await fetch(`${API_URL}/check-gift`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return await res.json();
}

export async function useGift(code) {
  const res = await fetch(`${API_URL}/use-gift`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  return await res.json();
}