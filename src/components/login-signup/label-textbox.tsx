import './label-textbox.css'

interface Props {
    name: string,
    value: string,
    onChange: (e: React.SetStateAction<string>) => void,
    isPassword: boolean,
}

export function LabelTextBox(props: Props) {
    return (
        <div className="container">
            <p className='name'>{props.name}</p>
            <input className="text-input" type={props.isPassword ? "password" : "text"}
            value={props.value} onChange={e => props.onChange(e.target.value)}
            ></input>
        </div>
    );
}