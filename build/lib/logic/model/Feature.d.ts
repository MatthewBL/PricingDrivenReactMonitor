import FeatureRetriever from "../../components/feature/FeatureRetriever";
import { NAryFunction, NAryFunctionOptions } from "./NAryFunction";
import { ResultValue } from "./ResultValue";
export declare class Feature implements NAryFunction<boolean> {
    featureId: string;
    featureRetriever?: FeatureRetriever;
    constructor(featureId: string, featureRetriever?: FeatureRetriever);
    eval(options?: NAryFunctionOptions): Promise<ResultValue<boolean>>;
    equals(other: NAryFunction<any>): boolean;
}
export declare function feature(featureId: string, featureRetriever?: FeatureRetriever): NAryFunction<boolean>;
