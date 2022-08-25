import { useAtom, useSetAtom } from 'jotai';
import React from 'react';
import { gameStarter } from '../store/logic';
import { settings, screen } from '../store/store';
import './Setup.css';

export default function Setup() {
    const [setVal, updateSets] = useAtom(settings);
    const updateScreen = useSetAtom(screen);
    const startGame = useSetAtom(gameStarter);
    const updateDiff:React.ChangeEventHandler<HTMLInputElement> = e => {
        const diff = e.target.valueAsNumber;
        if (diff >= 1 || diff <= 5) {
            updateSets({...setVal, tries: 11 - diff});
        }
    };
    const updateRpt:React.ChangeEventHandler<HTMLInputElement> = e => {
        const repetitions = e.target.checked;
        updateSets({...setVal, repetitions});
    };
    const start = () => {
        startGame(setVal);
        updateScreen('GAME');
    }
    
    return (
        <>
        <h1>MASTERMIND</h1>
        <h2>Game settings</h2>
        <div className='config'>
            <p>
                <label>Difficulty (1-5)
                    <input type="number" 
                           max="5" 
                           min="1" 
                           value={11 - setVal.tries} 
                           onChange={updateDiff}/>
                </label>
            </p>
            <p>
                <label>
                    <input type="checkbox" 
                           checked={setVal.repetitions}
                           onChange={updateRpt}/> 
                    Repetitions allowed
                </label>
            </p>
            <button onClick={start}>
                Start
            </button>
        </div>
        </>
    );
}