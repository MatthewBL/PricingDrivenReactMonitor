import { NAryFunction } from "./NAryFunction";
import { ResultValue } from "./ResultValue";
export declare class Constant<T> implements NAryFunction<T> {
    value: T;
    constructor(value: T);
    eval(): Promise<ResultValue<T>>;
    equals(other: NAryFunction<any>): boolean;
}
export default function constant<T>(value: T): NAryFunction<T>;
