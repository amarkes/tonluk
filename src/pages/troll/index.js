// pages/game.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { blockSystemStore } from '@/contexts/AuthContext';
import styles from './styles.module.css';

export default function TrollPage() {
    const [score, setScore] = useState(0);
    const [position, setPosition] = useState({ top: '50%', left: '50%' });
    const [speed, setSpeed] = useState(1000); // Tempo que o alvo permanece
    const [gameOver, setGameOver] = useState(false);
    const [sarcasmo, setSarcasmo] = useState(""); // Mensagem sarcástica

    useEffect(() => {
        if (score >= 1) {
            Cookies.remove(blockSystemStore);
            setGameOver(true);
        }
        // Atualiza a mensagem de sarcasmo conforme a pontuação aumenta
        if (score < 3) {
            setSarcasmo("Nossa, isso tá difícil, hein? 😏");
        } else if (score < 5) {
            setSarcasmo("Tá tentando, né? Continua! 😜");
        } else if (score < 8) {
            setSarcasmo("Quase lá... ou não. 😬");
        } else {
            setSarcasmo(""); // Quando a pontuação melhora, não provoca mais
        }
    }, [score]);

    const moveTarget = () => {
        const randomTop = `${Math.floor(Math.random() * 80)}%`;
        const randomLeft = `${Math.floor(Math.random() * 80)}%`;
        setPosition({ top: randomTop, left: randomLeft });

        // Aumenta a dificuldade a cada clique
        setSpeed((prevSpeed) => (prevSpeed > 300 ? prevSpeed - 100 : prevSpeed));
    };

    useEffect(() => {
        const interval = setInterval(moveTarget, speed);
        return () => clearInterval(interval);
    }, [speed]);

    const handleClick = () => {
        setScore(score + 1);
        moveTarget();
    };

    return (
        <div className={styles.trollContainer}>
            {!gameOver ? (
                <>
                    <h1 className={styles.trollTitle}>Já que!</h1>
                    <h1 className={styles.trollTitle}>Gosta de brincar!</h1>
                    <h1 className={styles.trollTitle}>Vamos ver seu desempenho!</h1>
                    <h3 className={styles.trollSubTitle}>Clique no Alvo!</h3>
                    <p className={styles.trollPoints}>Pontuação: {score}</p>

                    {/* Mensagem de sarcasmo */}
                    {sarcasmo && (
                        <p className={styles.trollMessage}>{sarcasmo}</p>
                    )}

                    <div
                        className={styles.trollClick}
                        style={{ top: position.top, left: position.left }}
                        onClick={handleClick}
                    ></div>
                </>
            ) : (
                <div className={styles.trollSuccess}>
                    <h1 className={styles.trollTitleSuccess}>Parabéns!</h1>
                    <p className={styles.trollPoints}>Você venceu o jogo com {score} pontos!</p>
                    <button
                        className={styles.trollButtonAgain}
                        onClick={() => {
                            setScore(0);
                            setGameOver(false);
                            setSpeed(1000);
                        }}
                    >
                        Jogar de Novo
                    </button>
                    <button
                        className={styles.trollButtonLogin}
                        onClick={() => {
                            Cookies.remove(blockSystemStore);
                            window.location.href = "/";
                        }}
                    >
                        Quero logar no sistema
                    </button>
                </div>
            )}
        </div>
    );
}

TrollPage.getLayout = function getLayout(page) {
    return <TrollPage>{page}</TrollPage>;
};
