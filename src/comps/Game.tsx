import React from "react";
import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { secret, state, trials, screen } from "../store/store";
import './Game.css';
import CodeInput from "./CodeInput";
import Results from "./Results";
import CipherRes from "./CipherRes";
import { gameMove } from "../store/logic";

export default function Game() {
    const gameState = useAtomValue(state);
    const [trialList, trialUpdater] = useAtom(trials);
    const secretCode = useAtomValue(secret);
    const makeMove = useSetAtom(gameMove);
    const updateScreen = useSetAtom(screen);

    const postCode = (code: number[]) => {
        makeMove(code);
    };
    const resetGame = () => {
        trialUpdater([]);
        updateScreen("SETUP");
    };
    return (
    <>
        <h1>Code Breaker</h1>
        { gameState === 'RUNNING' ? <>
                <h2>Try your skill</h2>
                <CodeInput newCode={postCode} />
          </> : <button onClick={resetGame} className="tryagain">AGAIN</button>
        }
        <h2>Results</h2>
        <div className="container">
        <Results solutions={trialList}/>
        {gameState !== 'RUNNING' ? (
            gameState === 'FAILED' ? 
                <div className="fail">
                    Sorry, max number of tries exceeded. The code is: 
                    <div><CipherRes numCodes={secretCode} /></div>
                </div> :
                <div className="win">
                    You guessed right
                </div>
            ) : <span/>
        }
        </div>
    </>
    );
}