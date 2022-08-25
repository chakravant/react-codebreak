import { EAnswer } from "../engine/master";
import { ITrial } from "../store/store";
import BallLine from "./BallLine";
import CipherRes from './CipherRes';

import './Results.css'


function CipherSummary({numCodes, answer} : {numCodes: number[], answer: EAnswer[]}) { 
    const bgc = (ix: number) => {
        switch(answer[ix]) {
            case EAnswer.Hit: return 'green';
            case EAnswer.Found: return 'yellow';
            case EAnswer.Miss: return 'black';
        }
    }

    const fgc = (ix: number) => {
        switch(answer[ix]) {
            case EAnswer.Hit: return 'white';
            case EAnswer.Found: return 'black';
            case EAnswer.Miss: return 'white';
        }
    }

    return (
        <BallLine
            items={numCodes}
            color={ (ix, _el) => ({bgColor: bgc(ix), txColor: fgc(ix)})}
            />
    );
}

export default function Results({solutions} : {solutions: ITrial[]}) {
    return (
        <table>
            <thead>
                <tr>
                    <td>Try</td>
                    <td>Code</td>
                    <td>Solution</td>
                </tr>
            </thead>
            <tbody>
                {solutions.map(({trial, code, answer}) => (
                <tr key={trial}>
                    <td>{trial}</td>
                    <td><CipherRes numCodes={code}/></td>
                    <td><CipherSummary numCodes={code} answer={answer}/></td>
                </tr>
                ))}
            </tbody>
        </table>
    );
}