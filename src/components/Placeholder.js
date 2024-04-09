import React from "react";
import useSound from "use-sound";
import cheer from "../sound/cheer.mp3";

import ConfettiEffectManager from "./ConfettiManager";

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
            addConfettiEffect({
                isExploding: true,
                duration: 2000,
                force: 0.8,
                particleCount: 50,
                particleSize: 15,
                position: 'absolute',
                rect: 'screen',
            });
            playCheer()

            // remove confetti effect after 5 seconds
            setTimeout(() => {
                removeConfettiEffect(0);
            }, 5000);
        }
    };

    const [confettiEffects, setConfettiEffects] = React.useState([]);

    const addConfettiEffect = (effect) => {
        setConfettiEffects([...confettiEffects, effect]);
    };

    const removeConfettiEffect = (index) => {
        const newEffects = [...confettiEffects];
        newEffects.splice(index, 1);
        setConfettiEffects(newEffects);
    };


    return (
        <>
            <ConfettiEffectManager effects={confettiEffects}/>
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

export default Placeholder;