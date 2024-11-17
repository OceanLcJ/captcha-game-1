import './SelectBoxes.css'
import { useState } from 'react';

interface Props {
    setSuccess: (val: boolean) => void;
    img: string;
    correct: number[];
}

function Level1(props: Props) {
    const [activeSections, setActiveSections] = useState(Array(16).fill(false));
    const maxWrongAllowed = 2;

    const toggleActive = (index: number) => {
        const newStates = [...activeSections];
        newStates[index] = !newStates[index];
        setActiveSections(newStates);

        let wrongSelections = 0;
        newStates.forEach((isActive, i) => {
            if (isActive && !props.correct.includes(i)) {
                wrongSelections++;
            } else if (!isActive && props.correct.includes(i)) {
                wrongSelections++;
            }
        });

        if (wrongSelections <= maxWrongAllowed) {
            const combination = props.correct.every((idx) => newStates[idx]);
            props.setSuccess(combination);
        } else {
            props.setSuccess(false);
        }
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

export default Level1;