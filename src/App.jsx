import { useRef, useState } from 'react';

export default function ValentineApp() {
  const [stage, setStage] = useState('intro'); // intro, question, yes
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noHealth, setNoHealth] = useState(5); // No button has 5 lives
  const [isKicking, setIsKicking] = useState(false);
  const [noButtonFlying, setNoButtonFlying] = useState(false);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const noButtonRef = useRef(null);
  const yesButtonRef = useRef(null);

  const kickMessages = [
    "Nope! Not today! 🦵💥",
    "KICKED IT! Try again! 😤",
    "BOOM! Still no! 💢",
    "Another one bites the dust! 💪",
    "Getting weaker... 😏",
    "Almost dead! 💀"
  ];

  const handleNoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (noHealth <= 0) return;

    // Start kick animation
    setIsKicking(true);
    setNoButtonFlying(true);

    // Calculate random position for No button to fly to
    const buttonWidth = 120;
    const buttonHeight = 60;
    const padding = 20;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const newX = Math.random() * maxX + padding;
    const newY = Math.random() * maxY + padding;

    // Decrease health
    const newHealth = noHealth - 1;
    setNoHealth(newHealth);

    // Show message
    setCurrentMessage(kickMessages[5 - newHealth] || kickMessages[kickMessages.length - 1]);
    setShowMessage(true);

    // Animate
    setTimeout(() => {
      setNoButtonPosition({ x: newX, y: newY });
      setIsKicking(false);
    }, 300);

    setTimeout(() => {
      setNoButtonFlying(false);
      setShowMessage(false);
    }, 800);

    // Grow Yes button
    setYesButtonSize(prev => Math.min(prev + 0.25, 2.5));
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
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = Math.random() * 40 + 20 + 'px';
        heart.style.animation = `fall ${Math.random() * 2 + 3}s linear`;
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        heart.style.filter = 'drop-shadow(0 0 10px rgba(255, 105, 180, 0.5))';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
      }, i * 80);
    }
  };

  const createSparkles = () => {
    const sparkleEmojis = ['✨', '💫', '⭐', '🌟', '💝'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.top = Math.random() * 100 + 'vh';
        sparkle.style.fontSize = Math.random() * 30 + 15 + 'px';
        sparkle.style.animation = 'twinkle 1.5s ease-out';
        sparkle.style.zIndex = '9999';
        sparkle.style.pointerEvents = 'none';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1500);
      }, i * 100);
    }
  };

  return (
    <div className="valentine-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Poppins:wght@400;600;700;800&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .valentine-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ff9a9e 100%);
          font-family: 'Poppins', sans-serif;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .valentine-container::before {
          content: '💕';
          position: absolute;
          font-size: 100px;
          top: 10%;
          left: 10%;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .valentine-container::after {
          content: '💝';
          position: absolute;
          font-size: 120px;
          bottom: 15%;
          right: 10%;
          opacity: 0.1;
          animation: float 8s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(5deg); }
          50% { transform: translate(-20px, -40px) rotate(-5deg); }
          75% { transform: translate(20px, -20px) rotate(3deg); }
        }

        @keyframes floatHeart {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .floating-hearts {
          position: fixed;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-heart {
          position: absolute;
          font-size: 30px;
          animation: floatHeart 15s infinite linear;
          opacity: 0.3;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
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

        @keyframes bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          25% { transform: translateX(-15px) rotate(-5deg); }
          75% { transform: translateX(15px) rotate(5deg); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10% { transform: scale(1.1); }
          20% { transform: scale(1); }
          30% { transform: scale(1.15); }
          40% { transform: scale(1); }
        }

        @keyframes kick {
          0% { transform: translateX(0) scale(1); }
          50% { transform: translateX(30px) scale(1.2) rotate(10deg); }
          100% { transform: translateX(0) scale(1); }
        }

        @keyframes flyAway {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          100% {
            transform: translate(var(--fly-x), var(--fly-y)) rotate(720deg) scale(0.3);
          }
        }

        @keyframes weakPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.95); opacity: 0.7; }
        }

        @keyframes death {
          0% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.3) rotate(180deg);
            opacity: 0.5;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes explosion {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }

        .content-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 40px;
          padding: 50px 40px;
          max-width: 550px;
          width: 100%;
          text-align: center;
          box-shadow:
            0 30px 80px rgba(255, 105, 180, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.3) inset,
            0 0 100px rgba(255, 182, 193, 0.2);
          position: relative;
          z-index: 10;
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 3px solid rgba(255, 192, 203, 0.3);
        }

        .content-card::before {
          content: '✨';
          position: absolute;
          top: -20px;
          right: -20px;
          font-size: 50px;
          animation: twinkle 2s ease-in-out infinite;
        }

        .content-card::after {
          content: '💫';
          position: absolute;
          bottom: -20px;
          left: -20px;
          font-size: 50px;
          animation: twinkle 2s ease-in-out infinite 1s;
        }

        .intro-icon {
          font-size: 100px;
          margin-bottom: 20px;
          animation: bounce 2s ease-in-out infinite;
          filter: drop-shadow(0 10px 20px rgba(255, 105, 180, 0.3));
        }

        h1 {
          font-family: 'Pacifico', cursive;
          font-size: 3rem;
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          animation: pulse 3s ease-in-out infinite;
        }

        .subtitle {
          font-size: 1.4rem;
          color: #d81b60;
          margin-bottom: 40px;
          font-weight: 600;
          animation: pulse 2s ease-in-out infinite;
        }

        .question-text {
          font-size: 1.6rem;
          color: #c44569;
          margin-bottom: 30px;
          line-height: 1.8;
          font-weight: 700;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .question-emoji {
          font-size: 2.5rem;
          display: block;
          margin: 20px 0;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        .button-container {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-top: 40px;
          position: relative;
          min-height: 120px;
        }

        button {
          padding: 20px 45px;
          font-size: 1.4rem;
          font-weight: 800;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .start-button {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44569 100%);
          color: white;
          font-size: 1.3rem;
          padding: 22px 50px;
          animation: pulse 2s ease-in-out infinite;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .start-button:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 20px 50px rgba(255, 107, 157, 0.5);
        }

        .yes-button {
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          color: white;
          transform: scale(${yesButtonSize});
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 15px 40px rgba(250, 112, 154, 0.4);
          z-index: 10;
        }

        .yes-button:hover {
          transform: scale(${yesButtonSize * 1.15}) translateY(-5px) rotate(-2deg);
          box-shadow: 0 25px 60px rgba(250, 112, 154, 0.6);
        }

        .yes-button.kicking {
          animation: kick 0.3s ease-out;
        }

        .no-button {
          background: linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%);
          color: #666;
          user-select: none;
          transition: all 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
          position: relative;
          opacity: ${noHealth > 0 ? 1 : 0};
          transform: scale(${Math.max(0.5, noHealth / 5)});
          filter: grayscale(${(5 - noHealth) * 20}%);
        }

        .no-button.weak {
          animation: weakPulse 0.5s ease infinite;
        }

        .no-button.flying {
          position: fixed !important;
          left: ${noButtonPosition.x}px !important;
          top: ${noButtonPosition.y}px !important;
          transition: left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                      transform 0.6s ease,
                      opacity 0.3s ease !important;
          z-index: 1000;
        }

        .no-button.dying {
          animation: death 0.8s ease-out forwards;
        }

        .no-button:hover:not(.dying) {
          transform: scale(${Math.max(0.5, noHealth / 5) * 0.95});
        }

        .kick-message {
          position: fixed;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #ff6b9d, #c44569);
          color: white;
          padding: 20px 40px;
          border-radius: 30px;
          font-size: 1.5rem;
          font-weight: 800;
          animation: shake 0.6s ease, slideUp 0.3s ease;
          box-shadow: 0 10px 40px rgba(255, 107, 157, 0.5);
          z-index: 10000;
          border: 3px solid rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
        }

        .no-choice-message {
          font-size: 1.3rem;
          color: #ff6b9d;
          margin-top: 30px;
          font-weight: 700;
          animation: slideUp 0.5s ease, pulse 2s ease-in-out infinite 0.5s;
        }

        .success-content {
          animation: slideUp 1s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .success-icon {
          font-size: 120px;
          margin-bottom: 30px;
          animation: bounce 2s ease-in-out infinite;
          filter: drop-shadow(0 10px 30px rgba(255, 105, 180, 0.4));
        }

        .success-message {
          font-size: 2.5rem;
          background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 800;
          margin-bottom: 25px;
          animation: pulse 2s ease-in-out infinite;
        }

        .success-subtitle {
          font-size: 1.4rem;
          color: #c44569;
          line-height: 1.8;
          font-weight: 600;
        }

        .heart-icon {
          display: inline-block;
          animation: heartbeat 1.5s ease-in-out infinite;
          font-size: 1.8rem;
        }

        .cute-hearts {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin: 30px 0;
          font-size: 2rem;
        }

        .cute-hearts span {
          animation: bounce 1s ease-in-out infinite;
        }

        .cute-hearts span:nth-child(1) { animation-delay: 0s; }
        .cute-hearts span:nth-child(2) { animation-delay: 0.2s; }
        .cute-hearts span:nth-child(3) { animation-delay: 0.4s; }

        @media (max-width: 600px) {
          .content-card {
            padding: 40px 25px;
            border-radius: 30px;
          }

          h1 {
            font-size: 2.2rem;
          }

          .question-text {
            font-size: 1.3rem;
          }

          button {
            padding: 18px 35px;
            font-size: 1.2rem;
          }

          .success-message {
            font-size: 1.8rem;
          }

          .intro-icon {
            font-size: 80px;
          }

          .kick-message {
            font-size: 1.2rem;
            padding: 15px 30px;
          }
        }
      `}</style>

      {/* Floating hearts background */}
      <div className="floating-hearts">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              fontSize: `${Math.random() * 20 + 20}px`
            }}
          >
            {['💖', '💝', '💕', '💗', '💓'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>

      <div className="content-card">
        {stage === 'intro' && (
          <div>
            <div className="intro-icon">💌</div>
            <h1>Hey Baby!</h1>
            <p className="subtitle">I have a serious question for you... 🥺</p>
            <div className="cute-hearts">
              <span>💕</span>
              <span>💖</span>
              <span>💕</span>
            </div>
            <button className="start-button" onClick={() => setStage('question')}>
              See the Question ✨
            </button>
          </div>
        )}

        {stage === 'question' && (
          <div>
            <div className="intro-icon">💝</div>
            <p className="question-text">
              Will you be my Valentine across all these miles...
              <br/>
              <span className="question-emoji">💑</span>
              and make up for the distance later?
              <span className="heart-icon"> 😏💕</span>
            </p>
            <div className="button-container">
              {showMessage && (
                <div className="kick-message">
                  {currentMessage}
                </div>
              )}
              <button
                ref={yesButtonRef}
                className={`yes-button ${isKicking ? 'kicking' : ''}`}
                onClick={handleYes}
              >
                Yes! 💖
              </button>
              {noHealth > 0 ? (
                <button
                  ref={noButtonRef}
                  className={`no-button ${noButtonFlying ? 'flying' : ''} ${noHealth <= 2 ? 'weak' : ''} ${noHealth === 0 ? 'dying' : ''}`}
                  onMouseEnter={handleNoClick}
                  onTouchStart={handleNoClick}
                  onClick={handleNoClick}
                >
                  No 💔
                </button>
              ) : null}
            </div>
            {noHealth === 0 && (
              <div className="no-choice-message">
                😏 Oops! Looks like you don't have any choice now... 💕<br/>
                Just click YES already! 😘
              </div>
            )}
            {noHealth > 0 && noHealth <= 2 && (
              <p style={{
                marginTop: '30px',
                color: '#ff6b9d',
                fontSize: '1.1rem',
                fontWeight: '600',
                animation: 'pulse 1s ease-in-out infinite'
              }}>
                The "No" button is getting weaker... {noHealth} {noHealth === 1 ? 'life' : 'lives'} left! 💪
              </p>
            )}
          </div>
        )}

        {stage === 'yes' && (
          <div className="success-content">
            <div className="success-icon">🎉💕✨🥰💖</div>
            <p className="success-message">Yayyyy! You made me the happiest! 🎊</p>
            <div className="cute-hearts">
              <span>💝</span>
              <span>💖</span>
              <span>💕</span>
              <span>💗</span>
              <span>💓</span>
            </div>
            <p className="success-subtitle">
              I can't wait to make up for all these miles between us...
              <br/><br/>
              <span style={{fontSize: '1.6rem'}}>🫶</span>
              <br/>
              You're my Valentine today and ALWAYS!
              <br/><br/>
              <span style={{fontSize: '2rem', fontWeight: '800'}}>I love you so much! ❤️</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}