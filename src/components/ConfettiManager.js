import ConfettiExplosion from "react-confetti-explosion";
import React from "react";

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