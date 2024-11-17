import SelectBoxes from "../SelectBoxes.tsx";

interface Props {
    setSuccess: (val: boolean) => void;
    setP: (paragraph: string) => void;
    setL: (paragraph: string) => void;
}

function StopSignGrid(props: Props) {
    const correct = [];
    props.setP("Select all the images with");
    props.setL("Stop Lights");

    return (
        <>
            <SelectBoxes setSuccess={props.setSuccess} img={"stop-sign.jpg"} correct={correct}/>
        </>
    );
}

export default StopSignGrid;
