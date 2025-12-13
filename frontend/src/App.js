import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CheckGiftPage from "./pages/CheckGiftPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gift" element={<CheckGiftPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
