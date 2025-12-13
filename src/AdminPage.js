import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";
import "./App.css";

const API_URL = "https://gift-backend-tn9w.onrender.com";

function AdminPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  async function uploadGift() {
    if (!file) return alert("Выберите файл!");

    setLoading(true);
    setGeneratedCode("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/api/create-gift`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setGeneratedCode(data.code);
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (err) {
      alert("Ошибка соединения с сервером");
    }

    setLoading(false);
  }

  return (
    <div className="container">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="title"
      >
        🔐 Админ-панель
      </motion.h1>

      <div className="card">
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          Загрузка нового подарка
        </p>

        <input
          type="file"
          className="input"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="btn"
          onClick={uploadGift}
          disabled={loading}
          style={{ marginTop: "10px" }}
        >
          {loading ? <FaSpinner className="spinner" /> : "Загрузить"}
        </motion.button>

        {generatedCode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card"
            style={{ marginTop: "20px" }}
          >
            <h2>🎉 Код создан!</h2>
            <p style={{ fontSize: "26px", fontWeight: "bold" }}>
              {generatedCode}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
