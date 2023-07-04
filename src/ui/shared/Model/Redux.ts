export type Dispatch = (f) => ((Dispatch, GetState) => Promise<void>);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetState = <T = any>() => T;