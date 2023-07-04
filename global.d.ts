declare module '*.css';
declare module '*.js';

declare const __CLIENT__: boolean;
declare const __SERVER__: boolean;
declare const __DEV__: boolean;
declare const __PROD__: boolean;

declare type valueof<T> = T[keyof T]

declare type Dictionary<T = string> = {[id: string]: T};

declare type Action = (any) => void;

declare namespace NodeJS {
    interface Conf{
        siteUrl: string;
        relativeSiteUrl: string;
    }

    interface Global {
        conf: Conf;
    }
}

// export {};
