import FeatureRetriever, { AttributeValue } from "../../components/feature/FeatureRetriever";
import { NAryFunction, NAryFunctionOptions } from "./NAryFunction";
import { ResultValue } from "./ResultValue";
export declare class Attribute implements NAryFunction<AttributeValue> {
    attributeId: string;
    featureRetriever?: FeatureRetriever;
    constructor(featureId: string, featureRetriever?: FeatureRetriever);
    eval(options?: NAryFunctionOptions): Promise<ResultValue<AttributeValue>>;
    equals(other: NAryFunction<any>): boolean;
}
export declare function attribute(attributeId: string, featureRetriever?: FeatureRetriever): NAryFunction<AttributeValue>;
