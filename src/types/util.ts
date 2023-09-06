// eslint-disable-next-line @typescript-eslint/ban-types
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

// eslint-disable-next-line @typescript-eslint/ban-types
export type WithRequired<T, K extends keyof T> = T & { [_ in K]: {} };

export type AtLeastOneRequired<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

export type OmitWithSubstring<T extends object, S extends string> = {
  [K in keyof T as Exclude<K, `${string}${S}${string}`>]: T[K];
};

export type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}`
    ? `${T extends Capitalize<T>
        ? "_"
        : ""}${Lowercase<T>}${CamelToSnakeCase<U>}`
    : S;

export type KeysToSnakeCase<T> = {
  [K in keyof T as CamelToSnakeCase<string & K>]: T[K];
};
