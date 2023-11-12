import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Welcome.css';
import Confetti from 'react-confetti';
import useKeyPress from './useKeyPress';
import { useEffect, useState } from 'react';

export function Welcome() {
  const [pieces, setPieces] = useState(400);

  const navigate = useNavigate();

  const location = useLocation();
  const pathList = location.pathname.split('/');
  const name = pathList.at(-1);

  const handleClick = (e) => {
    navigate('/');
  };

  useKeyPress('any', () => {
    navigate('/');
  });

  useEffect(() => {
    setTimeout(() => {
      setPieces(0);
    }, 7000);
  }, []);

  return (
    <form className="greeting" onClick={handleClick} onKeyDown={handleClick}>
      <Confetti
        width={window.width}
        height={window.height}
        gravity={0.1}
        numberOfPieces={pieces}
        onConfettiComplete={() => navigate('/')}
      />

      <h1 className="greet">
        Welcome, {name.charAt(0).toUpperCase() + name.slice(1)}!
      </h1>
    </form>
  );
}
