const API_URL = "https://gift-backend-tn9w.onrender.com";

export async function createGift(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/api/create-gift`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function getGift(code) {
  const res = await fetch(`${API_URL}/api/get-gift/${code}`);
  return res.json();
}
