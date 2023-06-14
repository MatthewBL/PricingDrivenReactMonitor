import FeatureRetriever from "../../components/feature/FeatureRetriever";
import { NAryFunction, NAryFunctionOptions } from "./NAryFunction";
import { ResultValue } from "./ResultValue";
export declare class NumericAttribute implements NAryFunction<number> {
    attributeId: string;
    featureRetriever?: FeatureRetriever;
    constructor(featureId: string, featureRetriever?: FeatureRetriever);
    eval(options?: NAryFunctionOptions): Promise<ResultValue<number>>;
    equals(other: NAryFunction<any>): boolean;
}
export declare function numericAttribute(attributeId: string, featureRetriever?: FeatureRetriever): NAryFunction<number>;
