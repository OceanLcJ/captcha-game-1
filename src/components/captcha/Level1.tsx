import './Level1.css'
import { useState } from 'react';

interface Props {
    setSuccess: (val: boolean) => void;
}

function Level1(props: Props) {
    const [activeSections, setActiveSections] = useState(Array(16).fill(false));

    const toggleActive = (index: number) => {
        const newStates = [...activeSections];
        newStates[index] = !newStates[index];
        setActiveSections(newStates);

        const combination = newStates[12] && newStates[13] && newStates[14] && newStates[15];
        props.setSuccess(combination);
    };

    return (
        <div className="level1">
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
