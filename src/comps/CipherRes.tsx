import BallLine from "./BallLine";

export default function CipherRes({numCodes} : {numCodes: number[]}) { 
    return (
        <BallLine
            items={numCodes}
            color={ (ix, _el) => ({bgColor: `rgb(${ 20 + ix*40 },100,50)`, txColor: 'white'})}
            />
    );
}