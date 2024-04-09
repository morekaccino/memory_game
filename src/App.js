import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import useSound from 'use-sound'
import cheer from './sound/cheer.mp3'


import './css/styles.css';
import './css/background.css';


function Draggable({word, id, setDraggable, isPaired}) {
    const [dragging, setDragging] = React.useState(false);

    const handleDragStart = (e) => {
        setDragging(true);
        setDraggable(id);
    };

    const handleDragEnd = (e) => {
        setDragging(false);
        setDraggable(null);
    };

    return (
        <div
            className={`draggable ${dragging ? 'dragging' : ''} ${isPaired ? 'paired' : ''}`}
            id={`draggable-${id}`}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable={"true"}
        >
            {word}
        </div>
    );
}

function Placeholder({word, id, draggable, updateScore, onDrop, isPaired}) {
    const [isExploding, setIsExploding] = React.useState(false);
    const [playCheer] = useSound(cheer)
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        console.log('Dropped!');
        console.log(draggable, id)

        if (draggable === id) {
            console.log('Match!');
            updateScore();
            onDrop(id, draggable);
            setIsExploding(true);
            playCheer()
        }
    };

    return (
        <>
            {isExploding && <ConfettiExplosion/>}
            <div
                className={`placeholder ${isPaired ? 'paired' : ''}`}
                id={`placeholder-${id}`}
                draggable={"false"}
                onDrop={handleDrop}
                onDragOver={handleDragOver}

            >
                {word}
            </div>
        </>
    );
}

function App() {
    const [draggable, setDraggable] = React.useState(null);
    const [score, setScore] = React.useState(0);
    const [pairedElements, setPairedElements] = React.useState([]);
    const [shuffledEnWords, setShuffledEnWords] = React.useState([]);
    const [shuffledFrWords, setShuffledFrWords] = React.useState([]);
    const [gameStarted, setGameStarted] = React.useState(false);
    const words = {
        1: {
            en: "forest",
            fr: "forêt"
        },
        2: {
            en: "siblings",
            fr: "frères et sœurs"
        },
        3: {
            en: "cereal",
            fr: "céréales"
        },
        4: {
            en: "desk",
            fr: "bureau"
        },
        5: {
            en: "camel",
            fr: "chameau"
        },
        // 6: {
        //     en: "butter",
        //     fr: "beurre"
        // },
        // 7: {
        //     en: "bicycle",
        //     fr: "vélo"
        // },
        // 8: {
        //     en: "railroad",
        //     fr: "chemin de fer"
        // },
        // 9: {
        //     en: "folder",
        //     fr: "dossier"
        // },
        // 10: {
        //     en: "weekly",
        //     fr: "hebdomadaire"
        // },
        // 11: {
        //     en: "hungry",
        //     fr: "affamé"
        // },
        // 12: {
        //     en: "limestone",
        //     fr: "calcaire"
        // },
    };

    const updateScore = () => {
        setScore(score + 1);
        console.log(score);
    };

    const checkGameOver = () => {
        console.log(pairedElements.length, Object.keys(words).length * 2);
    if (pairedElements.length === Object.keys(words).length * 2 - 2) {
        console.log('Game Over!');
        setGameStarted(false);
    }
  };

    const handleDrop = (id, draggableId) => {
        // Update the pairedElements state
        setPairedElements([...pairedElements, id, draggableId]);
        checkGameOver();
    };


    const shuffleWords = () => {
        const shuffledEnWords = [];
        const shuffledFrWords = [];
        for (let i = 1; i <= Object.keys(words).length; i++) {
            shuffledEnWords.push(
                words[i].en
            );
            shuffledFrWords.push(
                words[i].fr
            );
        }
        // shuffle the arrays
        shuffledEnWords.sort(() => Math.random() - 0.5);
        shuffledFrWords.sort(() => Math.random() - 0.5);
        setShuffledEnWords(shuffledEnWords);
        setShuffledFrWords(shuffledFrWords);
    };

    const resetGame = () => {
        setScore(0);
        setPairedElements([]);
        shuffleWords();
        setGameStarted(true)
        // remove the paired class from all elements
    }


    return (
        <>
            <div className={'background'}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className={'game-container'}>
                {gameStarted && <div className={'score'}>{score}</div>}
                <div className={'board'}>
                    <div>
                        {/*  English words  */}
                        {shuffledEnWords.map((word, index) => (
                            <Draggable
                                word={word}
                                id={index}
                                setDraggable={setDraggable}
                                isPaired={(pairedElements.includes(index) || pairedElements.includes(index + '-draggable')) && gameStarted}
                            />
                        ))}
                    </div>

                    <div>
                        {/*  French words  */}
                        {shuffledFrWords.map((word, index) => (
                            <Placeholder
                                word={word}
                                id={index}
                                draggable={draggable}
                                updateScore={updateScore}
                                onDrop={handleDrop}
                                isPaired={(pairedElements.includes(index) || pairedElements.includes(index + '-placeholder')) && gameStarted}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {!gameStarted && <div className={'menu'}>
                <div>
                    Drag and drop the English words to their French translations!
                </div>
                <button className={'start-button'} onClick={() => {
                    resetGame()
                }}>Go!
                </button>
            </div>}
        </>
    );
}

export default App;