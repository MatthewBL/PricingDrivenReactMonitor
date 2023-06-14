import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "";
export interface FeatureResponse {
    featureMap: {
        [key: string]: FeatureResponse_Feature;
    };
}
export interface FeatureResponse_Feature {
    valueType: FeatureResponse_Feature_ValueType;
    booleanValue: boolean | undefined;
    stringValue: string | undefined;
    numericValue: number | undefined;
}
export declare enum FeatureResponse_Feature_ValueType {
    BOOLEAN = 0,
    STRING = 1,
    NUMERIC = 2,
    UNRECOGNIZED = -1
}
export declare function featureResponse_Feature_ValueTypeFromJSON(object: any): FeatureResponse_Feature_ValueType;
export declare function featureResponse_Feature_ValueTypeToJSON(object: FeatureResponse_Feature_ValueType): string;
export interface FeatureResponse_FeatureMapEntry {
    key: string;
    value: FeatureResponse_Feature | undefined;
}
export declare const FeatureResponse: {
    encode(message: FeatureResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FeatureResponse;
    fromJSON(object: any): FeatureResponse;
    toJSON(message: FeatureResponse): unknown;
    fromPartial<I extends {
        featureMap?: {
            [x: string]: {
                valueType?: FeatureResponse_Feature_ValueType | undefined;
                booleanValue?: boolean | undefined;
                stringValue?: string | undefined;
                numericValue?: number | undefined;
            } | undefined;
        } | undefined;
    } & {
        featureMap?: ({
            [x: string]: {
                valueType?: FeatureResponse_Feature_ValueType | undefined;
                booleanValue?: boolean | undefined;
                stringValue?: string | undefined;
                numericValue?: number | undefined;
            } | undefined;
        } & {
            [x: string]: ({
                valueType?: FeatureResponse_Feature_ValueType | undefined;
                booleanValue?: boolean | undefined;
                stringValue?: string | undefined;
                numericValue?: number | undefined;
            } & {
                valueType?: FeatureResponse_Feature_ValueType | undefined;
                booleanValue?: boolean | undefined;
                stringValue?: string | undefined;
                numericValue?: number | undefined;
            } & Record<Exclude<keyof I["featureMap"][string], keyof FeatureResponse_Feature>, never>) | undefined;
        } & Record<Exclude<keyof I["featureMap"], string | number>, never>) | undefined;
    } & Record<Exclude<keyof I, "featureMap">, never>>(object: I): FeatureResponse;
};
export declare const FeatureResponse_Feature: {
    encode(message: FeatureResponse_Feature, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FeatureResponse_Feature;
    fromJSON(object: any): FeatureResponse_Feature;
    toJSON(message: FeatureResponse_Feature): unknown;
    fromPartial<I extends {
        valueType?: FeatureResponse_Feature_ValueType | undefined;
        booleanValue?: boolean | undefined;
        stringValue?: string | undefined;
        numericValue?: number | undefined;
    } & {
        valueType?: FeatureResponse_Feature_ValueType | undefined;
        booleanValue?: boolean | undefined;
        stringValue?: string | undefined;
        numericValue?: number | undefined;
    } & Record<Exclude<keyof I, keyof FeatureResponse_Feature>, never>>(object: I): FeatureResponse_Feature;
};
export declare const FeatureResponse_FeatureMapEntry: {
    encode(message: FeatureResponse_FeatureMapEntry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FeatureResponse_FeatureMapEntry;
    fromJSON(object: any): FeatureResponse_FeatureMapEntry;
    toJSON(message: FeatureResponse_FeatureMapEntry): unknown;
    fromPartial<I extends {
        key?: string | undefined;
        value?: {
            valueType?: FeatureResponse_Feature_ValueType | undefined;
            booleanValue?: boolean | undefined;
            stringValue?: string | undefined;
            numericValue?: number | undefined;
        } | undefined;
    } & {
        key?: string | undefined;
        value?: ({
            valueType?: FeatureResponse_Feature_ValueType | undefined;
            booleanValue?: boolean | undefined;
            stringValue?: string | undefined;
            numericValue?: number | undefined;
        } & {
            valueType?: FeatureResponse_Feature_ValueType | undefined;
            booleanValue?: boolean | undefined;
            stringValue?: string | undefined;
            numericValue?: number | undefined;
        } & Record<Exclude<keyof I["value"], keyof FeatureResponse_Feature>, never>) | undefined;
    } & Record<Exclude<keyof I, keyof FeatureResponse_FeatureMapEntry>, never>>(object: I): FeatureResponse_FeatureMapEntry;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
