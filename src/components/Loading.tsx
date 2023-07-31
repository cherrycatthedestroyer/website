import React, { useState, useEffect } from "react";

function Loading() {
    const [facts, setFacts] = useState<string[]>([
        'Wanna read my resume while you wait?', 
        'Im really good at making long loading screens', 
        'I usually have food nearby me', 
        'Can play the recorder through my nose', 
        'Mace Windu invented his own saber style',
        'I am aware that I hunch sometimes', 
        'I will not murder bugs.', 
        'Yes, I can borrow your burger', ]);
    const [index, setIndex] = React.useState<number>(0);

    function getFact() {
        const randomIndex = Math.floor(Math.random() * facts.length);
        setIndex(randomIndex);
    }

    useEffect(() => {
        const intervalId = setInterval(getFact, 50);
        return () => clearInterval(intervalId);
    }, []);

    return (
    <div id="p5_loading" className="center-container">
        <h1 className="rotating-element">Loading</h1>
        <h3>{facts[index]}</h3>
        <a href="https://pdfhost.io/v/uPYk97dGP_joshjob_resume" 
        target="_blank" rel="noopener noreferrer">click to view resume</a>
    </div>
    );
    }

export default Loading;