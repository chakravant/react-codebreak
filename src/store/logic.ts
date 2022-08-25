import { atom } from 'jotai';
import { random_seq, calculate } from '../engine/master';
import { settings, trials, secret } from './store';

export const gameStarter = atom(null, (get, set) => {
    const {repetitions} = get(settings);
    const newSeq = random_seq(6, 9, 0, repetitions);
    set(secret, newSeq);
});

export const gameMove = atom(null, (get, set, move) => {
    if (move instanceof Array && move.length === 6) {
        const code = move as number[];
        const scr = get(secret);
        const answer = calculate(scr, code);
        set(trials, curr => ([...curr, {trial: curr.length +1, code, answer}]));
    }
});
