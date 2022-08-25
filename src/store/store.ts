import { atom } from "jotai";
import { EAnswer } from "../engine/master";


export interface ISettings {
    repetitions: boolean;
    tries: number;
}

export interface ITrial {
    trial: number;
    code: number[];
    answer: EAnswer[];
}

export type State = 'FAILED' | 'SUCCEED' | 'RUNNING';
export type Screen = 'SETUP' | 'GAME';

export const settings = atom<ISettings>({repetitions: true, tries: 10});
export const trials = atom<ITrial[]>([]);
export const secret = atom<number[]>([]);
export const screen = atom<Screen>('SETUP');

export const state = atom((get) => {
    const [list, sets] = [get(trials), get(settings)];
    const win = list.length > 0 && list.at(-1)?.answer?.reduce((acc, x) => acc && x === EAnswer.Hit, true)
    if (win) {
        return 'SUCCEED';
    } else if (list.length >= sets.tries) {
        return 'FAILED';
    } else {
        return 'RUNNING';
    }
});
