import React from "react";

/**
 * Draggable component
 *
 * This component represents a draggable element in the game. It handles the drag-and-drop
 * functionality, including the start and end of the dragging operation.
 *
 * @param {Object} props - The component props.
 * @param {string} props.word - The text content of the draggable element.
 * @param {string} props.id - The unique identifier of the draggable element.
 * @param {function} props.setDraggable - A function to update the currently draggable element.
 * @param {boolean} props.isPaired - A flag indicating whether the draggable element is paired with a placeholder.
 *
 * @returns {JSX.Element} - A React component that renders the draggable element.
 */
function Draggable({word, id, setDraggable, isPaired}) {
    const [dragging, setDragging] = React.useState(false);

    /**
     * Handles the start of the drag event.
     * Updates the dragging state to true and sets the currently draggable element.
     * @param {React.DragEvent<HTMLDivElement>} e - The drag start event object.
     */
    const handleDragStart = (e) => {
        setDragging(true);
        setDraggable(id);
    };

    /**
     * Handles the end of the drag event.
     * Updates the dragging state to false and clears the currently draggable element.
     * @param {React.DragEvent<HTMLDivElement>} e - The drag end event object.
     */
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