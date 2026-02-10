import React, { useState } from 'react';

export default function TeddyDayApp() {
  const [showMessage, setShowMessage] = useState(false);

  const handleHugClick = () => {
    setShowMessage(true);
    createTeddies();
    createHearts();
  };

  const createTeddies = () => {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const teddy = document.createElement('div');
        teddy.innerHTML = '🧸';
        teddy.style.position = 'fixed';
        teddy.style.left = Math.random() * 100 + 'vw';
        teddy.style.top = '-50px';
        teddy.style.fontSize = Math.random() * 30 + 20 + 'px';
        teddy.style.animation = `fall ${Math.random() * 2 + 3}s linear`;
        teddy.style.zIndex = '9999';
        teddy.style.pointerEvents = 'none';
        document.body.appendChild(teddy);
        setTimeout(() => teddy.remove(), 5000);
      }, i * 80);
    }
  };

  const createHearts = () => {
    const heartEmojis = ['💕', '💖', '💝', '🤗'];
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML =
          heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = Math.random() * 25 + 18 + 'px';
        heart.style.animation = `fall ${Math.random() * 2 + 3}s linear`;
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }, i * 90);
    }
  };

  return (
    <div className="teddy-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&family=Pacifico&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          overflow: hidden;
          height: 100%;
          width: 100%;
        }

        .teddy-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #fff5e6 0%, #ffe4c4 50%, #ffd8a8 100%);
          font-family: 'Nunito', sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .teddy-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.08) 0%, transparent 35%),
            radial-gradient(circle at 70% 60%, rgba(210, 180, 140, 0.08) 0%, transparent 35%);
          animation: float 10s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .floating-teddies {
          position: fixed;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-teddy {
          position: absolute;
          font-size: 28px;
          animation: floatTeddy 20s infinite linear;
          opacity: 0.15;
        }

        @keyframes floatTeddy {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }

        .content-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 35px;
          padding: 50px 40px;
          max-width: 500px;
          width: 100%;
          text-align: center;
          box-shadow:
            0 25px 60px rgba(139, 69, 19, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          position: relative;
          z-index: 10;
          animation: slideUp 0.8s ease-out;
          border: 3px solid rgba(210, 180, 140, 0.3);
        }

        .teddy-icon {
          font-size: 100px;
          margin-bottom: 20px;
          animation: bounce 2s ease-in-out infinite;
          filter: drop-shadow(0 10px 20px rgba(139, 69, 19, 0.2));
        }

        h1 {
          font-family: 'Pacifico', cursive;
          font-size: 2.8rem;
          color: #8b4513;
          margin-bottom: 15px;
          animation: pulse 3s ease-in-out infinite;
        }

        .message {
          font-size: 1.2rem;
          color: #a0522d;
          line-height: 1.8;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .hug-button {
          background: linear-gradient(135deg, #d2691e 0%, #cd853f 100%);
          color: white;
          padding: 18px 50px;
          font-size: 1.2rem;
          font-weight: 800;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Nunito', sans-serif;
          box-shadow: 0 12px 30px rgba(139, 69, 19, 0.3);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          transition: all 0.3s ease;
          animation: pulse 2s ease-in-out infinite;
        }

        .hug-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 18px 40px rgba(139, 69, 19, 0.4);
        }

        .hug-button:active {
          transform: translateY(-2px) scale(1.02);
        }

        .success-message {
          animation: slideUp 0.8s ease-out;
        }

        .success-icon {
          font-size: 120px;
          margin-bottom: 20px;
          animation: bounce 2s ease-in-out infinite;
        }

        .success-title {
          font-family: 'Pacifico', cursive;
          font-size: 2.5rem;
          color: #8b4513;
          margin-bottom: 20px;
          animation: pulse 2.5s ease-in-out infinite;
        }

        .success-text {
          font-size: 1.15rem;
          color: #a0522d;
          line-height: 1.9;
          font-weight: 600;
          margin-top: 15px;
        }

        .emoji-row {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin: 25px 0;
          font-size: 2rem;
        }

        .emoji-row span {
          animation: bounce 1.2s ease-in-out infinite;
        }

        .emoji-row span:nth-child(1) { animation-delay: 0s; }
        .emoji-row span:nth-child(2) { animation-delay: 0.2s; }
        .emoji-row span:nth-child(3) { animation-delay: 0.4s; }

        @media (max-width: 600px) {
          .content-card {
            padding: 40px 30px;
          }

          h1 {
            font-size: 2.2rem;
          }

          .message {
            font-size: 1.05rem;
          }

          .hug-button {
            padding: 16px 40px;
            font-size: 1.1rem;
          }

          .teddy-icon {
            font-size: 80px;
          }

          .success-icon {
            font-size: 90px;
          }

          .success-title {
            font-size: 2rem;
          }
        }

        @media (max-height: 700px) {
          .content-card {
            padding: 30px 25px;
          }

          .teddy-icon {
            font-size: 70px;
            margin-bottom: 15px;
          }

          h1 {
            font-size: 2rem;
            margin-bottom: 12px;
          }

          .message {
            font-size: 1rem;
            margin-bottom: 20px;
          }

          .hug-button {
            padding: 14px 35px;
            font-size: 1rem;
          }

          .success-icon {
            font-size: 80px;
            margin-bottom: 15px;
          }

          .success-title {
            font-size: 1.8rem;
            margin-bottom: 15px;
          }

          .success-text {
            font-size: 1rem;
          }

          .emoji-row {
            margin: 18px 0;
            font-size: 1.6rem;
          }
        }
      `}</style>

      <div className="floating-teddies">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="floating-teddy"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
            }}
          >
            🧸
          </div>
        ))}
      </div>

      <div className="content-card">
        {!showMessage ? (
          <div>
            <div className="teddy-icon">🧸</div>
            <h1>Happy Teddy Day!</h1>
            <p className="message">
              Sending you a virtual teddy bear hug
              <br />
              from miles away
              <br />
              💕
            </p>
            <button className="hug-button" onClick={handleHugClick}>
              Accept Hug 🤗
            </button>
          </div>
        ) : (
          <div className="success-message">
            <div className="success-icon">🧸💕</div>
            <h2 className="success-title">Hug Received!</h2>
            <div className="emoji-row">
              <span>🤗</span>
              <span>💖</span>
              <span>🧸</span>
            </div>
            <p className="success-text">
              Can't wait to give you a real hug soon!
              <br />
              <br />I love you! 💕
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
