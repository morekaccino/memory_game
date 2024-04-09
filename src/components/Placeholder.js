import React from "react";
import useSound from "use-sound";
import cheer from "../sound/cheer.mp3";

import ConfettiEffectManager from "./ConfettiManager";

/**
 * Placeholder component
 *
 * This component represents a placeholder element that can be used in a drag-and-drop interaction.
 * It handles the drag-and-drop events and updates the score when a correct match is made.
 * Additionally, it manages the confetti explosion effect and plays a cheer sound when a match is found.
 *
 * @param {Object} props - The component props.
 * @param {string} props.word - The text content of the placeholder.
 * @param {string} props.id - The unique identifier of the placeholder.
 * @param {string} props.draggable - The ID of the draggable element that matches this placeholder.
 * @param {function} props.updateScore - A function to update the score when a match is made.
 * @param {function} props.onDrop - A function to handle the drop event and update the state accordingly.
 * @param {boolean} props.isPaired - A flag indicating whether the placeholder is paired with a draggable element.
 *
 * @returns {JSX.Element} - A React component that renders the placeholder and manages the confetti explosion effect.
 */
function Placeholder({word, id, draggable, updateScore, onDrop, isPaired}) {
    const [isExploding, setIsExploding] = React.useState(false);
    const [playCheer] = useSound(cheer)

    /**
     * Handles the drag-over event and prevents the default behavior.
     * @param {React.DragEvent<HTMLDivElement>} e - The drag-over event object.
     */
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    /**
     * Handles the drop event, checks if the dropped element matches the placeholder,
     * updates the score, plays a cheer sound, and triggers a confetti explosion effect.
     * @param {React.DragEvent<HTMLDivElement>} e - The drop event object.
     */
    const handleDrop = (e) => {
        e.preventDefault();
        if (draggable === id) {
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
            playCheer();

            // Remove the confetti effect after 5 seconds
            setTimeout(() => {
                removeConfettiEffect(0);
            }, 5000);
        }
    };

    const [confettiEffects, setConfettiEffects] = React.useState([]);

    /**
     * Adds a new confetti effect to the state.
     * @param {Object} effect - The confetti effect object to be added.
     */
    const addConfettiEffect = (effect) => {
        setConfettiEffects([...confettiEffects, effect]);
    };

    /**
     * Removes a confetti effect from the state based on the provided index.
     * @param {number} index - The index of the confetti effect to be removed.
     */
    const removeConfettiEffect = (index) => {
        const newEffects = [...confettiEffects];
        newEffects.splice(index, 1);
        setConfettiEffects(newEffects);
    };

    return (
        <>
            <ConfettiEffectManager effects={confettiEffects} />
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