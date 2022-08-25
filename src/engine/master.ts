export type Optional<T> = T | undefined | null;

type MarkedNumber = number | 'EX' | 'FND'

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

function mark_removed(arr: MarkedNumber[], elem: number): Optional<number> {
  const ix = arr.indexOf(elem);
  if (ix !== -1) {
    arr[ix] = 'FND';
    return elem;
  }

  return undefined;
}

function calculate_white(mcode: MarkedNumber[], ans: number[]) {
  const nmcode = mcode.slice();
  for (let i = 0; i < 4; i += 1) {
    if (mcode[i] === 'FND') continue;
    mark_removed(nmcode, ans[i]);
  }

  return nmcode;
}

export enum EAnswer {
  Hit, Miss, Found
}

export function calculate(code: number[], answer: number[]): EAnswer[] {
  const blk = calculate_black(code, answer);
  const miss = calculate_white(blk, answer);
  return miss.map(d => {
    switch(d) {
      case 'EX': return EAnswer.Hit;
      case 'FND': return EAnswer.Found;
      default: return EAnswer.Miss;
    }
  })
}
