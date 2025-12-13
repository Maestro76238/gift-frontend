import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckGiftPage from "./pages/CheckGiftPage";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gift" element={<CheckGiftPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
