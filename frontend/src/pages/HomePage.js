import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// Новый компонент Звезды (Stars)
function Stars() {
  // Создаем 70 случайных звезд
  return Array.from({ length: 70 }).map((_, i) => (
    <span
      key={i}
      className="star"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 60}%`, // Звезды только в верхней части экрана (0-60vh)
        animationDuration: `${2 + Math.random() * 5}s`, // Разная скорость мерцания
        opacity: Math.random(),
      }}
    >
      •
    </span>
  ));
}


function Garland({ side }) {
  // ... (Этот компонент остается прежним) ...
  return (
    <div className={`garland ${side}`}>
      <svg className="wire" viewBox="0 0 100 1000" preserveAspectRatio="none">
        <path
          d="M50 0 
             C 15 120, 85 240, 50 360
             C 15 480, 85 600, 50 720
             C 15 840, 85 920, 50 1000"
          fill="none"
          stroke="#1b1b1b"
          strokeWidth="4"
        />
      </svg>

      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className={`bulb b${i % 4}`}
          style={{
            top: `${i * 55 + Math.random() * 30}px`,
            left: `${28 + Math.sin(i) * 14}px`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  const handleGiftClick = (giftId) => {
    console.log(`Нажали на подарок номер: ${giftId}`);
    navigate("/gift", { state: { giftId } }); 
  };

  return (
    <div className="home">

      {/* НОВЫЙ ФОН: ЗВЕЗДЫ И ЛУНА */}
      <div className="sky-background">
          <Stars />
          <div className="moon" />
      </div>

      {/* ДАЛЬНИЙ ФОН (Горы и лес остаются) */}
      <div className="mountains" />
      <div className="forest" />

      {/* ГИРЛЯНДЫ */}
      <Garland side="left" />
      <Garland side="right" />

      {/* СНЕГ */}
      {Array.from({ length: 110 }).map((_, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 9}s`,
            fontSize: `${8 + Math.random() * 18}px`,
            opacity: Math.random(),
          }}
        >
          ❄
        </span>
      ))}

      {/* ЦЕНТР */}
      <div className="center">
          <div className="header-text">
              <h1>С Новым годом 🎄</h1>
              <p>Твой подарок под ёлкой. Найди VIP карточку и получи билет в новогодней игре!</p>
          </div>
         
        <div className="tree">🎄</div>

        <div className="gifts">
          <span onClick={() => handleGiftClick(1)} className="gift-item">🎁</span>
          <span onClick={() => handleGiftClick(2)} className="gift-item">🎁</span>
          <span onClick={() => handleGiftClick(3)} className="gift-item">🎁</span>
        </div>

        <p className="hint">Нажмите на подарок 🎁</p>
      </div>
    </div>
  );
}
