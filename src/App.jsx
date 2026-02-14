import React, { useState } from 'react';

export default function ValentineApp() {
  const [stage, setStage] = useState('intro');
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noEscapeCount, setNoEscapeCount] = useState(0);
  const [isNoButtonEscaping, setIsNoButtonEscaping] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [noButtonExploded, setNoButtonExploded] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [explodeOrigin, setExplodeOrigin] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState([]);

  const noResponses = [
    "Nuh uh! Try again! 🥺",
    "Nope! Not accepting that! 😤",
    "Wrong answer! 💔",
    "You can't escape this! 😭",
    "Please? Pretty please? 🥹",
  ];

  const explodeNoButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the position of the No button to spawn fragments from there
    const origin = isNoButtonEscaping
      ? { x: noButtonPosition.x + 70, y: noButtonPosition.y + 30 }
      : (() => {
          const btn = document.getElementById('no-btn');
          if (btn) {
            const r = btn.getBoundingClientRect();
            return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
          }
          return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        })();

    setExplodeOrigin(origin);

    // Create 16 fragments with random trajectories
    const newFragments = Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * 360 + Math.random() * 22;
      const distance = 100 + Math.random() * 180;
      const rad = (angle * Math.PI) / 180;
      return {
        id: i,
        dx: Math.cos(rad) * distance,
        dy: Math.sin(rad) * distance,
        rotate: Math.random() * 720 - 360,
        size: 8 + Math.random() * 18,
        color: ['#ff6b9d','#c44569','#fa709a','#fcb69f','#ff9a9e','#ffb3c6'][Math.floor(Math.random() * 6)],
        shape: ['●','♥','✦','★','◆','▲'][Math.floor(Math.random() * 6)],
        duration: 0.6 + Math.random() * 0.5,
      };
    });

    setFragments(newFragments);
    setExploding(true);

    setTimeout(() => {
      setExploding(false);
      setNoButtonExploded(true);
      setFragments([]);
    }, 1100);
  };

  const moveNoButton = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (noButtonExploded || exploding) return;

    if (!isNoButtonEscaping) setIsNoButtonEscaping(true);

    const nextCount = noEscapeCount + 1;
    setNoEscapeCount(nextCount);

    // Explode on the 5th try
    if (nextCount >= 5) {
      explodeNoButton(e);
      return;
    }

    const buttonWidth = 140;
    const buttonHeight = 60;
    const padding = 20;
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    setNoButtonPosition({
      x: Math.random() * maxX + padding,
      y: Math.random() * maxY + padding,
    });

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 1500);
  };

  const handleYes = () => {
    setStage('yes');
    createHearts();
    createSparkles();
  };

  const createHearts = () => {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-50px;font-size:${Math.random()*40+20}px;animation:fall ${Math.random()*2+3}s linear;z-index:9999;pointer-events:none;`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }, i * 80);
    }
  };

  const createSparkles = () => {
    ['✨','💫','⭐','🌟','💝'].forEach((emoji, i) => {
      for (let j = 0; j < 6; j++) {
        setTimeout(() => {
          const s = document.createElement('div');
          s.innerHTML = emoji;
          s.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:${Math.random()*100}vh;font-size:${Math.random()*30+15}px;animation:twinkle 1.5s ease-out;z-index:9999;pointer-events:none;`;
          document.body.appendChild(s);
          setTimeout(() => s.remove(), 1500);
        }, i * 6 * 100 + j * 100);
      }
    });
  };

  return (
    <div className="valentine-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Serif+Display:ital@0;1&family=Lato:wght@300;400;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { overflow-x: hidden; }

        .valentine-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%);
          font-family: 'Lato', sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .valentine-container::before {
          content: '💕';
          position: absolute;
          font-size: 100px;
          top: 10%; left: 8%;
          opacity: 0.1;
          animation: floatBg 6s ease-in-out infinite;
        }

        .valentine-container::after {
          content: '💝';
          position: absolute;
          font-size: 120px;
          bottom: 12%; right: 8%;
          opacity: 0.1;
          animation: floatBg 8s ease-in-out infinite reverse;
        }

        .floating-hearts {
          position: fixed;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-heart {
          position: absolute;
          animation: floatHeart 15s infinite linear;
          opacity: 0.25;
        }

        @keyframes floatHeart {
          0%   { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.5; }
          90%  { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        @keyframes floatBg {
          0%, 100% { transform: translate(0,0) rotate(0deg); }
          33%       { transform: translate(15px,-15px) rotate(4deg); }
          66%       { transform: translate(-15px,15px) rotate(-4deg); }
        }

        @keyframes fall {
          to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }

        @keyframes twinkle {
          0%   { transform: scale(0) rotate(0deg); opacity: 0; }
          50%  { transform: scale(1.5) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        @keyframes bounceIn {
          0%, 100% { transform: translateY(0) scale(1); }
          50%       { transform: translateY(-22px) scale(1.08); }
        }

        @keyframes softPulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.06); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25%       { transform: translateX(-14px) rotate(-4deg); }
          75%       { transform: translateX(14px) rotate(4deg); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          15%       { transform: scale(1.12); }
          30%       { transform: scale(1); }
          45%       { transform: scale(1.18); }
          60%       { transform: scale(1); }
        }

        /* ── EXPLOSION FRAGMENTS ── */
        .fragments-container {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 9998;
        }

        .fragment {
          position: fixed;
          font-weight: 900;
          animation: fragmentFly var(--dur) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          transform-origin: center;
          pointer-events: none;
        }

        @keyframes fragmentFly {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          60% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) rotate(var(--rotate)) scale(0);
            opacity: 0;
          }
        }

        /* ── BOOM TEXT ── */
        .boom-text {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 4rem;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          z-index: 9999;
          pointer-events: none;
          animation: boomAnim 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes boomAnim {
          0%   { transform: translate(-50%, -50%) scale(0.2); opacity: 0; }
          40%  { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
          70%  { transform: translate(-50%, -50%) scale(0.95); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }

        /* ── GONE MESSAGE ── */
        .no-gone-text {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.1rem;
          color: #c44569;
          opacity: 0.75;
          margin-top: 16px;
          animation: slideUp 0.6s ease;
        }

        /* ── CARD ── */
        .content-card {
          background: rgba(255,255,255,0.97);
          border-radius: 36px;
          padding: 44px 38px;
          max-width: 520px;
          width: 100%;
          text-align: center;
          box-shadow:
            0 28px 70px rgba(255,105,180,0.28),
            0 0 0 1px rgba(255,255,255,0.35) inset;
          position: relative;
          z-index: 10;
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2.5px solid rgba(255,192,203,0.3);
        }

        .content-card::before {
          content: '✨';
          position: absolute;
          top: -18px; right: -18px;
          font-size: 44px;
          animation: twinkle 2.2s ease-in-out infinite;
        }

        .content-card::after {
          content: '💫';
          position: absolute;
          bottom: -18px; left: -18px;
          font-size: 44px;
          animation: twinkle 2.2s ease-in-out infinite 1.1s;
        }

        /* ── INTRO ── */
        .intro-icon {
          font-size: 88px;
          margin-bottom: 16px;
          animation: bounceIn 2.2s ease-in-out infinite;
          filter: drop-shadow(0 8px 18px rgba(255,105,180,0.3));
        }

        .intro-title {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 3rem;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
          animation: softPulse 3s ease-in-out infinite;
          letter-spacing: -0.5px;
        }

        .intro-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #c44569;
          margin-bottom: 32px;
          letter-spacing: 0.5px;
          font-style: italic;
        }

        .cute-hearts {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin: 20px 0 28px;
          font-size: 1.8rem;
        }

        .cute-hearts span:nth-child(1) { animation: bounceIn 1s ease-in-out infinite 0s; }
        .cute-hearts span:nth-child(2) { animation: bounceIn 1s ease-in-out infinite 0.2s; }
        .cute-hearts span:nth-child(3) { animation: bounceIn 1s ease-in-out infinite 0.4s; }

        /* ── QUESTION ── */
        .question-icon {
          font-size: 76px;
          margin-bottom: 14px;
          animation: bounceIn 2.2s ease-in-out infinite;
          filter: drop-shadow(0 8px 18px rgba(255,105,180,0.3));
        }

        .question-text {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 2.4rem;
          color: #c44569;
          margin-bottom: 10px;
          line-height: 1.4;
          letter-spacing: -0.3px;
        }

        .button-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          margin-top: 34px;
          position: relative;
          min-height: 90px;
        }

        /* ── BUTTONS ── */
        button {
          padding: 17px 42px;
          font-size: 1.25rem;
          font-weight: 700;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          letter-spacing: 1.5px;
          box-shadow: 0 10px 28px rgba(0,0,0,0.13);
          position: relative;
          overflow: hidden;
          user-select: none;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        button::after {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          border-radius: 50%;
          background: rgba(255,255,255,0.45);
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s;
        }

        button:active::after {
          width: 380px; height: 380px;
        }

        .start-button {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
          color: white;
          font-size: 1.2rem;
          padding: 20px 48px;
          animation: softPulse 2s ease-in-out infinite;
        }

        .start-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 48px rgba(255,107,157,0.45);
        }

        .yes-button {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: white;
          box-shadow: 0 14px 36px rgba(250,112,154,0.4);
        }

        .yes-button:hover {
          transform: translateY(-5px) scale(1.08) rotate(-2deg);
          box-shadow: 0 22px 55px rgba(250,112,154,0.6);
        }

        .no-button {
          background: linear-gradient(135deg, #d4d4d4 0%, #ebebeb 100%);
          color: #888;
        }

        .no-button.escaping {
          position: fixed !important;
          left: ${noButtonPosition.x}px !important;
          top: ${noButtonPosition.y}px !important;
          transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        .no-button.about-to-explode {
          animation: shake 0.3s ease infinite;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%) !important;
          color: white !important;
          box-shadow: 0 0 20px rgba(255,107,157,0.6) !important;
        }

        /* ── TOAST ── */
        .no-response {
          position: fixed;
          top: 18%;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          color: white;
          padding: 16px 36px;
          border-radius: 28px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          animation: shake 0.55s ease, slideUp 0.3s ease;
          box-shadow: 0 10px 36px rgba(255,107,157,0.45);
          z-index: 1000;
          border: 2px solid rgba(255,255,255,0.45);
          white-space: nowrap;
        }

        .hint-text {
          margin-top: 22px;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: #ff6b9d;
          font-size: 1.1rem;
          font-weight: 600;
          animation: softPulse 1.2s ease-in-out infinite;
          letter-spacing: 0.3px;
        }

        /* ── SUCCESS ── */
        .success-content {
          animation: slideUp 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .success-icon {
          font-size: 72px;
          margin-bottom: 14px;
          animation: bounceIn 2s ease-in-out infinite;
          filter: drop-shadow(0 8px 24px rgba(255,105,180,0.4));
        }

        .success-title {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 2.1rem;
          background: linear-gradient(135deg, #fa709a 0%, #c44569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 400;
          margin-bottom: 10px;
          animation: softPulse 2s ease-in-out infinite;
        }

        .success-hearts {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin: 14px 0;
          font-size: 1.6rem;
        }

        .success-hearts span:nth-child(1) { animation: bounceIn 1s ease-in-out infinite 0s; }
        .success-hearts span:nth-child(2) { animation: bounceIn 1s ease-in-out infinite 0.15s; }
        .success-hearts span:nth-child(3) { animation: bounceIn 1s ease-in-out infinite 0.3s; }
        .success-hearts span:nth-child(4) { animation: bounceIn 1s ease-in-out infinite 0.45s; }
        .success-hearts span:nth-child(5) { animation: bounceIn 1s ease-in-out infinite 0.6s; }

        .success-body {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #c44569;
          line-height: 1.75;
          font-style: italic;
        }

        .success-love {
          font-family: 'DM Serif Display', serif;
          font-style: italic;
          font-size: 1.7rem;
          background: linear-gradient(135deg, #ff6b9d, #fee140);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 14px;
          display: block;
          animation: heartbeat 1.8s ease-in-out infinite;
        }

        @media (max-width: 600px) {
          .content-card { padding: 34px 22px; border-radius: 28px; }
          .intro-title { font-size: 2.4rem; }
          .question-text { font-size: 2rem; }
          button { padding: 15px 32px; font-size: 1.15rem; }
          .success-title { font-size: 1.75rem; }
          .success-body { font-size: 1.1rem; }
          .boom-text { font-size: 2.8rem; }
        }
      `}</style>

      {/* Floating hearts background */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="floating-heart" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 15}s`,
            fontSize: `${Math.random() * 18 + 18}px`
          }}>
            {['💖','💝','💕','💗','💓'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      {/* Explosion fragments */}
      {exploding && (
        <div className="fragments-container">
          {fragments.map(f => (
            <div
              key={f.id}
              className="fragment"
              style={{
                left: explodeOrigin.x,
                top: explodeOrigin.y,
                color: f.color,
                fontSize: f.size,
                '--dx': `${f.dx}px`,
                '--dy': `${f.dy}px`,
                '--rotate': `${f.rotate}deg`,
                '--dur': `${f.duration}s`,
              }}
            >
              {f.shape}
            </div>
          ))}
          <div className="boom-text">💥 BOOM!</div>
        </div>
      )}

      <div className="content-card">

        {/* ── INTRO ── */}
        {stage === 'intro' && (
          <div>
            <div className="intro-icon">💌</div>
            <h1 className="intro-title">Hey Baby!</h1>
            <p className="intro-subtitle">I have a serious question for you... 🥺</p>
            <div className="cute-hearts">
              <span>💕</span><span>💖</span><span>💕</span>
            </div>
            <button className="start-button" onClick={() => setStage('question')}>
              See the Question ✨
            </button>
          </div>
        )}

        {/* ── QUESTION ── */}
        {stage === 'question' && (
          <div>
            <div className="question-icon">💝</div>
            <p className="question-text">Will you be my Valentine?</p>
            <div className="button-container">
              {showMessage && (
                <div className="no-response">
                  {noResponses[Math.min(noEscapeCount - 1, noResponses.length - 1)]}
                </div>
              )}
              <button className="yes-button" onClick={handleYes}>
                Yes! 💖
              </button>
              {!noButtonExploded && !exploding && (
                <button
                  id="no-btn"
                  className={`no-button ${isNoButtonEscaping ? 'escaping' : ''} ${noEscapeCount >= 4 ? 'about-to-explode' : ''}`}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                >
                  No 💔
                </button>
              )}
              {exploding && (
                <div style={{ width: 140, height: 60 }} /> /* placeholder so layout doesn't jump */
              )}
            </div>
            {noEscapeCount >= 4 && !noButtonExploded && !exploding && (
              <p className="hint-text">Uh oh... it's looking unstable 💣</p>
            )}
            {noButtonExploded && (
              <p className="no-gone-text">The "No" button couldn't handle it... 😂 Only one choice left! 💕</p>
            )}
          </div>
        )}

        {/* ── SUCCESS ── */}
        {stage === 'yes' && (
          <div className="success-content">
            <div className="success-icon">🎉💕✨</div>
            <p className="success-title">You just made me the happiest!</p>
            <div className="success-hearts">
              <span>💝</span><span>💖</span><span>💕</span><span>💗</span><span>💓</span>
            </div>
            <p className="success-body">
              You're my Valentine today and always.
              <br />
              <span className="success-love">I love you so much ❤️</span>
            </p>
          </div>
        )}

      </div>
    </div>
  );
}