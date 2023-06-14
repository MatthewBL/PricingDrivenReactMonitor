/// <reference types="node" />
import { AxiosInstance } from "axios";
import { NAryFunction } from "../../logic/model/NAryFunction";
import { FeatureResponse, FeatureResponse_Feature } from "../../../protobuf/featureResponse";
export type AttributeValue = number | string;
export type FeatureValue = boolean | AttributeValue;
type OnCompleteCallback = (result: FeatureValue) => void;
type OnErrorCallback = () => void;
interface FeatureRequest {
    onComplete: OnCompleteCallback;
    onError: OnErrorCallback;
}
interface FeatureRetrieverConfig {
    windowDelay: number;
    requestTimeout: number;
    baseUrl: string;
}
type FeatureRetrieverConstructorConfig = Partial<FeatureRetrieverConfig> & {
    baseUrl: string;
};
export default class FeatureRetriever {
    DEFAULT_WINDOW_DELAY: number;
    DEFAULT_REQUEST_TIMEOUT: number;
    config: FeatureRetrieverConfig;
    axiosInstance: AxiosInstance;
    queueMain: Record<string, FeatureRequest[]>;
    queueRequest: Record<string, FeatureRequest[]>;
    featureMap: Record<string, FeatureValue>;
    tickTimeout?: NodeJS.Timeout;
    constructor(config: FeatureRetrieverConstructorConfig);
    tickRequestQueue(): void;
    isBoolean(value: any): value is boolean;
    isAttribute(value: any): value is AttributeValue;
    getFeature(id: string): Promise<boolean>;
    private tryResolveFeatureValue;
    getAttribute(id: string): Promise<AttributeValue>;
    evalFeatureExpression(ids: string[]): Promise<FeatureValue>;
    addFeatureToQueue(featureId: string, onComplete: OnCompleteCallback, onError: OnErrorCallback): void;
    processFeatureResponse(featureResponse: FeatureResponse): void;
    setFeature(id: string, feature: FeatureResponse_Feature): void;
    getLogicFeature(id: string): NAryFunction<boolean>;
    getLogicAttribute(id: string): NAryFunction<AttributeValue>;
}
export {};
