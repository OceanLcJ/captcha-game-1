import SelectBoxes from "./SelectBoxes";

interface Props {
    setSuccess: (val: boolean) => void;
    setP: (paragraph: string) => void;
    setL: (paragraph: string) => void;
}

function Waldo(props: Props) {
    const correct = [4, 11, 15];
    props.setP("Select all the images with");
    props.setL("Waldos");

    return (
        <>
            <SelectBoxes setSuccess={props.setSuccess} img={"waldo.jpeg"} correct={correct}/>
        </>
    );
}

export default Waldo;
