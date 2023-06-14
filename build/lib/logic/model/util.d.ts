import FeatureRetriever, { AttributeValue } from "../../components/feature/FeatureRetriever";
import { NAryFunction } from "./NAryFunction";
export declare function makeFeatureAttributeRetrievers(featureRetriever: FeatureRetriever): {
    feature: (featureId: string) => NAryFunction<boolean>;
    attribute: (attributeId: string) => NAryFunction<AttributeValue>;
};
export declare function numberFunction<T>(left: NAryFunction<number> | number, right: NAryFunction<number> | number, factory: (left: NAryFunction<number>, right: NAryFunction<number>) => T): T;
export declare function booleanFunction<T>(left: NAryFunction<boolean> | boolean, right: NAryFunction<boolean> | boolean, factory: (left: NAryFunction<boolean>, right: NAryFunction<boolean>) => T): T;
export declare function attrValueFunction<T>(left: NAryFunction<AttributeValue> | AttributeValue, right: NAryFunction<AttributeValue> | AttributeValue, factory: (left: NAryFunction<AttributeValue>, right: NAryFunction<AttributeValue>) => T): T;
