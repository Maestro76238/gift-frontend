const API_URL = process.env.REACT_APP_API_URL;

export async function getGift(code) {
  const res = await fetch(`${API_URL}/api/get-gift/${code}`);

  if (!res.ok) {
    throw new Error("INVALID_CODE");
  }

  return await res.json();
}

export async function useGift(code) {
  const res = await fetch(`${API_URL}/api/use-gift/${code}`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("USE_FAILED");
  }

  return await res.json();
}