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
        'Yes, I can borrow your burger', 
        'Unabashed John Mayer stan I am',
        'I happen to be a father of 2 plants',
        'I will moonwalk in broad daylight',
        'I am missing a tooth irl',
        'Currently watching you get impatient',
        'If you click this you will get rich',
        'You may have already won two bricks of klay!!!',
        'Dancing alleviates boredom',
        'Call your service provider and tell them to call me',
        'I can play the spongebob theme on any instrument',
        'this website is AI free',
        'Look .. behind .. you ..',
        'If you look really closely you will see a Narwhal',  
        'no time is not bannana time, stay nutritious',
        'you look tired. Take a nap and think of me',
        'And what brings you here ...'
    ]);
    const [index, setIndex] = React.useState<number>(0);

    function getFact() {
        const randomIndex = Math.floor(Math.random() * facts.length);
        setIndex(randomIndex);
    }

    useEffect(() => {
        const intervalId = setInterval(getFact, 4000);
        return () => clearInterval(intervalId);
    }, []);

    return (
    <div id="p5_loading" className="center-container">
        <h1 className="rotating-element">Loading</h1>
        <h3>{facts[index]}</h3>
        <a href="https://smallpdf.com/file#s=b69957ec-f250-47a7-8321-eb7a3f2c957d" 
        target="_blank" rel="noopener noreferrer">click to view resume</a>
    </div>
    );
    }

export default Loading;