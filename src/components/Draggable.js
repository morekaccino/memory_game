import React from "react";

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
            draggable={true}
        >
            {word}
        </div>
    );
}

export default Draggable;