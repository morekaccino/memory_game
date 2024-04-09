import ConfettiExplosion from "react-confetti-explosion";
import React from "react";


/**
 * ConfettiEffectManager component
 *
 * This component is responsible for managing and rendering confetti explosion effects.
 * It receives an 'effects' prop, which is an array of effect objects. Each effect object
 * has the following properties:
 *
 * @param {Array<Object>} effects - An array of effect objects to be rendered.
 * @param {boolean} effects[].isExploding - Determines whether the effect should be rendered.
 * @param {number} effects[].duration - The duration of the confetti explosion in milliseconds.
 * @param {number} effects[].force - The force of the confetti explosion.
 * @param {number} effects[].particleCount - The number of confetti particles to be rendered.
 * @param {number} effects[].particleSize - The size of the confetti particles.
 * @param {Object} effects[].position - The position of the confetti explosion.
 * @param {Object} effects[].rect - The dimensions of the confetti explosion.
 *
 * The component maps through the 'effects' array and renders a 'ConfettiExplosion'
 * component for each effect object where 'isExploding' is true. The 'ConfettiExplosion'
 * component is responsible for rendering the actual confetti explosion.
 *
 * @returns {JSX.Element} - A React component that renders the confetti explosion effects.
 */
const ConfettiEffectManager = ({effects}) => {
    return (
        <>
            {effects.map((effect, index) => (
                effect.isExploding && (
                    <ConfettiExplosion
                        key={index}
                        duration={effect.duration}
                        force={effect.force}
                        particleCount={effect.particleCount}
                        particleSize={effect.particleSize}
                        position={effect.position}
                        rect={effect.rect}
                    />
                )
            ))}
        </>
    );
};


export default ConfettiEffectManager;