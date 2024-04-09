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

    const updateScore = () => {
        setScore(score + 1);
        console.log(score);
    };

    const handleDrop = (id, draggableId) => {
        // Update the pairedElements state
        setPairedElements([...pairedElements, id, draggableId]);
    };

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
                <div className={'score'}>{score}</div>
                <div className={'board'}>
                    <div>
                        <Draggable
                            word={'Hello 1'}
                            id={1}
                            setDraggable={setDraggable}
                            isPaired={pairedElements.includes(1) || pairedElements.includes(1 + '-draggable')}
                        />
                        <Draggable
                            word={'Hello 2'}
                            id={2}
                            setDraggable={setDraggable}
                            isPaired={pairedElements.includes(2) || pairedElements.includes(2 + '-draggable')}
                        />
                        <Draggable
                            word={'Hello 3'}
                            id={3}
                            setDraggable={setDraggable}
                            isPaired={pairedElements.includes(3) || pairedElements.includes(3 + '-draggable')}
                        />
                    </div>

                    <div>
                        <Placeholder
                            word={'World 1'}
                            id={1}
                            draggable={draggable}
                            updateScore={updateScore}
                            onDrop={handleDrop}
                            isPaired={pairedElements.includes(1) || pairedElements.includes(1 + '-placeholder')}
                        />
                        <Placeholder
                            word={'World 2'}
                            id={2}
                            draggable={draggable}
                            updateScore={updateScore}
                            onDrop={handleDrop}
                            isPaired={pairedElements.includes(2) || pairedElements.includes(2 + '-placeholder')}
                        />
                        <Placeholder
                            word={'World 3'}
                            id={3}
                            draggable={draggable}
                            updateScore={updateScore}
                            onDrop={handleDrop}
                            isPaired={pairedElements.includes(3) || pairedElements.includes(3 + '-placeholder')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;