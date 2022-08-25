export type Optional<T> = T | undefined | null;

type MarkedNumber = number | 'EX' | 'FND';

export enum EAnswer {
  Miss, Hit, Found
}

function rnd(max: number, min = 1) {
  return Math.floor(Math.random() * max) + min;
}

export function rand(max: number, min = 1, not_in: number[] | undefined = undefined): number {
  do {
    const x = rnd(max, min);
    if (not_in === undefined || not_in.indexOf(x) === -1) {
      return x;
    }
  } while (true);
}

export function random_seq(len: number, max: number, min = 1, repeat = true) {
  const qs: number[] = [];
  for (let i = 0; i < len; i += 1) {
    const ql = rand(max, min, repeat ? undefined : qs);
    qs.push(ql);
  }
  return qs;
}

function calculate_black(code: number[], answer: number[]): MarkedNumber[] {
  const ans = new Array<MarkedNumber>(code.length);
  for (let i = 0; i < code.length; i += 1) {
    if (code[i] === answer[i]) {
      ans[i] = 'EX';
    } else {
      ans[i] = code[i];
    }
  }

  return ans;
}

function mark_removed(arr: MarkedNumber[], elem: number): EAnswer {
  const ix = arr.indexOf(elem);
  if (ix !== -1) {
    arr[ix] = 'FND';
    return EAnswer.Found;
  }

  return EAnswer.Miss;
}

function calculate_white(mcode: MarkedNumber[], ans: number[]) {
  const answer = new Array<EAnswer>();
  for (let i = 0; i < ans.length; i += 1) {
    if (mcode[i] === 'EX') {
      answer[i] = EAnswer.Hit;
    } else {
      answer[i] = mark_removed(mcode, ans[i]);
    }
  }

  return answer;
}

export function calculate(code: number[], answer: number[]): EAnswer[] {
  const hits = calculate_black(code, answer);
  const maps = calculate_white(hits, answer);
  return maps;
}
