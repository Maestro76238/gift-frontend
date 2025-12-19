const API_URL = "https://gift-backend-tn9w.onrender.com";

export async function getGift(code) {
  const res = await fetch(
    `${API_URL}/api/check-gift`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Invalid or used code");
  }

  return data;
}