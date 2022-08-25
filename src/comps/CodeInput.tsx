import { atom, useAtom } from "jotai";
import BallLine from "./BallLine";
import './CodeInput.css';

const code = atom(new Array<number>());
const numbers = [0,1,2,3,4,5,6,7,8,9];

export default function CodeInput({newCode} : {newCode: (code: number[]) => void}) {
    const [localCode, updateCode] = useAtom(code);

    const addKey = (n: number) => {
        if (localCode.length < 6) {
            updateCode([...localCode, n]);
        }
    }
    const removeKey = () => 
        updateCode(localCode.slice(0,-1));
    const postCode = () => {
        updateCode([]);
        newCode(localCode);
    }

    return (
        <div className="container">
            <div className={"sc " + (localCode.length >= 6 ? " disabled" : "")}>
                <BallLine
                        items={numbers}
                        color={ (_ix, el) => ({bgColor: `rgb(50,100,${ 50 + parseInt(el+'') *20 })`, txColor: 'white'})}
                        disabled={localCode.length >= 6}
                        onClick={addKey}
                />
            </div>
            <div className="sc">
                <BallLine
                        items={localCode}
                        color={ (_ix, el) => ({bgColor: `rgb(${ 50 + parseInt(el+'') *40 },100,50)`, txColor: 'white'})}
                />
            <button onClick={removeKey} disabled={localCode.length === 0} className="ltbutton">&lt;</button>
            <button onClick={postCode} disabled={localCode.length !==6} className="gobutton">Go!</button>
           </div>
        </div>
    );
}