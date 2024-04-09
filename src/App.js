import React from 'react';
import Draggable from './components/Draggable';
import Placeholder from './components/Placeholder';

import './css/styles.css';
import './css/background.css';



function App() {
    const [draggable, setDraggable] = React.useState(null);
    const [score, setScore] = React.useState(0);
    const [pairedElements, setPairedElements] = React.useState([]);
    const [enShuffledIndex, setEnShuffledIndex] = React.useState([]);
    const [frShuffledIndex, setFrShuffledIndex] = React.useState([]);
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
        6: {
            en: "butter",
            fr: "beurre"
        },
        7: {
            en: "bicycle",
            fr: "vélo"
        },
        8: {
            en: "railroad",
            fr: "chemin de fer"
        },
        9: {
            en: "folder",
            fr: "dossier"
        },
        10: {
            en: "weekly",
            fr: "hebdomadaire"
        },
        11: {
            en: "hungry",
            fr: "affamé"
        },
        12: {
            en: "limestone",
            fr: "calcaire"
        },
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
        const enShuffledIndex = Object.keys(words).sort(() => Math.random() - 0.5);
        setEnShuffledIndex(enShuffledIndex);
        const frShuffledIndex = Object.keys(words).sort(() => Math.random() - 0.5);
        setFrShuffledIndex(frShuffledIndex);
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
                        {enShuffledIndex.map((i) => (
                            <Draggable
                                word={words[i].en}
                                id={i}
                                setDraggable={setDraggable}
                                isPaired={(pairedElements.includes(i) || pairedElements.includes(i + '-placeholder')) && gameStarted}
                            />
                        ))}

                    </div>

                    <div>
                        {/*  French words  */}
                        {frShuffledIndex.map((i) => (
                            <Placeholder
                                word={words[i].fr}
                                id={i}
                                draggable={draggable}
                                updateScore={updateScore}
                                onDrop={handleDrop}
                                isPaired={(pairedElements.includes(i) || pairedElements.includes(i + '-placeholder')) && gameStarted}
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