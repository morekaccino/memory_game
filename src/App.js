import React from 'react';
import './css/styles.css';


function Draggable({word, id, setDraggable}) {
    const [dragging, setDragging] = React.useState(false)

    const handleDragStart = (e) => {
        setDragging(true)
        setDraggable(id)
    }

    const handleDragEnd = (e) => {
        setDragging(false)
        setDraggable(null)
    }


    return <div className={`draggable ${dragging ? 'dragging' : ''}`}
                id={`draggable-${id}`}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggable={"true"}>
        {word}
    </div>
}

function Placeholder({word, id, draggable, updateScore}) {

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        console.log('Dropped!')

        const draggableElement = document.getElementById(`draggable-${draggable}`)
        const placeholderElement = document.getElementById(`placeholder-${id}`)
        // add paired class to both elements
        placeholderElement.classList.add('paired')
        draggableElement.classList.add('paired')
        console.log(draggableElement.classList)
        console.log(placeholderElement.classList)


        console.log(draggableElement)

        if (draggable === id) {
            console.log('Match!')
            updateScore()
        }
    }


    return <div className={'placeholder'}
                id={`placeholder-${id}`}
                draggable={"false"}
                onDrop={handleDrop}
                onDragOver={handleDragOver}>
        {word}
    </div>
}


function App() {
    const [draggable, setDraggable] = React.useState(null)
    const [score, setScore] = React.useState(0)

     const updateScore = () => {
        setScore(score + 1);
        console.log(score)
    }


    return (<div className={'game-container'}>
        <div className={'score'}>{score}</div>
        <div className={'board'}>
            <div>
                <Draggable word={'Hello 1'} id={1} setDraggable={setDraggable}/>
                <Draggable word={'Hello 2'} id={2} setDraggable={setDraggable}/>
                <Draggable word={'Hello 3'} id={3} setDraggable={setDraggable}/>
            </div>

            <div>
                <Placeholder word={'World 1'} id={1} draggable={draggable} updateScore={updateScore}/>
                <Placeholder word={'World 2'} id={2} draggable={draggable} updateScore={updateScore}/>
                <Placeholder word={'World 3'} id={3} draggable={draggable} updateScore={updateScore}/>
            </div>
        </div>
    </div>)
}

export default App;