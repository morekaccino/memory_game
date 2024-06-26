import React from 'react';
import Draggable from './components/Draggable';
import Placeholder from './components/Placeholder';

import './css/styles.css';
import './css/background.css';


/**
 * App component
 *
 * This is the main component of the application, which manages the overall game logic and state.
 * It includes the following functionality:
 *
 * 1. Displaying the game board with shuffled English and French words.
 * 2. Handling the drag-and-drop interaction between the Draggable and Placeholder components.
 * 3. Updating the score and checking for the game over condition.
 * 4. Providing a menu for starting and resetting the game.
 *
 * @returns {JSX.Element} - A React component that renders the game interface.
 */
function App() {
    const [draggable, setDraggable] = React.useState(null);
    const [score, setScore] = React.useState(0);
    const [pairedElements, setPairedElements] = React.useState([]);
    const [enShuffledIndex, setEnShuffledIndex] = React.useState([]);
    const [frShuffledIndex, setFrShuffledIndex] = React.useState([]);
    const [gameStarted, setGameStarted] = React.useState(false);

    // Object containing the English and French word pairs
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

    /**
     * Updates the score by incrementing the current score by 1.
     */
    const updateScore = () => {
        setScore(score + 1);
        console.log(score);
    };

    /**
     * Checks if the game is over by comparing the number of paired elements
     * with the total number of word pairs.
     */
    const checkGameOver = () => {
        console.log(pairedElements.length, Object.keys(words).length * 2);
        if (pairedElements.length === Object.keys(words).length * 2 - 2) {
            console.log('Game Over!');
            setGameStarted(false);
        }
    };

    /**
     * Handles the drop event when a draggable element is dropped onto a placeholder.
     * Updates the pairedElements state and checks if the game is over.
     * @param {string} id - The ID of the placeholder where the element was dropped.
     * @param {string} draggableId - The ID of the draggable element that was dropped.
     */
    const handleDrop = (id, draggableId) => {
        // Update the pairedElements state
        setPairedElements([...pairedElements, id, draggableId]);
        checkGameOver();
    };


    /**
     * Shuffles the order of the English and French word indices.
     */
    const shuffleWords = () => {
        const enShuffledIndex = Object.keys(words).sort(() => Math.random() - 0.5);
        setEnShuffledIndex(enShuffledIndex);
        const frShuffledIndex = Object.keys(words).sort(() => Math.random() - 0.5);
        setFrShuffledIndex(frShuffledIndex);
    };

    /**
     * Resets the game by setting the score to 0, clearing the paired elements,
     * shuffling the words, and starting the game.
     */
    const resetGame = () => {
        setScore(0);
        setPairedElements([]);
        shuffleWords();
        setGameStarted(true)
        // remove the paired class from all elements
    }



    return (
        // JSX code for rendering the game interface
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