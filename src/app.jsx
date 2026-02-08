import { useEffect, useState } from 'react';

export default function ProposeDayApp() {
  const [page, setPage] = useState('intro');
  const [cursorTrail, setCursorTrail] = useState([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);

    // Create continuous magical effects
    const interval = setInterval(() => {
      createFloatingHeart();
      createSparkle();
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  const createFloatingHeart = () => {
    const heart = document.createElement('div');
    heart.innerHTML = ['💕', '💖', '💗', '💝', '💓'][Math.floor(Math.random() * 5)];
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-50px';
    heart.style.fontSize = Math.random() * 35 + 20 + 'px';
    heart.style.animation = `floatUp ${Math.random() * 3 + 4}s linear`;
    heart.style.zIndex = '1';
    heart.style.pointerEvents = 'none';
    heart.style.opacity = '0.6';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
  };

  const createSparkle = () => {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = ['✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 4)];
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * 100 + 'vw';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.fontSize = Math.random() * 25 + 15 + 'px';
    sparkle.style.animation = 'twinkle 2s ease-out';
    sparkle.style.zIndex = '1';
    sparkle.style.pointerEvents = 'none';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 2000);
  };

  const createTransitionEffect = () => {
    // Explosion of hearts
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = Math.random() * 40 + 25 + 'px';
        const angle = (Math.PI * 2 * i) / 30;
        const distance = 150 + Math.random() * 200;
        heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        heart.style.animation = 'heartExplode 1.5s ease-out';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
      }, i * 20);
    }

    // Sparkle burst
    for (let i = 0; i < 25; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.fontSize = Math.random() * 30 + 20 + 'px';
        sparkle.style.animation = 'twinkle 1.2s ease-out';
        sparkle.style.zIndex = '9999';
        sparkle.style.pointerEvents = 'none';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1200);
      }, i * 40);
    }
  };

  const goToProposal = () => {
    setShowContent(false);
    createTransitionEffect();
    setTimeout(() => {
      setPage('proposal');
      setTimeout(() => setShowContent(true), 100);
    }, 500);
  };

  const handleMouseMove = (e) => {
    const id = Date.now();
    setCursorTrail(prev => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
  };

  return (
    <div className="propose-container" onMouseMove={handleMouseMove}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Shadows+Into+Light&family=Patrick+Hand&family=Pacifico&display=swap');

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

        .propose-container {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #ff6b9d 75%, #feca57 100%);
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
          font-family: 'Patrick Hand', cursive;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .propose-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 20% 30%, rgba(255, 107, 157, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(102, 126, 234, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(254, 202, 87, 0.2) 0%, transparent 60%);
          animation: backgroundPulse 8s ease-in-out infinite;
        }

        @keyframes backgroundPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .cursor-trail {
          position: fixed;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, rgba(255, 107, 157, 0.8), rgba(255, 182, 193, 0.4));
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

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
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

        @keyframes heartExplode {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.2) rotate(360deg);
            opacity: 0;
          }
        }

        .intro-card, .proposal-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 40px;
          padding: 50px 60px;
          max-width: 650px;
          width: 100%;
          text-align: center;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
          border: 3px solid rgba(255, 255, 255, 0.6);
          position: relative;
          z-index: 10;
          opacity: 0;
          transform: scale(0.8);
        }

        .intro-card.show {
          animation: fadeInScale 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .proposal-card.show {
          animation: fadeInScale 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .intro-card.hide, .proposal-card.hide {
          animation: fadeOutScale 0.5s ease-in forwards;
        }

        @keyframes fadeInScale {
          0% {
            transform: scale(0.7) rotate(-5deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes fadeOutScale {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(0.7) rotate(5deg);
            opacity: 0;
          }
        }

        .intro-card::before,
        .intro-card::after,
        .proposal-card::before,
        .proposal-card::after {
          content: '✨';
          position: absolute;
          font-size: 40px;
          animation: twinkle 3s ease-in-out infinite;
        }

        .intro-card::before,
        .proposal-card::before {
          top: -20px;
          right: -20px;
          animation-delay: 0s;
        }

        .intro-card::after,
        .proposal-card::after {
          content: '💕';
          bottom: -20px;
          left: -20px;
          animation: heartBeat 2s ease-in-out infinite;
        }

        @keyframes heartBeat {
          0%, 100% {
            transform: scale(1);
          }
          25% {
            transform: scale(1.2);
          }
          50% {
            transform: scale(1);
          }
          75% {
            transform: scale(1.15);
          }
        }

        .intro-icon {
          font-size: 90px;
          margin-bottom: 25px;
          display: inline-block;
          animation: bounce 2.5s ease-in-out infinite;
          filter: drop-shadow(0 10px 30px rgba(255, 107, 157, 0.6));
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) rotate(-5deg);
          }
          50% {
            transform: translateY(-25px) rotate(5deg);
          }
        }

        .intro-title {
          font-family: 'Pacifico', cursive;
          font-size: 3.5rem;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          animation: textShine 3s ease-in-out infinite;
        }

        @keyframes textShine {
          0%, 100% {
            filter: brightness(1) drop-shadow(0 0 15px rgba(255, 107, 157, 0.3));
          }
          50% {
            filter: brightness(1.3) drop-shadow(0 0 25px rgba(255, 107, 157, 0.6));
          }
        }

        .intro-subtitle {
          font-family: 'Caveat', cursive;
          font-size: 2rem;
          color: #c44569;
          margin-bottom: 15px;
          font-weight: 600;
          animation: fadeIn 1s ease-in 0.5s both;
        }

        .intro-hearts {
          font-size: 2.5rem;
          margin: 25px 0;
          display: flex;
          justify-content: center;
          gap: 15px;
        }

        .intro-hearts span {
          animation: bounce 1.5s ease-in-out infinite;
        }

        .intro-hearts span:nth-child(1) { animation-delay: 0s; }
        .intro-hearts span:nth-child(2) { animation-delay: 0.2s; }
        .intro-hearts span:nth-child(3) { animation-delay: 0.4s; }

        .intro-message {
          font-family: 'Caveat', cursive;
          font-size: 1.8rem;
          color: #c44569;
          margin-bottom: 35px;
          font-weight: 600;
          line-height: 1.6;
        }

        .tell-me-button {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
          color: white;
          border: none;
          padding: 20px 55px;
          font-size: 1.3rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Patrick Hand', cursive;
          box-shadow: 0 15px 40px rgba(196, 69, 105, 0.5);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
          text-transform: none;
          letter-spacing: 1px;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .tell-me-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          transition: left 0.5s;
        }

        .tell-me-button:hover::before {
          left: 100%;
        }

        .tell-me-button:hover {
          transform: translateY(-5px) scale(1.12) rotate(-2deg);
          box-shadow: 0 20px 50px rgba(196, 69, 105, 0.7);
        }

        .tell-me-button:active {
          transform: translateY(-2px) scale(1.05);
        }

        .proposal-icon {
          font-size: 85px;
          margin-bottom: 30px;
          display: inline-block;
          animation: bounce 2.5s ease-in-out infinite;
          filter: drop-shadow(0 10px 25px rgba(255, 107, 157, 0.5));
        }

        .proposal-text {
          font-family: 'Caveat', cursive;
          font-size: 2rem;
          color: #c44569;
          line-height: 1.8;
          margin-bottom: 25px;
          font-weight: 600;
          animation: fadeIn 1.5s ease-in 0.5s both;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .proposal-text .line {
          display: block;
          margin-bottom: 15px;
        }

        .proposal-text .emphasis {
          color: #ff6b9d;
          font-weight: 700;
          font-size: 2.2rem;
        }

        .heart-divider {
          font-size: 2rem;
          margin: 30px 0;
          animation: heartPulse 2s ease-in-out infinite;
        }

        @keyframes heartPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .final-message {
          font-family: 'Shadows Into Light', cursive;
          font-size: 2.8rem;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #f093fb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          margin-top: 30px;
          animation: fadeIn 2s ease-in 1s both, textGlow 3s ease-in-out infinite;
        }

        @keyframes textGlow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(255, 107, 157, 0.3));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(255, 107, 157, 0.6));
          }
        }

        .ring-emoji {
          display: inline-block;
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .intro-card, .proposal-card {
            padding: 35px 30px;
            max-width: 95%;
          }

          .intro-icon {
            font-size: 70px;
            margin-bottom: 20px;
          }

          .intro-title {
            font-size: 2.8rem;
          }

          .intro-subtitle {
            font-size: 1.6rem;
          }

          .intro-message {
            font-size: 1.5rem;
            margin-bottom: 25px;
          }

          .intro-hearts {
            font-size: 2rem;
            margin: 20px 0;
          }

          .tell-me-button {
            padding: 16px 45px;
            font-size: 1.15rem;
          }

          .proposal-icon {
            font-size: 65px;
            margin-bottom: 20px;
          }

          .proposal-text {
            font-size: 1.6rem;
            margin-bottom: 20px;
          }

          .proposal-text .emphasis {
            font-size: 1.8rem;
          }

          .final-message {
            font-size: 2.2rem;
            margin-top: 20px;
          }

          .heart-divider {
            font-size: 1.6rem;
            margin: 20px 0;
          }
        }

        @media (max-width: 480px) {
          .intro-card, .proposal-card {
            padding: 30px 25px;
          }

          .intro-icon {
            font-size: 60px;
          }

          .intro-title {
            font-size: 2.3rem;
          }

          .intro-subtitle {
            font-size: 1.4rem;
          }

          .intro-message {
            font-size: 1.3rem;
          }

          .tell-me-button {
            padding: 14px 40px;
            font-size: 1.05rem;
          }

          .proposal-icon {
            font-size: 55px;
          }

          .proposal-text {
            font-size: 1.4rem;
          }

          .proposal-text .emphasis {
            font-size: 1.6rem;
          }

          .final-message {
            font-size: 1.9rem;
          }
        }

        @media (max-height: 700px) {
          .intro-card, .proposal-card {
            padding: 25px 35px;
            max-height: 90vh;
            overflow-y: auto;
          }

          .intro-icon {
            font-size: 60px;
            margin-bottom: 15px;
          }

          .intro-title {
            font-size: 2.5rem;
            margin-bottom: 15px;
          }

          .intro-subtitle {
            font-size: 1.5rem;
            margin-bottom: 10px;
          }

          .intro-message {
            font-size: 1.4rem;
            margin-bottom: 20px;
          }

          .intro-hearts {
            font-size: 1.8rem;
            margin: 15px 0;
          }

          .tell-me-button {
            padding: 14px 40px;
            font-size: 1.1rem;
          }

          .proposal-icon {
            font-size: 55px;
            margin-bottom: 15px;
          }

          .proposal-text {
            font-size: 1.5rem;
            margin-bottom: 15px;
          }

          .final-message {
            font-size: 2.2rem;
            margin-top: 20px;
          }

          .heart-divider {
            margin: 15px 0;
          }

          .proposal-text .line {
            margin-bottom: 10px;
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

      {/* Intro Page */}
      {page === 'intro' && (
        <div className={`intro-card ${showContent ? 'show' : 'hide'}`}>
          <div className="intro-icon">💝</div>
          <h1 className="intro-title">Happy Propose Day!</h1>
          <div className="intro-hearts">
            <span>💕</span>
            <span>💖</span>
            <span>💗</span>
          </div>
          <p className="intro-subtitle">
            Today is special…
          </p>
          <p className="intro-message">
            I have something important to tell you…
          </p>
          <button className="tell-me-button" onClick={goToProposal}>
            Tell me! ✨
          </button>
        </div>
      )}

      {/* Proposal Page */}
      {page === 'proposal' && (
        <div className={`proposal-card ${showContent ? 'show' : 'hide'}`}>
          <div className="proposal-icon">💝</div>

          <div className="proposal-text">
            <span className="line">You make me feel happy in a way nobody else ever could.</span>
            <span className="line">You are the reason behind my smile, my peace, and my comfort.</span>
          </div>

          <div className="heart-divider">💕 💖 💕</div>

          <div className="proposal-text">
            <span className="line">I wish you were here with me right now…</span>
            <span className="line">because I just want to hug you and tell you this properly…</span>
          </div>

          <div className="heart-divider">✨</div>

          <div className="proposal-text">
            <span className="line emphasis">I don't want a love that ends.</span>
            <span className="line emphasis">I want a love that grows.</span>
            <span className="line emphasis">And I want it with you.</span>
          </div>

          <div className="final-message">
            be mine… forever ❤️<span className="ring-emoji">💍</span>
          </div>
        </div>
      )}
    </div>
  );
}