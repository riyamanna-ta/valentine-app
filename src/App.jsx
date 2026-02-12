import { useEffect, useState } from 'react';

export default function PromiseDayApp() {
  const [page, setPage] = useState('intro');
  const [cursorTrail, setCursorTrail] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [openedPromises, setOpenedPromises] = useState([]);
  const [currentPromise, setCurrentPromise] = useState(null);
  const [hisPromise, setHisPromise] = useState('');
  const [savedPromise, setSavedPromise] = useState('');

  const promises = [
    {
      id: 1,
      sealed: '💌',
      icon: '😌',
      title: 'I Promise',
      text: "I'll annoy you every single day 😌\nI will disturb you even when you're busy,\nbecause I want your attention all the time.",
      color: '#ff6b9d'
    },
    {
      id: 2,
      sealed: '💌',
      icon: '😏',
      title: 'I Promise',
      text: "I'll fight with you over the dumbest reasons\njust because I feel like fighting…\nand then I'll kiss you…\nand maybe do something even more than that 😏❤️",
      color: '#ff9a9e'
    },
    {
      id: 3,
      sealed: '💌',
      icon: '🍤',
      title: 'I Promise',
      text: "I'll steal your prawns from your plate 🍤\nand if my drink doesn't taste good…\nI'll take yours without shame 🥤😂",
      color: '#fad0c4'
    },
    {
      id: 4,
      sealed: '💌',
      icon: '😤',
      title: 'I Promise',
      text: "I'll act like a drama queen sometimes,\nand act like I'm mad\njust so you love me even more 😤💗",
      color: '#fcb69f'
    },
    {
      id: 5,
      sealed: '💌',
      icon: '💖',
      title: 'I Promise',
      text: "I'll be your biggest headache…\nbut also your happiest habit.\n\nAnd most importantly…\nI will always choose you.\nI will always love you crazily… forever. ❤️✨",
      color: '#ff6b9d'
    }
  ];

  useEffect(() => {
    setShowContent(true);

    // Load his saved promise from storage — use personal storage (shared: false)
    const loadPromise = async () => {
      try {
        const result = await window.storage.get('his-promise');
        if (result && result.value) {
          setSavedPromise(result.value);
        }
      } catch (error) {
        console.log('No promise saved yet');
      }
    };
    loadPromise();

    const interval = setInterval(() => {
      createFloatingElement();
      createSparkle();
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const createFloatingElement = () => {
    const elements = ['💌', '💝', '💕'];
    const element = document.createElement('div');
    element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
    element.style.position = 'fixed';
    element.style.left = Math.random() * 100 + 'vw';
    element.style.bottom = '-50px';
    element.style.fontSize = Math.random() * 25 + 18 + 'px';
    element.style.animation = `floatUp ${Math.random() * 3 + 5}s linear`;
    element.style.zIndex = '1';
    element.style.pointerEvents = 'none';
    element.style.opacity = '0.4';
    document.body.appendChild(element);
    setTimeout(() => element.remove(), 8000);
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

  const createOpenEffect = (x, y) => {
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = ['💕', '💖', '💗'][Math.floor(Math.random() * 3)];
      heart.style.position = 'fixed';
      heart.style.left = x + 'px';
      heart.style.top = y + 'px';
      heart.style.fontSize = Math.random() * 20 + 15 + 'px';
      const angle = (Math.PI * 2 * i) / 12;
      const distance = 60 + Math.random() * 40;
      heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
      heart.style.animation = 'heartBurst 1s ease-out';
      heart.style.zIndex = '9999';
      heart.style.pointerEvents = 'none';
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
  };

  const createCelebration = () => {
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['💕', '💖', '💗', '💝', '✨'][Math.floor(Math.random() * 5)];
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.fontSize = Math.random() * 30 + 20 + 'px';
        confetti.style.animation = `fall ${Math.random() * 2 + 3}s linear`;
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
      }, i * 60);
    }
  };

  const startPromises = () => {
    setShowContent(false);
    setTimeout(() => {
      setPage('promises');
      setTimeout(() => setShowContent(true), 100);
    }, 500);
  };

  // FIX: Use personal storage (no shared flag) so save always works
  const saveHisPromise = async () => {
    if (hisPromise.trim()) {
      try {
        const result = await window.storage.set('his-promise', hisPromise);
        if (!result) {
          throw new Error('Storage returned null');
        }
        setSavedPromise(hisPromise);
        createCelebration();
        setShowContent(false);
        setTimeout(() => {
          setPage('final');
          setTimeout(() => setShowContent(true), 100);
        }, 500);
      } catch (error) {
        console.error('Error saving promise:', error);
        // FIX: Fallback — save in state only and still navigate forward
        setSavedPromise(hisPromise);
        createCelebration();
        setShowContent(false);
        setTimeout(() => {
          setPage('final');
          setTimeout(() => setShowContent(true), 100);
        }, 500);
      }
    }
  };

  // FIX: Accept the new updated list as a parameter to avoid stale state check
  const openPromise = (promiseId, event) => {
    const rect = event.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    createOpenEffect(x, y);

    // Add to opened list if not already there (for tracking)
    if (!openedPromises.includes(promiseId)) {
      setOpenedPromises(prev => [...prev, promiseId]);
    }

    // Show the promise modal (stays open until back button clicked)
    setCurrentPromise(promises.find(p => p.id === promiseId));
  };

  // FIX: Use the count embedded in currentPromise to avoid stale closure
  const closePromise = () => {
    const updatedOpened = currentPromise._updatedOpened || openedPromises;
    setCurrentPromise(null);

    // Check if all promises have been opened at least once
    if (openedPromises.length === promises.length) {
      setTimeout(() => {
        createCelebration();
        setShowContent(false);
        setTimeout(() => {
          setPage('his-turn');
          setTimeout(() => setShowContent(true), 100);
        }, 500);
      }, 500);
    }
  };

  const handleMouseMove = (e) => {
    const id = Date.now();
    setCursorTrail(prev => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);
  };

  return (
    <div className="promise-container" onMouseMove={handleMouseMove}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&family=Pacifico&family=Kalam:wght@400;700&family=Satisfy&display=swap');

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

        .promise-container {
          height: 100vh;
          width: 100vw;
          background: linear-gradient(135deg, #a8edea 0%, #fed6e3 25%, #fbc2eb 50%, #a6c1ee 75%, #f093fb 100%);
          background-size: 400% 400%;
          animation: gradientFlow 25s ease infinite;
          font-family: 'Quicksand', sans-serif;
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

        .promise-container::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background:
            radial-gradient(circle at 20% 30%, rgba(168, 237, 234, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(251, 194, 235, 0.3) 0%, transparent 40%);
          animation: pulse 12s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.08);
            opacity: 0.85;
          }
        }

        .cursor-trail {
          position: fixed;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, rgba(251, 194, 235, 0.8), rgba(168, 237, 234, 0.4));
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
            opacity: 0.4;
          }
          90% {
            opacity: 0.4;
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

        @keyframes heartBurst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0.5);
            opacity: 0;
          }
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .card {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          border-radius: 40px;
          padding: 45px 55px;
          max-width: 600px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
          border: 3px solid rgba(251, 194, 235, 0.5);
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

        .intro-icon {
          font-size: 90px;
          margin-bottom: 25px;
          display: inline-block;
          animation: bounce 2.5s ease-in-out infinite;
          filter: drop-shadow(0 8px 20px rgba(251, 194, 235, 0.5));
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.1);
          }
        }

        .title {
          font-family: 'Pacifico', cursive;
          font-size: 3.2rem;
          background: linear-gradient(135deg, #6a4c93 0%, #d946a6 50%, #7a5ba8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
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
          font-family: 'Quicksand', sans-serif;
          font-size: 1.4rem;
          color: #7a5ba8;
          margin-bottom: 30px;
          font-weight: 700;
          line-height: 1.6;
        }

        .start-button {
          background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
          color: white;
          border: none;
          padding: 18px 50px;
          font-size: 1.3rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Quicksand', sans-serif;
          box-shadow: 0 12px 35px rgba(166, 193, 238, 0.4);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: buttonPulse 2s ease-in-out infinite;
        }

        @keyframes buttonPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .start-button:hover {
          transform: translateY(-5px) scale(1.08);
          box-shadow: 0 18px 45px rgba(166, 193, 238, 0.6);
        }

        .promises-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 25px;
          max-width: 700px;
          margin: 0 auto;
          padding: 20px;
        }

        .promise-envelope {
          aspect-ratio: 1;
          background: linear-gradient(135deg, #fbc2eb, #a6c1ee);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          position: relative;
          animation: envelopeBob 3s ease-in-out infinite;
        }

        .promise-envelope:nth-child(1) { animation-delay: 0s; }
        .promise-envelope:nth-child(2) { animation-delay: 0.2s; }
        .promise-envelope:nth-child(3) { animation-delay: 0.4s; }
        .promise-envelope:nth-child(4) { animation-delay: 0.6s; }
        .promise-envelope:nth-child(5) { animation-delay: 0.8s; }

        @keyframes envelopeBob {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .promise-envelope:hover:not(.opened) {
          transform: translateY(-10px) scale(1.1) rotate(5deg);
          box-shadow: 0 15px 40px rgba(251, 194, 235, 0.5);
        }

        .promise-envelope.opened {
          background: linear-gradient(135deg, #d4d4d4, #e0e0e0);
          cursor: default;
          opacity: 0.5;
          animation: none;
        }

        .promise-envelope.opened::after {
          content: '✓';
          position: absolute;
          top: -10px;
          right: -10px;
          background: #4CAF50;
          color: white;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          box-shadow: 0 5px 15px rgba(76, 175, 80, 0.4);
        }

        .instruction {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.3rem;
          color: #7a5ba8;
          margin-bottom: 30px;
          font-weight: 700;
          text-align: center;
        }

        .promise-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 35px;
          padding: 50px 60px;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.3);
          border: 3px solid rgba(251, 194, 235, 0.6);
          z-index: 1000;
          animation: modalPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes modalPop {
          0% {
            transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .promise-icon {
          font-size: 80px;
          margin-bottom: 25px;
          animation: iconSpin 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.2));
        }

        @keyframes iconSpin {
          0% {
            transform: rotate(-180deg) scale(0);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        .promise-title {
          font-family: 'Satisfy', cursive;
          font-size: 2.5rem;
          color: #6a4c93;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .promise-text {
          font-family: 'Kalam', cursive;
          font-size: 1.6rem;
          color: #d946a6;
          line-height: 1.9;
          font-weight: 700;
          white-space: pre-line;
        }

        .back-button {
          background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);
          color: white;
          border: none;
          padding: 14px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 30px;
          cursor: pointer;
          font-family: 'Quicksand', sans-serif;
          box-shadow: 0 8px 20px rgba(166, 193, 238, 0.4);
          transition: all 0.3s ease;
          margin-top: 25px;
        }

        .back-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(166, 193, 238, 0.6);
        }

        .final-message {
          font-family: 'Quicksand', sans-serif;
          font-size: 1.7rem;
          color: #7a5ba8;
          line-height: 2;
          margin-bottom: 25px;
          font-weight: 700;
        }

        .final-message .line {
          display: block;
          margin-bottom: 15px;
        }

        .final-message .emphasis {
          font-family: 'Pacifico', cursive;
          font-size: 2rem;
          color: #d946a6;
        }

        .heart-line {
          font-size: 2.5rem;
          margin: 25px 0;
        }

        .promise-input {
          width: 100%;
          min-height: 200px;
          padding: 20px;
          font-family: 'Quicksand', sans-serif;
          font-size: 1.2rem;
          border: 3px solid #fbc2eb;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.9);
          color: #a6c1ee;
          resize: vertical;
          margin: 25px 0;
          line-height: 1.6;
        }

        .promise-input:focus {
          outline: none;
          border-color: #a6c1ee;
          box-shadow: 0 0 20px rgba(166, 193, 238, 0.3);
        }

        .promise-input::placeholder {
          color: rgba(166, 193, 238, 0.5);
        }

        .save-button {
          background: linear-gradient(135deg, #d946a6 0%, #6a4c93 100%);
          color: white;
          border: none;
          padding: 16px 45px;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          cursor: pointer;
          font-family: 'Quicksand', sans-serif;
          box-shadow: 0 12px 35px rgba(217, 70, 166, 0.4);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-top: 10px;
        }

        .save-button:hover {
          transform: translateY(-5px) scale(1.08);
          box-shadow: 0 18px 45px rgba(217, 70, 166, 0.6);
        }

        .save-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .saved-promise-display {
          background: rgba(251, 194, 235, 0.1);
          border: 3px solid #fbc2eb;
          border-radius: 20px;
          padding: 25px;
          margin: 25px 0;
          font-family: 'Quicksand', sans-serif;
          font-size: 1.3rem;
          color: #a6c1ee;
          line-height: 1.8;
          white-space: pre-line;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .card, .promise-modal {
            padding: 35px 30px;
            max-width: 95%;
          }

          .title {
            font-size: 2.5rem;
          }

          .promises-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 20px;
          }

          .promise-envelope {
            font-size: 3.5rem;
          }
        }

        @media (max-width: 480px) {
          .intro-icon {
            font-size: 70px;
          }

          .title {
            font-size: 2.2rem;
          }

          .promises-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }

          .promise-envelope {
            font-size: 3rem;
          }

          .promise-icon {
            font-size: 65px;
          }

          .promise-title {
            font-size: 2rem;
          }

          .promise-text {
            font-size: 1.3rem;
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

      {/* Promise Modal */}
      {currentPromise && (
        <div className="promise-modal">
          <div className="promise-icon">{currentPromise.icon}</div>
          <h2 className="promise-title">{currentPromise.title}</h2>
          <p className="promise-text">{currentPromise.text}</p>
          <button className="back-button" onClick={closePromise}>
            ← Back
          </button>
        </div>
      )}

      {/* Intro Page */}
      {page === 'intro' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`}>
          <div className="intro-icon">🤞💝</div>
          <h1 className="title">Happy Promise Day!</h1>
          <p className="subtitle">
            I've written some special promises for you...
            <br />
            Each one sealed with love! 💌
            <br /><br />
            Open them all to see what I promise! ✨
          </p>
          <button className="start-button" onClick={startPromises}>
            See my promises! 💕
          </button>
        </div>
      )}

      {/* Promises Grid */}
      {page === 'promises' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`} style={{ maxWidth: '750px' }}>
          <p className="instruction">
            Tap each envelope to open my promises! 💌
          </p>
          <div className="promises-grid">
            {promises.map((promise) => (
              <div
                key={promise.id}
                className="promise-envelope"
                onClick={(e) => openPromise(promise.id, e)}
              >
                {promise.sealed}
              </div>
            ))}
          </div>
          <p className="instruction" style={{ marginTop: '30px', fontSize: '1.1rem' }}>
            Opened: {openedPromises.length} / {promises.length}
          </p>
        </div>
      )}

      {/* His Turn Page */}
      {page === 'his-turn' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`}>
          <div className="intro-icon">💌</div>
          <h1 className="title" style={{ fontSize: '2.5rem' }}>Now Your Turn!</h1>
          <p className="subtitle">
            Write your promises to me... 💕
            <br />
            I'll be able to see them when I open this! ✨
          </p>
          <textarea
            className="promise-input"
            placeholder="Write your promises here... 💖"
            value={hisPromise}
            onChange={(e) => setHisPromise(e.target.value)}
          />
          <button
            className="save-button"
            onClick={saveHisPromise}
            disabled={!hisPromise.trim()}
          >
            Save My Promises! 💝
          </button>
        </div>
      )}

      {/* Final Page - Hug Day */}
      {page === 'final' && (
        <div className={`card ${showContent ? 'show' : 'hide'}`}>
          <div className="intro-icon">🤗💕</div>
          <div className="final-message">
            <span className="line emphasis">Happy Hug Day! 🤗</span>
          </div>
          <div className="heart-line">💕 🤗 💖 🤗 💕</div>
          <div className="final-message">
            <span className="line">I really want your warm,</span>
            <span className="line">comforting hug right now...</span>
            <span className="line emphasis">Even better if you're shirtless 😏💕</span>
          </div>
        </div>
      )}
    </div>
  );
}