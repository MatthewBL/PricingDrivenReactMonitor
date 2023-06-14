import { LogicBoolean } from "./LogicValues";
import { NAryFunction, NAryFunctionOptions } from "./NAryFunction";
import { ResultValue } from "./ResultValue";
export declare enum BinaryLogicalOperator {
    AND = 0,
    OR = 1,
    IFF = 2,
    IMPLIES = 3
}
declare class BinaryLogicalPredicate implements NAryFunction<boolean> {
    left: NAryFunction<boolean>;
    right: NAryFunction<boolean>;
    op: BinaryLogicalOperator;
    constructor(left: NAryFunction<boolean>, right: NAryFunction<boolean>, operator: BinaryLogicalOperator);
    eval(options?: NAryFunctionOptions): Promise<ResultValue<boolean>>;
    equals(other: NAryFunction<any>): boolean;
}
export declare function and(left: LogicBoolean, right: LogicBoolean): BinaryLogicalPredicate;
export declare function or(left: LogicBoolean, right: LogicBoolean): BinaryLogicalPredicate;
export declare function implies(left: LogicBoolean, right: LogicBoolean): BinaryLogicalPredicate;
export declare function iff(left: LogicBoolean, right: LogicBoolean): BinaryLogicalPredicate;
export {};
