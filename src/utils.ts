export const sum = (nums: number[]) => {
  let total = 0;

  for (let i = 0; i < nums.length; i++) {
    total += nums[i];
  }
  return total;
};

const splitBy = (seperator: string) => (str: string) => str.split(seperator);

export const splitBySpace = splitBy(" ");
export const splitByLine = splitBy("\n");

type Fn = (...args: any) => any;

type ExtractLast<T extends unknown[]> = T extends [...any, infer Last]
  ? Last
  : any;

type ExtractLastReturn<Fns extends Fn[]> = ReturnType<ExtractLast<Fns>>;

type FuncChain<
  Fn1 extends Fn,
  Fn2 extends Fn
> = ReturnType<Fn1> extends Parameters<Fn2>[0]
  ? [Fn1, (arg: ReturnType<Fn1>) => ReturnType<Fn2>]
  : never;

type ChainedFunctions<Fns extends any[]> = Fns extends [
  infer First extends Fn,
  infer Second extends Fn,
  ...infer Rest
]
  ? [...FuncChain<First, Second>, ...ChainedFunctions<Rest>]
  : Fns;

type Flow = <Input>(input: Input) => {
  pipe: <Funcs extends [(input: Input) => unknown, ...any[]]>(
    ...fns: Funcs extends [infer First extends Fn, infer Second, ...infer Rest]
      ? [
          ...ChainedFunctions<[(input: Input) => ReturnType<First>, Second]>,
          ...ChainedFunctions<Rest>
        ]
      : Funcs
  ) => ExtractLastReturn<Funcs>;
};

export const flow: Flow = <T>(input: T) => {
  return {
    pipe(...funcs) {
      return funcs.reduce((result: any, fn) => fn(result), input);
    },
  };
};
