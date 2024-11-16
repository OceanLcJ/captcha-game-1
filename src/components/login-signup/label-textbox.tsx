import './label-textbox.css'

interface Props {
    name: string,
    isPassword: boolean,
}

export function LabelTextBox(props: Props) {
    return (
        <div className="container">
            <p className='name'>{props.name}</p>
            <input className="text-input" type={props.isPassword ? "password" : "text"}></input>
        </div>
    );
}