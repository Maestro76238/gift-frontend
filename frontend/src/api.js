const API_URL = process.env.REACT_APP_API_URL;

export async function getGift(code) {
  const res = await fetch(`${API_URL}/api/check-gift/${code}`);

  if (!res.ok) {
    throw new Error("Invalid code");
  }

  return await res.json();
}

export async function useGift(code) {
  const res = await fetch(`${API_URL}/api/use-gift/${code}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Use gift failed");
  }

  return await res.json();
}