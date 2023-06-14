import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "";
export interface FeatureRequest {
    features: string[];
}
export declare const FeatureRequest: {
    encode(message: FeatureRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): FeatureRequest;
    fromJSON(object: any): FeatureRequest;
    toJSON(message: FeatureRequest): unknown;
    fromPartial<I extends {
        features?: string[] | undefined;
    } & {
        features?: (string[] & string[] & Record<Exclude<keyof I["features"], keyof string[]>, never>) | undefined;
    } & Record<Exclude<keyof I, "features">, never>>(object: I): FeatureRequest;
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
