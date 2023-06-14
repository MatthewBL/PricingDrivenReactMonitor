import { LogicNumber } from "./LogicValues";
import { NAryFunction, NAryFunctionOptions } from "./NAryFunction";
import { ResultValue } from "./ResultValue";
export declare enum ArithmeticOperator {
    PLUS = 0,
    MINUS = 1,
    MUL = 2,
    DIV = 3,
    MOD = 4,
    POW = 5
}
declare class ArithmeticFunction implements NAryFunction<number> {
    left: NAryFunction<number>;
    right: NAryFunction<number>;
    op: ArithmeticOperator;
    constructor(left: NAryFunction<number>, right: NAryFunction<number>, operator: ArithmeticOperator);
    eval(options?: NAryFunctionOptions): Promise<ResultValue<number>>;
    equals(other: NAryFunction<any>): boolean;
}
export declare function plus(left: LogicNumber, right: LogicNumber): ArithmeticFunction;
export declare function minus(left: LogicNumber, right: LogicNumber): ArithmeticFunction;
export declare function mul(left: LogicNumber, right: LogicNumber): ArithmeticFunction;
export declare function div(left: LogicNumber, right: LogicNumber): ArithmeticFunction;
export declare function mod(left: LogicNumber, right: LogicNumber): ArithmeticFunction;
export declare function pow(left: LogicNumber, right: LogicNumber): ArithmeticFunction;
export {};
