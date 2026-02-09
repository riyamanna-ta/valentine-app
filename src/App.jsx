import { useEffect, useState } from 'react';

export default function ChocolateDayApp() {
  const [page, setPage] = useState('intro');
  const [chocolateSquares, setChocolateSquares] = useState(
    Array(12).fill(false) // 3x4 chocolate bar
  );
  const [myChocolateBites, setMyChocolateBites] = useState(0);
  const [totalBites] = useState(12);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showMessage, setShowMessage] = useState('');

  useEffect(() => {
    setShowContent(true);

    // Create continuous chocolate drips
    const interval = setInterval(() => {
      createChocolateDrip();
      createSparkle();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (page === 'receive-chocolate' && myChocolateBites < totalBites) {
      const timer = setTimeout(() => {
        setMyChocolateBites((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [myChocolateBites, page, totalBites]);

  useEffect(() => {
    if (myChocolateBites === totalBites && page === 'receive-chocolate') {
      setTimeout(() => {
        setPage('final');
        setTimeout(() => setShowContent(true), 100);
      }, 1000);
    }
  }, [myChocolateBites, page, totalBites]);

  const createChocolateDrip = () => {
    const drip = document.createElement('div');
    drip.innerHTML = '🍫';
    drip.style.position = 'fixed';
    drip.style.left = Math.random() * 100 + 'vw';
    drip.style.top = '-50px';
    drip.style.fontSize = Math.random() * 25 + 15 + 'px';
    drip.style.animation = `drip ${Math.random() * 2 + 3}s linear`;
    drip.style.zIndex = '1';
    drip.style.pointerEvents = 'none';
    drip.style.opacity = '0.4';
    document.body.appendChild(drip);
    setTimeout(() => drip.remove(), 5000);
  };

  const createSparkle = () => {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = ['✨', '🌟', '💫'][Math.floor(Math.random() * 3)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.fontSize = Math.random() * 20 + 12 + 'px';
    sparkle.style.animation = 'twinkle 2s ease-out';
    sparkle.style.zIndex = '1';
    sparkle.style.pointerEvents = 'none';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  };

  const createEatEffect = (x, y) => {
    // Crumbs effect
    for (let i = 0; i < 6; i++) {
      const crumb = document.createElement('div');
      crumb.innerHTML = '🍫';
      crumb.style.position = 'fixed';
      crumb.style.left = x + 'px';
      crumb.style.top = y + 'px';
      crumb.style.fontSize = '12px';
      const angle = (Math.PI * 2 * i) / 6;
      const distance = 30 + Math.random() * 20;
      crumb.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      crumb.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
      crumb.style.animation = 'crumbFly 0.8s ease-out';
      crumb.style.zIndex = '9999';
      crumb.style.pointerEvents = 'none';
      document.body.appendChild(crumb);
      setTimeout(() => crumb.remove(), 800);
    }
  };

  const eatSquare = (index, event) => {
    if (!chocolateSquares[index]) {
      const rect = event.target.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      createEatEffect(x, y);

      const newSquares = [...chocolateSquares];
      newSquares[index] = true;
      setChocolateSquares(newSquares);

      const messages = [
        'Yummy! 😋',
        'Delicious! 🤤',
        'So good! 💕',
        'More please! 😍',
        'Mmm tasty! ✨',
        'Love it! 💖',
      ];
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      setShowMessage(randomMessage);
      setTimeout(() => setShowMessage(''), 1000);
    }
  };

  const biteMyCholate = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createEatEffect(x, y);
    setMyChocolateBites((prev) => prev + 1);

    const messages = [
      'Nom nom! 😋',
      'Yummy! 🍫',
      'Delicious! 💕',
      'So sweet! ✨',
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setShowMessage(randomMessage);
    setTimeout(() => setShowMessage(''), 1000);
  };

  const goToReceiveChocolate = () => {
    setShowContent(false);
    setTimeout(() => {
      setPage('receive-chocolate');
      setTimeout(() => setShowContent(true), 100);
    }, 500);
  };

  const finishEating = () => {
    setShowContent(false);
    setTimeout(() => {
      setPage('wait');
      setTimeout(() => setShowContent(true), 100);
    }, 500);
  };

  const handleMouseMove = (e) => {
    const id = Date.now();
    setCursorTrail((prev) => [
      ...prev.slice(-10),
      { id, x: e.clientX, y: e.clientY },
    ]);
  };

  return (
    <div className="chocolate-container" onMouseMove={handleMouseMove}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800&family=Chewy&display=swap');

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

        .chocolate-container {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #3d2817 0%, #5c3c24 20%, #7d5a3f 40%, #8b4513 60%, #6b4423 80%, #4a2c1a 100%);
          background-size: 400% 400%;
          animation: chocolateFlow 20s ease infinite;
          font-family: 'Fredoka', sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        @keyframes chocolateFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .chocolate-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 25% 35%, rgba(139, 69, 19, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 75% 65%, rgba(101, 67, 33, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 50% 80%, rgba(160, 82, 45, 0.2) 0%, transparent 35%);
          animation: meltingChocolate 10s ease-in-out infinite;
        }

        @keyframes meltingChocolate {
          0%, 100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.05) translateY(10px);
            opacity: 0.9;
          }
        }

        .melting-chocolate-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 400px;
          z-index: 2;
          pointer-events: none;
        }

        .chocolate-bar {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 180px;
          height: 250px;
          background: linear-gradient(135deg, #6b4423 0%, #8b4513 50%, #a0522d 100%);
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          animation: barFloat 3s ease-in-out infinite;
        }

        @keyframes barFloat {
          0%, 100% {
            transform: translateX(-50%) translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateX(-50%) translateY(-10px) rotate(2deg);
          }
        }

        .chocolate-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            linear-gradient(90deg, transparent 32%, rgba(139, 69, 19, 0.8) 33%, rgba(139, 69, 19, 0.8) 34%, transparent 35%),
            linear-gradient(90deg, transparent 65%, rgba(139, 69, 19, 0.8) 66%, rgba(139, 69, 19, 0.8) 67%, transparent 68%),
            linear-gradient(0deg, transparent 24%, rgba(139, 69, 19, 0.8) 25%, rgba(139, 69, 19, 0.8) 26%, transparent 27%),
            linear-gradient(0deg, transparent 49%, rgba(139, 69, 19, 0.8) 50%, rgba(139, 69, 19, 0.8) 51%, transparent 52%),
            linear-gradient(0deg, transparent 74%, rgba(139, 69, 19, 0.8) 75%, rgba(139, 69, 19, 0.8) 76%, transparent 77%);
          border-radius: 15px;
        }

        .drip {
          position: absolute;
          width: 30px;
          height: 60px;
          background: linear-gradient(180deg, #8b4513 0%, #6b4423 100%);
          border-radius: 0 0 50% 50%;
          animation: dripping 3s ease-in-out infinite;
          opacity: 0.9;
        }

        .drip1 {
          left: 30px;
          top: 250px;
          animation-delay: 0s;
        }

        .drip2 {
          left: 75px;
          top: 250px;
          animation-delay: 0.5s;
        }

        .drip3 {
          left: 120px;
          top: 250px;
          animation-delay: 1s;
        }

        @keyframes dripping {
          0% {
            transform: scaleY(0);
            opacity: 0;
          }
          30% {
            transform: scaleY(1);
            opacity: 0.9;
          }
          70% {
            transform: scaleY(1) translateY(0);
            opacity: 0.9;
          }
          100% {
            transform: scaleY(1) translateY(50px);
            opacity: 0;
          }
        }

        .drip-pool {
          position: absolute;
          top: 350px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 30px;
          background: radial-gradient(ellipse, #6b4423 0%, transparent 70%);
          border-radius: 50%;
          animation: poolGrow 3s ease-in-out infinite;
        }

        @keyframes poolGrow {
          0%, 100% {
            transform: translateX(-50%) scaleX(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translateX(-50%) scaleX(1);
            opacity: 0.6;
          }
        }

        .cursor-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(139, 69, 19, 0.8), rgba(160, 82, 45, 0.4));
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          animation: trailFade 1s ease-out forwards;
        }

        @keyframes trailFade {
          to {
            transform: scale(3);
            opacity: 0;
          }
        }

        @keyframes drip {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
          }
          100% {
            transform: translateY(100vh) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes twinkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 1;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes crumbFly {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0.3) rotate(360deg);
            opacity: 0;
          }
        }

        .card {
          background: linear-gradient(135deg, rgba(255, 248, 240, 0.98), rgba(255, 239, 213, 0.98));
          backdrop-filter: blur(20px);
          border-radius: 35px;
          padding: 45px 55px;
          max-width: 550px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
          border: 3px solid rgba(139, 69, 19, 0.3);
          position: relative;
          z-index: 10;
          opacity: 0;
          transform: scale(0.8);
        }

        .card.show {
          animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .card.hide {
          animation: popOut 0.5s ease-in forwards;
        }

        @keyframes popIn {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes popOut {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.7);
            opacity: 0;
          }
        }

        .card::before,
        .card::after {
          content: '🍫';
          position: absolute;
          font-size: 35px;
          animation: bounce 2.5s ease-in-out infinite;
        }

        .card::before {
          top: -18px;
          right: -18px;
        }

        .card::after {
          bottom: -18px;
          left: -18px;
          animation-delay: 0.5s;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) rotate(-10deg);
          }
          50% {
            transform: translateY(-15px) rotate(10deg);
          }
        }

        .intro-icon {
          font-size: 80px;
          margin-bottom: 20px;
          display: inline-block;
          animation: swing 2s ease-in-out infinite;
          filter: drop-shadow(0 8px 20px rgba(139, 69, 19, 0.6));
        }

        @keyframes swing {
          0%, 100% {
            transform: rotate(-10deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        .title {
          font-family: 'Chewy', cursive;
          font-size: 3rem;
          background: linear-gradient(135deg, #8b4513 0%, #d2691e 50%, #8b4513 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 15px;
          animation: textShine 3s ease-in-out infinite;
        }

        @keyframes textShine {
          0%, 100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.3);
          }
        }

        .subtitle {
          font-family: 'Nunito', sans-serif;
          font-size: 1.5rem;
          color: #6b4423;
          margin-bottom: 25px;
          font-weight: 700;
        }

        .chocolate-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          max-width: 300px;
          margin: 30px auto;
          padding: 15px;
          background: linear-gradient(135deg, #4a2c1a, #6b4423);
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .chocolate-square {
          aspect-ratio: 1;
          background: linear-gradient(135deg, #8b4513, #a0522d);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }

        .chocolate-square:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 8px 20px rgba(139, 69, 19, 0.6);
        }

        .chocolate-square.eaten {
          background: rgba(74, 44, 26, 0.3);
          cursor: default;
          animation: eatAnimation 0.5s ease-out;
        }

        @keyframes eatAnimation {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3) rotate(10deg);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.3);
            opacity: 0.2;
          }
        }

        .progress-text {
          font-size: 1.2rem;
          color: #6b4423;
          font-weight: 700;
          margin-top: 20px;
        }

        .message-popup {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #8b4513, #d2691e);
          color: white;
          padding: 20px 40px;
          border-radius: 30px;
          font-size: 1.5rem;
          font-weight: 700;
          z-index: 9999;
          animation: popMessage 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          font-family: 'Fredoka', sans-serif;
        }

        @keyframes popMessage {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }

        .wait-message {
          font-family: 'Nunito', sans-serif;
          font-size: 1.6rem;
          color: #6b4423;
          margin-bottom: 20px;
          font-weight: 700;
          line-height: 1.7;
        }

        .wait-emoji {
          font-size: 2.5rem;
          margin: 20px 0;
          display: flex;
          justify-content: center;
          gap: 12px;
        }

        .wait-emoji span {
          animation: bounce 1.2s ease-in-out infinite;
        }

        .wait-emoji span:nth-child(1) { animation-delay: 0s; }
        .wait-emoji span:nth-child(2) { animation-delay: 0.2s; }
        .wait-emoji span:nth-child(3) { animation-delay: 0.4s; }

        .continue-button {
          background: linear-gradient(135deg, #8b4513 0%, #d2691e 100%);
          color: white;
          border: none;
          padding: 18px 50px;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Fredoka', sans-serif;
          box-shadow: 0 12px 35px rgba(139, 69, 19, 0.5);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          animation: pulse 2s ease-in-out infinite;
          margin-top: 15px;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .continue-button:hover {
          transform: translateY(-5px) scale(1.08);
          box-shadow: 0 18px 45px rgba(139, 69, 19, 0.7);
        }

        .my-chocolate {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, #8b4513, #a0522d);
          border-radius: 20px;
          margin: 30px auto;
          position: relative;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
        }

        .eating-cartoon {
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 4rem;
          animation: eating 0.8s ease-in-out infinite;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
        }

        @keyframes eating {
          0%, 100% {
            transform: translateX(-50%) translateY(0) rotate(-5deg);
          }
          50% {
            transform: translateX(-50%) translateY(-10px) rotate(5deg);
          }
        }

        .nom-nom {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          font-weight: 700;
          color: #8b4513;
          animation: nomNom 0.8s ease-in-out infinite;
          font-family: 'Fredoka', sans-serif;
        }

        @keyframes nomNom {
          0%, 100% {
            opacity: 0.6;
            transform: translateX(-50%) scale(0.9);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scale(1.1);
          }
        }

        .bite-indicator {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 4rem;
          pointer-events: none;
        }

        .final-message {
          font-family: 'Nunito', sans-serif;
          font-size: 1.5rem;
          color: #6b4423;
          line-height: 1.8;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .final-message .line {
          display: block;
          margin-bottom: 12px;
        }

        .final-message .emphasis {
          color: #8b4513;
          font-size: 1.7rem;
          font-weight: 800;
        }

        .heart-line {
          font-size: 2rem;
          margin: 25px 0;
        }

        @media (max-width: 768px) {
          .card {
            padding: 35px 30px;
            max-width: 95%;
          }

          .title {
            font-size: 2.3rem;
          }

          .subtitle {
            font-size: 1.3rem;
          }

          .chocolate-grid {
            max-width: 260px;
            gap: 6px;
            padding: 12px;
          }

          .my-chocolate {
            width: 220px;
            height: 220px;
          }

          .wait-message {
            font-size: 1.4rem;
          }

          .final-message {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 480px) {
          .card {
            padding: 30px 25px;
          }

          .intro-icon {
            font-size: 65px;
          }

          .title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1.2rem;
          }

          .chocolate-grid {
            max-width: 230px;
          }

          .my-chocolate {
            width: 200px;
            height: 200px;
            font-size: 2.5rem;
          }
        }
      `}</style>

      {/* Cursor trail */}
      {cursorTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            animationDelay: `${index * 0.03}s`,
          }}
        />
      ))}

      {/* Message Popup */}
      {showMessage && <div className="message-popup">{showMessage}</div>}

      {/* Intro Page - Give Chocolate */}
      {page === 'intro' && (
        <>
          <div className="melting-chocolate-container">
            <div className="chocolate-bar"></div>
            <div className="drip drip1"></div>
            <div className="drip drip2"></div>
            <div className="drip drip3"></div>
            <div className="drip-pool"></div>
          </div>
          <div className={`card ${showContent ? 'show' : 'hide'}`}>
            <div className="intro-icon">🍫</div>
            <h1 className="title">Happy Chocolate Day!</h1>
            <p className="subtitle">
              Here's a special chocolate just for you! 💕
            </p>
          </div>
        </>
      )}

      {page === 'give-chocolate' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`}>
          <h2 className="subtitle">Click each square to eat it! 😋</h2>
          <div className="chocolate-grid">
            {chocolateSquares.map((eaten, index) => (
              <div
                key={index}
                className={`chocolate-square ${eaten ? 'eaten' : ''}`}
                onClick={(e) => eatSquare(index, e)}
              >
                {!eaten && '🍫'}
              </div>
            ))}
          </div>
          <p className="progress-text">
            {chocolateSquares.filter((sq) => sq).length} / 12 pieces eaten! 😋
          </p>
          {chocolateSquares.filter((sq) => sq).length === 12 && (
            <button className="continue-button" onClick={finishEating}>
              Finished! 😋✨
            </button>
          )}
        </div>
      )}

      {/* Wait Page */}
      {page === 'wait' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`}>
          <div className="intro-icon">🤨</div>
          <p className="wait-message">
            Wait wait wait...
            <br />
            Now what? Where are you going?
          </p>
          <div className="wait-emoji">
            <span>😤</span>
            <span>💔</span>
            <span>🍫</span>
          </div>
          <p className="wait-message">
            You have to give me
            <br />
            one chocolate too! 😋
          </p>
          <button className="continue-button" onClick={goToReceiveChocolate}>
            Give me ! 🍫
          </button>
        </div>
      )}

      {/* Receive Chocolate Page */}
      {page === 'receive-chocolate' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`}>
          <h2 className="subtitle">Yeee chocolate! 💕</h2>
          <p
            className="subtitle"
            style={{ fontSize: '1.1rem', marginBottom: '25px' }}
          >
            😋
          </p>
          <div style={{ position: 'relative', marginTop: '80px' }}>
            {myChocolateBites < totalBites && (
              <>
                <div className="eating-cartoon">🤤</div>
                <div className="nom-nom">Nom Nom!</div>
              </>
            )}
            <div
              className="my-chocolate"
              style={{
                clipPath:
                  myChocolateBites === 0
                    ? 'none'
                    : myChocolateBites <= 2
                    ? 'polygon(0 0, 85% 0, 100% 15%, 100% 100%, 0 100%)'
                    : myChocolateBites <= 4
                    ? 'polygon(0 0, 70% 0, 85% 15%, 100% 30%, 100% 100%, 0 100%)'
                    : myChocolateBites <= 6
                    ? 'polygon(0 0, 55% 0, 70% 15%, 85% 30%, 100% 50%, 100% 100%, 0 100%)'
                    : myChocolateBites <= 8
                    ? 'polygon(0 0, 40% 0, 55% 20%, 70% 40%, 85% 60%, 100% 75%, 100% 100%, 0 100%)'
                    : myChocolateBites <= 10
                    ? 'polygon(15% 0, 35% 20%, 50% 40%, 65% 60%, 80% 75%, 95% 90%, 75% 100%, 0 100%, 0 15%)'
                    : myChocolateBites <= 11
                    ? 'polygon(30% 20%, 45% 40%, 55% 60%, 65% 75%, 70% 90%, 60% 100%, 20% 100%, 10% 80%, 15% 40%)'
                    : 'polygon(50% 50%, 50% 50%, 50% 50%)',
              }}
            >
              {myChocolateBites < totalBites && '🍫'}
              <div className="bite-indicator">
                {myChocolateBites >= totalBites && '😋'}
              </div>
            </div>
          </div>
          <p className="progress-text" style={{ marginTop: '25px' }}>
            {myChocolateBites} / {totalBites} bites taken! 😍
          </p>
        </div>
      )}

      {/* Final Message Page */}
      {page === 'final' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`}>
          <div className="intro-icon">💝</div>
          <div className="final-message">
            <span className="line">Life with you is like chocolate...</span>
            <span className="line emphasis">
              Sweet, warm, and comforting! 🍫
            </span>
          </div>
          <div className="heart-line">💕 🍫 💖 🍫 💕</div>
          <div className="final-message">
            <span className="line emphasis">
              You're sweeter than any chocolate
            </span>
            <span className="line emphasis">in the world! 💕</span>
          </div>
          <div className="heart-line">✨ 💝 ✨</div>
        </div>
      )}

      {/* Auto-start the chocolate giving */}
      {page === 'intro' &&
        showContent &&
        setTimeout(() => {
          if (page === 'intro') {
            setShowContent(false);
            setTimeout(() => {
              setPage('give-chocolate');
              setTimeout(() => setShowContent(true), 100);
            }, 500);
          }
        }, 5000)}
    </div>
  );
}
