import { AttributeValue } from "../../components/feature/FeatureRetriever";
import { LogicAttributeValue, LogicNumber } from "./LogicValues";
import { NAryFunction, NAryFunctionOptions } from "./NAryFunction";
import { ResultValue } from "./ResultValue";
export declare enum BinaryRelationalOperator {
    LESS = 0,
    LESSEQ = 1,
    GREATER = 2,
    GREATEREQ = 3,
    EQUAL = 4,
    NOTEQ = 5
}
declare class BinaryRelationalPredicate implements NAryFunction<boolean> {
    left: NAryFunction<AttributeValue>;
    right: NAryFunction<AttributeValue>;
    op: BinaryRelationalOperator;
    constructor(left: NAryFunction<AttributeValue>, right: NAryFunction<AttributeValue>, operator: BinaryRelationalOperator);
    eval(options?: NAryFunctionOptions): Promise<ResultValue<boolean>>;
    equals(other: NAryFunction<any>): boolean;
}
export declare function lt(left: LogicNumber, right: LogicNumber): BinaryRelationalPredicate;
export declare function lte(left: LogicNumber, right: LogicNumber): BinaryRelationalPredicate;
export declare function gt(left: LogicNumber, right: LogicNumber): BinaryRelationalPredicate;
export declare function gte(left: LogicNumber, right: LogicNumber): BinaryRelationalPredicate;
export declare function eq(left: LogicAttributeValue, right: LogicAttributeValue): BinaryRelationalPredicate;
export declare function neq(left: LogicAttributeValue, right: LogicAttributeValue): BinaryRelationalPredicate;
export {};
