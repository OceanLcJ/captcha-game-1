import './Level2.css'

interface Props {
    setSuccess: (val: boolean) => void;
}

function Level2(props : Props) {

    return (
        <div className="level2" onClick={() => props.setSuccess(true)}>
            Level2
        </div>
    );
}

export default Level2