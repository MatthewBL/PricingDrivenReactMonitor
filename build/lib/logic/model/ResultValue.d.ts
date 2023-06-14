export type ResultValue<T> = {
    value: T;
    isError: false;
    errorMessage?: undefined;
} | {
    value?: undefined;
    isError: true;
    errorMessage: string;
};
export declare function error(message: string): ResultValue<never>;
export declare function value<T>(value: T): ResultValue<T>;
