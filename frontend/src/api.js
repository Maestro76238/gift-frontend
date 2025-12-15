const API_URL = "https://gift-backend-tn9w.onrender.com";

export async function getGift(code) {
  const res = await fetch(`${API_URL}/api/get-gift/${code}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Invalid or used code");
  }

  return await res.json();
}