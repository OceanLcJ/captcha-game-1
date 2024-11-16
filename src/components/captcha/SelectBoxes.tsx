import './SelectBoxes.css'
import { useState } from 'react';

interface Props {
    setSuccess: (val: boolean) => void;
    img: string;
    correct: number[];
}

function Level1(props: Props) {
    const [activeSections, setActiveSections] = useState(Array(16).fill(false));

    const toggleActive = (index: number) => {
        const newStates = [...activeSections];
        newStates[index] = !newStates[index];
        setActiveSections(newStates);

        const combination = props.correct.every((idx) => newStates[idx]); //compare indexes to correct
        props.setSuccess(combination);
    };

    return (
        <div className="select-boxes" style={{backgroundImage: 'url("/public/'+props.img +'")'}}>
            {activeSections.map((isActive, index) => (
                <section
                    key={index}
                    className={isActive ? "selection active" : "selection"}
                    onClick={() => toggleActive(index)}>

                    {isActive && (<img src="/check-solid.svg" alt="check"/>)}
                </section>
            ))}
        </div>
    );
}

export default Level1
