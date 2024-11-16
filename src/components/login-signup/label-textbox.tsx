import './label-textbox.css'

interface Props {
    name: string,
}

export function LabelTextBox(props: Props) {
    return (
        <>
            <p>{props.name}</p>
            <input></input>
        </>
    );
}